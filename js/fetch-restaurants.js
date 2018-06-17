export const getRestaurantsList = () => {
  return new Promise(resolve =>
    window.fetch('https://wild-and-hungry.herokuapp.com/restaurants')
      .then(res => res.json())
      .then(restaurantList => {
        resolve(restaurantList)
      })
  )
}
