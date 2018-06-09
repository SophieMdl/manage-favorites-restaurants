/* const express = require('express')
const app = express()
const router = express.Router()
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

console.log('je me charge')

// creer la route send
router.get('/send', (req, res, next) => {
  console.log('jesuis la')
  res.send('ok')
  // on cible le formulaire et on cible l'event (submit)
  const form = window.getElementById('contact-form')
  console.log(form)
  form.addEventListener('submit', event => {
    // variable qui contient les valeurs rentree par l'users
    const contactContent = `
             <p>Un utilisateur vous a écrit.</p>
             <ul>
                 <li>Name: ${req.body.name}</li>
                 <li>E-mail: ${req.body.mail}</li>
                 <li>Reason: ${req.body.reason}</li>
                 <li>Details: ${req.body.details}</li>
                 <li>Telephone: ${req.body.telnum}</li>
             </ul>
         `
    // cree le transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: 'jt3vfgego6giu4ym@ethereal.email',
        pass: 'Fzvhh4KQbpBbw8N2Ut'
      }
    })
    // Mise en forme du mail
    const mailOptions = {
      from: ` "${req.body.name}" <${req.body.mail}> `,
      to: 'kim.spychalski@gmail.com',
      subject: `${req.body.reason} `,
      text: `${req.body}`,
      html: contactContent

    }
    /* on gere l'erreur
    transporter.sendMail(mailOptions, (err, data => {
      if (err) {
      return console.log(err)
      }
      console.log(data)
    }))
  })
})

module.exports = router */
