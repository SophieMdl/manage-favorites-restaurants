import { budgetElement, categoriesElement } from './composants/categories.js'
import { restaurantElement } from './composants/restaurant.js'
import { restaurantScale, restaurantLikes } from './restaurant-functions.js'

const categoElement = document.getElementById('categories')
//  Affichage des catégories en fonction des boutons dans l'accueil
window.fetch('http://localhost:3333/categories')
  .then(res => res.json())
  .then(categories => {
    document.getElementById('budget').addEventListener('click', () => {
      categoElement.innerHTML = categories['budget'].map(budgetElement).join('')
    })
    document.getElementById('cuisine').addEventListener('click', () => {
      categoElement.innerHTML = categories['cuisine'].map(categoriesElement).join('')
    })
    document.getElementById('top').addEventListener('click', displayTop)
    categoElement.innerHTML = categories['cuisine'].map(categoriesElement).join('')
  })

// classement des restaurants par plus likes et injection
const displayTop = () => {
  window.fetch('http://localhost:3333/restaurants')
    .then(res => res.json())
    .then(restaurants => {
      let bestResto = restaurants.sort(compareNombres)
      bestResto = bestResto.slice(0, 12)
      categoElement.innerHTML = bestResto.map(restaurantElement).join('')
      restaurantScale(categoElement)
      restaurantLikes()
    })
}
const compareNombres = (a, b) => {
  return b.like.length - a.like.length
}
