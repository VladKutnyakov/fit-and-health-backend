const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const jwtDecode = require('jwt-decode')
const keys = require('../keys/index')
const Users = require('../models/Users')

// http://localhost:3031/api/auth/register/
module.exports.register = async function (req, res) {
  try {
    const candidate = await Users.findOne({
      where: {
        email: req.body.email
        // [Op.or]: [
        //   { email: req.body.email },
        //   { phone: req.body.phone }
        // ]
      }
    })

    if (!candidate) {
      // создать пользователя в БД
      try {
        // Создаем нового пользователя в БД
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const newUser = await Users.create({
          email: req.body.email,
          phone: req.body.phone,
          password: bcrypt.hashSync(password, salt),
          token: '1',
          refreshToken: '1'
        })

        // Генерируем рефреш токен для нового пользователя
        const refreshToken = jwt.sign({
          id: newUser.id,
        }, keys.jwtRefresh)
  
        // Генерируем token для нового пользователя
        const token = jwt.sign({
          id: newUser.id,
          email: newUser.email,
          refreshToken: refreshToken
        }, keys.jwt, {expiresIn: 60 * 15})

        await Users.update(
          { token, refreshToken },
          { where: { id: newUser.id } }
        )

        res.status(200).json(token)
      } catch (error) {
        res.status(404).json({
          error,
          message: 'Внутренняя ошибка сервера. Попробуйте еще раз.'
        })
      }
    } else {
      // если пользователь существеует то возвращаем ошибку
      res.status(409).json({
        message: 'Введенный E-mail уже занят. Попробуйте авторизироваться или используйте другой E-mail.'
      })
    }
  } catch (err) {
    console.log(err)

    res.status(400).json({
      message: 'Неверный запрос.'
    })
  }
}

// http://localhost:3031/api/auth/login/
module.exports.login = async function (req, res) {
  try {
    const candidate = await Users.findOne({
      where: {
        email: req.body.email
      }
    })

    if (candidate) {
      // Проверяем пароль, пользователь существует
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.dataValues.password)
  
      if (passwordResult) {
        // Генерация refreshToken
        const refreshToken = jwt.sign({
          id: candidate.id,
        }, keys.jwtRefresh)

        // Генерация токена со сроком жизни 15 мин.
        const token = jwt.sign({
          email: candidate.email,
          id: candidate.id,
          refreshToken: refreshToken
        }, keys.jwt, { expiresIn: 60 * 15 })

        // Сохранение token и refreshToken в БД
        await Users.update(
          { token, refreshToken },
          { where: { id: candidate.id } }
        )

        res.status(200).json(token)
      } else {
        // Пароли не совпали
        res.status(401).json({
          message: 'Неверный пароль. Попробуйте еще раз или воспользуйтесь формой для восстановления пароля.'
        })
      }
    } else {
      // Пользователя нет, ошибка
      res.status(404).json({
        message: 'Пользователь с таким E-mail не найден.'
      })
    }
  } catch (err) {
    console.log(err)

    res.status(400).json({
      message: 'Неверный запрос.'
    })
  }
}
