const itemsFilter = document.getElementsByClassName('item-filter')

for (let item of itemsFilter) {
  item.addEventListener('click', (e) => {
    for (let item of itemsFilter) {
      if (item.classList.contains('active')) {
        item.classList.remove('active')
      }
    }
    const that = e.currentTarget
    that.classList.add('active')
  })
}
