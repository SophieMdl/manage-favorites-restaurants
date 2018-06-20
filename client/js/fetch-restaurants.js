import { getFetchUrl } from './fetch.js'
export const getRestaurantsList = () => {
  return new Promise(resolve =>
    window.fetch(getFetchUrl()+'/restaurants')
      .then(res => res.json())
      .then(restaurantList => {
        resolve(restaurantList)
      })
  )
}
