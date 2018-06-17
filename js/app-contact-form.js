/* const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
// const nodemailer = require('nodemailer')
const contact = require('./js/contact-form.js')
const app = express()

// Static folder (public)
app.use('/public', express.static(path.join(__dirname, 'public')))

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.get('/', (req, res) => {
  res.send('contact')
})

app.post('/send', contact)

app.listen(3000, () => console.log('Server started...3000')) */
