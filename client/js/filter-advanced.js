import { filterElement } from './composants/filter-advanced.js'
import { restaurantElement } from './composants/restaurant.js'
import { restaurantScale, restaurantLikes } from './restaurant-functions.js'

const listByType = document.getElementById('list-by-type')
const listByBudget = document.getElementById('list-by-budget')
const listResto = document.getElementById('list-restos')

const advancedFilter = document.getElementById('advanced-filter')
const btnFilter = document.getElementById('open-filter')

const filterBlack = document.getElementById('filter-black')

let restaurants

const filterChecked = {
  category: [],
  budget: []
}

const switchFilter = () => {
  if (advancedFilter.classList.contains('hidden')) {
    advancedFilter.classList.remove('hidden')
    advancedFilter.classList.add('visible')
    filterBlack.classList.add('visible')
  } else {
    advancedFilter.classList.remove('visible')
    advancedFilter.classList.add('hidden')
    filterBlack.classList.remove('visible')
  }
}

const inputsListener = (filterType, filters) => {
  for (let filter of filters) {
    filter.addEventListener('click', () => {
      let typeFilters = filterChecked[filterType]
      let value = filter.value.replace(/[-]/g, ' ')
      // On ajoute dans un tableau les valeurs de catégories cochées
      filter.checked
        ? typeFilters.push(value)
        // Et on les enlève si le tableau est décoché
        : typeFilters.splice(typeFilters.indexOf(value), 1)
      filterRestaurants(filterChecked, restaurants)
    })
  }
}

const displayRestaurants = restaurants => {
  listResto.innerHTML = restaurants.map(restaurantElement).join('')
  restaurantScale(listResto)
  restaurantLikes()
}

const filterRestaurants = (filters, restaurants) => {
  let filteredData = restaurants
  const keys = Object.keys(filters)
  for (const k of keys) {
    if (filters[k].length) {
      filteredData = filteredData.filter(r => filters[k].includes(r[k]))
    }
  }
  displayRestaurants(filteredData)
}

window.fetch('http://localhost:3333/categories')
  .then(res => res.json())
  .then(categories => {
    listByType.innerHTML = categories['cuisine'].map(filterElement).join('')
    listByBudget.innerHTML = categories['budget'].map(filterElement).join('')
  })
  .then(() => {
    const filtersByCategory = listByType.getElementsByTagName('input')
    const filtersByBudget = listByBudget.getElementsByTagName('input')

    const allFiltersType = {
      category: filtersByCategory,
      budget: filtersByBudget
    }

    const keys = Object.keys(allFiltersType)

    for (const key of keys) {
      inputsListener(key, allFiltersType[key])
    }
  })

window.fetch('http://localhost:3333/restaurants')
  .then(res => res.json())
  .then(res => {
    restaurants = res
  })

if (window.innerWidth > 1280) {
  switchFilter()
}

filterBlack.addEventListener('click', switchFilter)
btnFilter.addEventListener('click', switchFilter)
