export const searchBar = () => {
  const goSearch = (e) => {
    e.preventDefault()
    const searchValue = document.getElementById('search-input').value
    window.location.replace(`list-restaurants.html?search=${searchValue}`)
  }
  document.getElementById('search-form').addEventListener('submit', goSearch)
}
