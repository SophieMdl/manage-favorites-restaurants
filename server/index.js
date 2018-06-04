const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const user = require('./user.js')
const category = require('./category.js')
const restaurant = require('./restaurant.js')

const app = express()

// systeme authentification
const secret = 'something unbelievable'

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Autorisation
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*')
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.header('Access-Control-Allow-Credentials', 'true') // important
  next()
})

// Iinitialisation gestionnaire de sessions
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

// routes
app.get('/', (request, response) => {
  const currentUser = request.session.user || {}
  response.json(currentUser)
})
app.use('', restaurant)
app.use('', category)
app.use('', user)


// port ecouter
app.listen(3333, () => console.log("j'écoute sur le port 3333"))
