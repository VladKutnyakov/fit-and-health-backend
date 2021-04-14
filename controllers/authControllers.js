const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
// const jwtDecode = require('jwt-decode')
const keys = require('../keys')
const Users = require('../models/Users')
const errorHandler = require('../utils/errorHandler')

module.exports.register = async function (req, res) {

  const candidate = await Users.findOne({
    where: {
      email: req.body.email
    }
  })

  if (candidate) {
    // если пользователь существеует то возвращаем ошибку
    res.status(409).json({
      message: 'Такой email уже занят. Введите другой.'
    })
  } else {
    // создать пользователя в БД
    try {
      const salt = bcrypt.genSaltSync(10)
      const password = req.body.password
      Users.create({
        email: req.body.email,
        password: bcrypt.hashSync(password, salt),
      })
        .then(user => res.status(201).json(user))
    } catch (error) {
      errorHandler(res, error)
    }
  }
}

module.exports.login = async function (req, res) {

  const candidate = await Users.findOne({
    where: {
      email: req.body.email
    }
  })

  if (candidate) {
    // Проверяем пароль, пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.dataValues.password)

    if (passwordResult) {
      // Генерация токена
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate.id
      }, keys.jwt, {expiresIn: 3600 * 24 * 365})
      // console.log(token)

      res.status(200).json(token)
    } else {
      // Пароли не совпали
      res.status(401).json({
        message: 'пароль введен не верно. повторите попытку'
      })
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: 'пользователь с таким email не найден'
    })
  }
}
