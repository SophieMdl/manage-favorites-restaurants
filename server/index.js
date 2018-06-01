const express = require('express')
const fs = require('fs')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const multer = require('multer')

// variable convertir les callbacks en promises :
const util = require('util')
const path = require('path')

// fonction pour convertir les callbacks en promises :
const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

// const categories = require('../mocks/categories.json')
// const restaurants = require('../mocks/restos.json')
const users = require('../mocks/user.json')

const app = express()

// systeme authentification
const secret = 'something unbelievable'

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// autorisation
app.use((request, response, next) => {
  // response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.header('Access-Control-Allow-Credentials', 'true') // important
  next()
})

// initialisation gestionnaire de sessions
app.use(session({
  secret,
  saveUninitialized: false,
  resave: true,
  store: new FileStore({secret})
}))

app.use((err, req, res, next) => {
  if (err) {
    res.json({message: err.message})
    console.error(err)
  }

  next(err)
})

// upload images
const publicImagesPath = path.join(__dirname, '../client/images/restaurants')

const storage = multer.diskStorage({
  destination: publicImagesPath,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()} - ${file.originalname}`)
  }
})
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 500000 // 500 KB
  }
})

// routes
app.get('/', (request, response) => {
  const user = request.session.user || {}
  response.json(user)
})

app.post('/register', (request, response, next) => {
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

app.post('/modify-profil/:id', (request, response, next) => {
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

app.get('/restaurants', (request, response) => {
  const filePath = path.join(__dirname, '../mocks/restos.json')
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

app.get('/categories', (request, response) => {
  const filePath2 = path.join(__dirname, '../mocks/categories.json')
  // promise
  readFile(filePath2)
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

app.post('/restaurants', upload.single('url'), (request, response, next) => {
  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
  const filePath = path.join(__dirname, '../mocks/restos.json')

  // 1 Lire le fichier et convertir le buffer en string (utf8)
  readFile(filePath, 'utf8')

  // 2 convertir la string en objet JS
    .then(JSON.parse)
    .then(restos => {
      // 3 ajouter le nouveau bloc en array
      restos.push({
        id: id,
        name: request.body.name,
        location: request.body.location,
        category: request.body.category,
        url: request.file ? `images/restaurants/${request.file.filename}` : `images/categories/${request.body.category.toLowerCase()}.jpg`,
        budget: request.body.budget,
        description: request.body.description,
        cart: request.body.cart,
        vegetarian: request.body.vegetarian,
        takeAway: request.body.takeAway,
        like: []
      })

      // 4 convertir l'array en string
      const content = JSON.stringify(restos, null, 2)

      // 5 écrire dans le fichier
      return writeFile(filePath, content, 'utf8')
    })

    .then(() => response.end('OK'))

    // le catch permet de montrer l'erreur s'il y en a une
    .catch(next)
})

app.post('/like', (req, res, next) => {
  const filePath = path.join(__dirname, '../mocks/restos.json')
  const idUser = req.body.idUser
  const idRestau = req.body.idResto
  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(restaus => {
      let restau = restaus.find(element => idRestau === element.id.toString())

      const index = restau.like.findIndex(el => el === idUser)
      if (index !== -1) {
        restau.like.splice(index, 1)
      } else {
        restau.like.push(idUser)
      }
      return writeFile(filePath, JSON.stringify(restaus, null, 2), 'utf8')
    })
    .then(res.end('ok'))
    .catch(next)
})

app.get('/profil/:id', (request, response) => {
  const id = Number(request.params.id)
  const profil = users.find(profil => profil.id === id)
  response.json(profil)
})

app.post('/sign-in', (req, res, next) => {
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

app.get('/session', (req, res, next) => {
  res.json(req.session.user || {})
})

app.get('/sign-out', (req, res, next) => {
  req.session.user = {}

  res.json('ok')
})

// port ecouter
app.listen(3333, () => console.log('jecoute sur le port 3333'))
