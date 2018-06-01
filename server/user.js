// on importe le module express
const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

router.get('/profil/:id', (request, response) => {
  const users = require('../mocks/user.json')
  const id = Number(request.params.id)
  const profil = users.find(profil => profil.id === id)
  response.json(profil)
})

router.post('/sign-in', (req, res, next) => {
  const users = require('../mocks/user.json')
  // does user exists ?
  const user = users.find(u => req.body.login === u.email)

  // Error handling
  if (!user) {
    return res.json({error: 'User not found'})
  }

  if (user.password !== req.body.password) {
    return res.json({error: 'Wrong password'})
  }

  // else, set the user into the session
  req.session.user = user
  res.json(user)
})

router.get('/session', (req, res, next) => {
  res.json(req.session.user || {})
})

router.get('/sign-out', (req, res, next) => {
  req.session.user = {}

  res.json('ok')
})

router.post('/modify-profil/:id', (request, response, next) => {
  const id = Number(request.params.id)
  const filePath = path.join(__dirname, '../mocks/user.json')
  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(user => {
      user.forEach(element => {
        if (id === element.id) {
          element.email = request.body.email
          element.password = request.body.password
        }
      })
      const content = JSON.stringify(user, null, 2)
      return writeFile(filePath, content, 'utf8')
    })
    .then(() => response.end('OKay'))
    .catch(next)
})

router.post('/register', (request, response, next) => {
  const filePath = path.join(__dirname, '../mocks/user.json')
  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(user => {
      user.push({
        id: user.length + 1,
        name: request.body.name,
        email: request.body.email,
        password: request.body.password,
        createdAt: Date.now()
      })
      const content = JSON.stringify(user, null, 2)
      return writeFile(filePath, content, 'utf8')
    })
    .then(() => response.end('OK'))
    .catch(next)
})

module.exports = router;


