// const Sequelize = require('sequelize')
// const Op = Sequelize.Op;
// const errorHandler = require('../utils/errorHandler.js')
// const Products = require('../models/Products')


module.exports.singleFile = async function (req, res) {

  // console.log(req.headers)
  // console.log(req.body)
  // console.log(req.file)
  // console.log(req.files)

    let filedata = req.file
    console.log(filedata)

    if(!filedata)
        res.send("Ошибка при загрузке файла")
    else
        res.send("Файл загружен")

}
