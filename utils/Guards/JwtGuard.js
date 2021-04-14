const jwt = require('jsonwebtoken')
const keys = require('../../keys/index')
const Users = require('../../models/Users')

// Guard проверяет token на валидность и обновляет его в БД, прикрепляя обновлденный token к req.body.updatedToken
export default async function JwtGuard (req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1]

    jwt.verify(token, keys.jwt, async (err, decoded) => {
      if (err) {
        // Сравнить token и refreshToken в БД. Если они совпали, обновить и продолжить работу. В противном случае вернуть ответ от сервера с редиректом на страницу авторизации
        const decodedToken = jwt.decode(token, keys.jwt)
        const refreshToken = decodedToken.refreshToken
        const User = await Users.findOne({
          where: {
            id: decodedToken.id
          }
        })

        if (User.dataValues.token === token && User.dataValues.refreshToken === refreshToken) {
          // Генерируем рефреш токен для нового пользователя
          const refreshToken = jwt.sign({
            id: User.dataValues.id,
          }, keys.jwtRefresh)
  
          // Генерируем token для нового пользователя
          const token = jwt.sign({
            id: User.dataValues.id,
            email: User.dataValues.email,
            refreshToken: refreshToken
          }, keys.jwt, {expiresIn: 60 * 15})

          await Users.update(
            { token, refreshToken },
            { where: { id: User.dataValues.id } }
          )
          // Обновить token и refreshToken
          req.body.updatedToken = token

          next()
        } else {
          // Если токены в request.body.authorizations не совпали с сохраненными в дазе, возвращаем ошибку и просим выполнить авторизацию еще раз
          res.status(401).json({message: 'Проверка авторизации завершилась с ошибкой. Выполните авторизацию повторно.'})
        }
      } else {
        // Если token валиден к request body прикрепляется свойство updatedToken = null и продолжается работа
        req.body.updatedToken = null
        next()
      }
    })
  } catch (err) {
    console.log(err)

    res.status(500).json({
      message: 'Внутренняя ошибка сервера.'
    })
  }
}
