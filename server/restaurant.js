// on importe le module express
const express = require('express')
const multer = require('multer')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const util = require('util')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile)

const filePath = path.join(__dirname, '../mocks/restos.json')
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

router.get('/restaurants', (request, response) => {
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

router.post('/restaurant', upload.single('url'), (request, response, next) => {
  const id = Math.random().toString(36).slice(2).padEnd(11, '0')
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

router.post('/like', (req, res, next) => {
  if(req.session.user=== undefined || req.body.idResto === undefined ) {
    res.status(404).end('not found')
    return;
  }
  readFile(filePath, 'utf8')
    .then(JSON.parse)
    .then(restaus => {
      let restau = restaus.find(element => req.body.idResto === element.id.toString())

      const index = restau.like.findIndex(el => el === req.session.user.id )
      if (index !== -1) {
        restau.like.splice(index, 1)
      } else {
        restau.like.push(req.session.user.id)
      }
      return writeFile(filePath, JSON.stringify(restaus, null, 2), 'utf8')
    })
    .then(res.end('ok'))
    .catch(next)
})

module.exports = router;


