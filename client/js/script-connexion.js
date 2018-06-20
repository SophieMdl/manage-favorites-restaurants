import { showModal } from './popup.js'
import { isConnected, isNotConnected } from './composants/connexion-btn.js'
import { getCurrentUser } from './user.js'
import { getFetchUrl } from './fetch.js'

export const scriptComponentsConnexion = () => {
  const btnConnexion = document.getElementById('connexion-button')
  getCurrentUser()
    .then(user => {
      user
        ? btnConnexion.innerHTML = isConnected(user)
        : btnConnexion.innerHTML = isNotConnected

      if (!user) {
        btnConnexion.addEventListener('click', showModal)
      } else {
        document.getElementById('sign-out').addEventListener('click', () => {
          window.fetch(getFetchUrl()+'/sign-out', {credentials: 'include'})
            .then(window.location.reload())
        })
      }
    })
}
