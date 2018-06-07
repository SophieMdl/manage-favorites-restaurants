const modalConnexion = document.getElementById('popup-cnx')

/* ****** GESTION MODAL ******* */
export const showModal = () => {
  modalConnexion.style.display = 'block'
}
document.addEventListener('DOMContentLoaded', function (event) {
  initModal()
})

export const initModal = () => {

  const passwordInput = document.getElementById('register-psw')
  const passwordConfirmInput = document.getElementById('confirm-psw')
  const messageElement = document.getElementById('message')
  const signInForm = document.getElementById('form-connect')
  const closePopup = document.getElementById('close-popup')
  const errorMessage = 'Les 2 mots de passe ne correspondent pas'

  passwordConfirmInput.addEventListener('input', event => {
    if (passwordConfirmInput.value !== passwordInput.value) {
      passwordConfirmInput.setCustomValidity(errorMessage)
    }
  })

  passwordInput.addEventListener('input', event => {
    if (passwordConfirmInput.value.lenght > 0 && passwordConfirmInput.value !== passwordInput.value) {
      passwordConfirmInput.setCustomValidity(errorMessage)
    }
  })

  // formulaire d'inscription
  document.getElementById('form-register').addEventListener('submit', event => {
    event.preventDefault()
    let name = document.getElementById('register-name').value.charAt(0).toUpperCase() + document.getElementById('register-name').value.substring(1).toLowerCase()

    window.fetch('http://localhost:3333/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: document.getElementById('register-email').value,
        password: passwordInput.value
      })
    })
  })

  signInForm.addEventListener('submit', e => {
    e.preventDefault()

    const handleAuth = res => {
      // handle errors
      messageElement.innerHTML = res.error || ''
      window.location.reload()
    }

    const credentials = {
      login: document.getElementById('logemail').value,
      password: document.getElementById('logpsw').value
    }
    window.fetch('http://localhost:3333/sign-in', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Always send user credentials (cookies, basic http auth, etc..), even for cross-origin calls.
      body: JSON.stringify(credentials)
    })
      .then(res => res.json())
      .then(handleAuth)

    window.fetch('http://localhost:3333/', {credentials: 'include'})
      .then(res => res.json())
      .then(handleAuth)
  })

  closePopup.addEventListener('click', () => {
    modalConnexion.style.display = 'none'
  })
}
