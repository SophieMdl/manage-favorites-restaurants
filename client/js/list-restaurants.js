/* global URLSearchParams */

import { restaurantElement } from './composants/restaurant.js'
import { restaurantScale, restaurantLikes } from './restaurant-functions.js'

const listResto = document.getElementById('list-restos')
const params = new URLSearchParams(window.location.search)

//  On récupère le nom de la catégorie
const cat = params.get('cat')
let budget = params.get('budget')
let search = params.get('search')
const random = params.get('random')

window.fetch(`http://localhost:3333/restaurants/`)
  .then(res => res.json())
  .then(restaurants => {
    // On affiche les bons restos en fonction du budget ou de la catégorie
    if (cat) {
      document.querySelector('h2').innerHTML = cat
      restaurants = restaurants.filter(restaurant => restaurant.category === cat)
    } else if (budget) {
      document.querySelector('h2').innerHTML = budget
      restaurants = restaurants.filter(restaurant => restaurant.budget === budget)
    } else if (search) {
      document.querySelector('h2').innerHTML = `Résultat(s) de recherche : ${search}`
      search = search.toLowerCase()
      restaurants = restaurants.filter(restaurant =>
        restaurant.category.toLowerCase() === search ||
        restaurant.name.toLowerCase() === search)
    } else if (random) {
      document.querySelector('h2').innerHTML = 'Randomeal'

      let randomResto = restaurants[Math.floor(Math.random() * restaurants.length)]
      restaurants = []
      restaurants.push(randomResto)
    }

    if (restaurants.length) {
      listResto.innerHTML = restaurants.map(restaurantElement).join('')
      restaurantScale(listResto)
      restaurantLikes()
    } else {
      listResto.innerHTML = `<p>Votre recherche n'a abouti à aucun résultat</p>`
    }
  })
