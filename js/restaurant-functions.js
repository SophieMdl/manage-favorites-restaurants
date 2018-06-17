import { showModal } from './popup.js'
import { getCurrentUser } from './user.js'

export const restaurantScale = emplacement => {
  const columns = emplacement.getElementsByClassName('column')
  let nbColumn

  // Pour chaque fiche de resto on ajoute un event au click
  const scale = e => {
    const that = e.currentTarget
    // On récupère la colonne liée à l'élément cliquable
    const thatColumn = that.parentNode.parentNode
    // thatIndex recupère la position de l'élément
    const thatIndex = Array.from(columns).indexOf(thatColumn)

    // on enlève les classes déjà présentes
    for (let column of columns) {
      if (column.classList.contains('active')) {
        column.classList.remove('active')
      }
      if (column.classList.contains('same-row')) {
        column.classList.remove('same-row')
      }
    }
    // On récupère le numéro de la ligne
    const posRow = Math.floor(thatIndex / nbColumn)
    // On récupère le premier élément de la ligne
    const thatRow = posRow * nbColumn
    // On ajoute la classe same-row sur chaque élément
    for (let i = thatRow; i < thatRow + nbColumn; i++) {
      if (columns.item(i) !== null) {
        columns.item(i).classList.add('same-row')
      }
    }
    // on enlève same-row et ajoute une classe active à la colonne visée
    thatColumn.classList.remove('same-row')
    thatColumn.classList.add('active')
  }
  if (columns.length) {
    nbColumn = Math.round(emplacement.offsetWidth / columns[0].offsetWidth)
    for (let column of columns) {
      let resto = column.querySelector('.restaurant .simple-infos')
      resto.addEventListener('click', scale)
    }
  }
}

export const restaurantLikes = () => {
  const btnLikes = document.getElementsByClassName('like-wrapper')

  getCurrentUser()
    .then(user => {
      for (let like of btnLikes) {
        like.addEventListener('click', (e) => {
          if (!user) {
            showModal()
          } else {
            window.fetch(`https://wild-and-hungry.herokuapp.com/like`, {
              method: 'post',
              credentials: 'include',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                idResto: e.target.getAttribute('id')
              })
            })
              .then(res => window.location.reload())
          }
        })
      }
    })
}
