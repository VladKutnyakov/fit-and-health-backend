// import express, { Application, Request, Response, NextFunction } from "express"
const jwt = require('jsonwebtoken')
// const keys = require('../../keys/index')
const Users = require('../../models/Users')
const Tokens = require('../../models/Tokens')


// отправлять refresh токен в заголовке вместе с access
// Если access валиден, ничего не делать
// Если access не валиден селать проверку на наличие пары access-refresh в БД
// Если access-refresh найдены, перезаписать оба токена и выдать новые
// Если пара access-refresh не найдены - удалить все данные авторизации пользователя для всех устройств (все пары access-refresh токенов). Выводить сообщение о возможной попытке взлома.


const keys = {
  jwt: process.env.JWT,
  jwtRefresh: process.env.JWT_REFRESH
}

// Guard проверяет token на валидность и обновляет его в БД, прикрепляя обновлденный token к req.body.updatedToken
module.exports = async function JwtGuard (req, res, next) {
  // Проверка наличия токена авторизации в headers запроса
  if (req.headers && req.headers.authorization) {
    // Получение токена и установка id пользователя в body запроса, для удобной работы в контроллерах
    const token = req.headers.authorization.replace('Bearer ', '')
    const decodedToken = jwt.decode(token, keys.jwt)

    // console.log(token);

    // Проверка валидности токена
    jwt.verify(token, keys.jwt, async (error) => {
      // Если токен не валиден, проверить рефреш на валидность.
      if (error) {
        // Проверка refreshToken на валидность.
        jwt.verify(decodedToken.refreshToken, keys.jwtRefresh, async (error) => {
          if (error) {
            // Если рефреш НЕ валиден - проверить все токены пользователя и удалить записи с не валидными рефреш токенами. Отправить ошибку авторизации.
            const User = await Users.findOne({
              where: {
                id: decodedToken.id
              },
              include: {
                model: Tokens,
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                },
                raw: true
              },
              attributes: {
                exclude: ['createdAt', 'updatedAt']
              }
            })

            const UserTokens = User.toJSON().tokens

            UserTokens.forEach(async element => {
              jwt.verify(element.refreshToken, keys.jwtRefresh, async (error) => {
                if (error) {
                  await Tokens.destroy({
                    where: {
                      id: element.id
                    }
                  })
                }
              })
            })

            res.status(401).json({
              message: 'Ошибка авторизации.'
            })
          } else {
            // Если рефреш валиден - обновить accessToken и refreshToken ЕСЛИ они совпадают с теми что есть в БД
            try {
              // Получить все токены пользователя.
              const User = await Users.findOne({
                where: {
                  id: decodedToken.id
                },
                include: {
                  model: Tokens,
                  attributes: {
                    exclude: ['createdAt', 'updatedAt']
                  },
                  raw: true
                },
                attributes: {
                  exclude: ['createdAt', 'updatedAt']
                }
              })

              const UserTokens = User.toJSON().tokens

              let targetToken = null

              UserTokens.forEach(async element => {
                // Поиск совпадения присланного токена с записями в БД
                if (element.accessToken === token && element.refreshToken === decodedToken.refreshToken) {
                  targetToken = element
                }
              })

              // Если токен найден в БД обновить accessToken и refreshToken
              if (targetToken) {
                // Генерируем рефреш токен для нового пользователя
                const refreshToken = jwt.sign({
                  id: User.toJSON().id,
                }, keys.jwtRefresh, { expiresIn: '30d' })

                // Генерируем token для нового пользователя
                const accessToken = jwt.sign({
                  id: User.toJSON().id,
                  refreshToken: refreshToken
                }, keys.jwt, { expiresIn: '15m' })

                await Tokens.update(
                  { accessToken, refreshToken },
                  { where: { id: targetToken.id } }
                )

                // Добавить данные с обновленным token и id пользователя в body запроса
                req.body.updatedToken = accessToken
                req.body.userId = decodedToken.id

                next()
              } else {
                // Если токен НЕ НАЙДЕН в БД
                res.status(400).json({
                  message: 'Проверьте актуальность данных авторизации.'
                })
                // ошибка и запрос обновленного токена. Если токен отправленный не равен тому что есть в сторе выполнить повторный запрос иначе перенаправить на странциу авторизации.
              }
            } catch (error) {
              res.status(500).json({
                message: 'Неизвестная ошибка при авторизации.'
              })
            }
          }
        })
      } else {
        // Если token валиден к request body прикрепляется свойство updatedToken = null и id пользователя. Вызывается контроллер вызванного api.
        req.body.updatedToken = null
        req.body.userId = decodedToken.id
        next()
      }
    })
  } else {
    res.status(401).json({
      message: 'Ошибка авторизации.'
    })
  }
}