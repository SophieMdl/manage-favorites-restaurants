const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const FileStore = require('session-file-store')(session)

const user = require('./user.js')
const category = require('./category.js')
const restaurant = require('./restaurant.js')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Autorisation
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', request.headers.origin)
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  response.header('Access-Control-Allow-Credentials', 'true') // important
  next()
})

// Iinitialisation gestionnaire de sessions
app.use(session({
  genid: (req) => {
    console.log('Inside the session middleware')
    console.log(req.sessionID)
    return Math.random().toString(36).slice(2).padEnd(11, '0')
  },
  store: new FileStore(),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}))
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`, { user: req.session.user, cookie: req.headers.cookie })
  next()
})

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
