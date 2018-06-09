// import { addtEtab } from './composants/addrest.js'
const form = document.getElementById('form')
form.addEventListener('submit', event => {
  event.preventDefault()

  // Objet special pour le traitement des formulaires : formData
  const formData = new window.FormData(event.target)

  // On accede aux éléments de cet objet avec la méthode GET
  const isChecked = (item) => {
    if (formData.get(item) === 'on') {
      return formData.set(item, 'Oui')
    }
  }

  const nameFirstLowerCase = (item, valueGet) => {
    const listWords = valueGet.split(' ') // les mots de la phrase se transforment en liste
    const maj = (cel) => { // chaque premiere lettre de chaque élément est mis en majuscule
      const wordMaj = cel.charAt(0).toUpperCase() + cel.substring(1).toLowerCase()
      return wordMaj
    }
    const listWordsMaj = listWords.map(maj)
    const nameRestMaj = listWordsMaj.join(' ')
    return formData.set(item, nameRestMaj)
  }

  isChecked('cart')
  isChecked('vegetarian')
  isChecked('takeAway')

  const nameValue = formData.get('name')
  const locValue = formData.get('location')

  nameFirstLowerCase('name', nameValue)
  nameFirstLowerCase('location', locValue)

  window.fetch('http://localhost:3333/restaurants', { method: 'post', body: formData })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
    .then(res => window.location.replace('index.html'))
})
