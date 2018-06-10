export const getRestaurantsList = () => {
  return new Promise(resolve =>
    window.fetch('http://localhost:3333/restaurants')
      .then(res => res.json())
      .then(restaurantList => {
        resolve(restaurantList)
      })
  )
}
