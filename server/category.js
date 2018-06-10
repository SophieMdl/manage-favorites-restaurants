// on importe le module express
const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const util = require('util')

const filePath = path.join(__dirname, '../mocks/categories.json')
const readFile = util.promisify(fs.readFile)

router.get('/categories', (request, response) => {
  // promise
  readFile(filePath)
  // traitement de la donnéee
    .then(data => {
      response.header('Content-Type', 'application/json; charset=utf-8')
      response.end(data)
    })
    // gestion de l'erreur
    .catch(err => {
      response.status(404).end('not found')
      console.log(err)
    })
})

module.exports = router
