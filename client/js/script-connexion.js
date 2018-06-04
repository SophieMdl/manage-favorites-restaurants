import { showModal } from './popup.js'
import { isConnected, isNotConnected } from './composants/connexion-btn.js'

export const scriptComponentsConnexion = () => {
  const btnConnexion = document.getElementById('connexion-button')
  window.fetch('http://localhost:3333/session', { credentials: 'include' })
    .then(res => res.json())
    .then(user => {
      user.name
        ? btnConnexion.innerHTML = isConnected(user)
        : btnConnexion.innerHTML = isNotConnected

      if (!user.name) {
        btnConnexion.addEventListener('click', showModal)
      } else {
        document.getElementById('sign-out').addEventListener('click', () => {
          window.fetch('http://localhost:3333/sign-out', { 'credentials': 'include' })
            .then(res => res.json())
            .then(window.location.reload())
        })
      }
    })
}
