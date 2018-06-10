const modalConnexion = document.getElementById('popup-cnx')
/* ****** GESTION MODAL ******* */
export const showModal = () => {
  modalConnexion.style.display = 'block'
}

const hideModal = () => {
  modalConnexion.style.display = 'none'
}
document.addEventListener('DOMContentLoaded', (event) => {
  initModal()
})

export const initModal = () => {
  const passwordInput = document.getElementById('register-psw')
  const passwordConfirmInput = document.getElementById('confirm-psw')
  const messageElement = document.getElementById('message')
  const signInForm = document.getElementById('form-connect')
  const closePopup = document.getElementById('close-popup')
  const errorMessage = 'Les 2 mots de passe ne correspondent pas'
  const emailInput = document.getElementById('register-email')

  passwordConfirmInput.addEventListener('input', event => {
    passwordConfirmInput.setCustomValidity(
      (passwordConfirmInput.value !== passwordInput.value) ? errorMessage : ''
    )
  })

  passwordInput.addEventListener('input', event => {
    passwordConfirmInput.setCustomValidity(
      (passwordConfirmInput.value !== passwordInput.value) ? errorMessage : ''
    )
  })

  emailInput.addEventListener('blur', event => {
    window.fetch('http://localhost:3333/check-email', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: emailInput.value
      })
    }).then(res => res.json())
      .then(res => emailInput.setCustomValidity((res) ? '' : 'Ce email est déjà utilisé.'))
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
        email: emailInput.value,
        password: passwordInput.value
      })
    })
      .then(res => hideModal())
  })

  signInForm.addEventListener('submit', e => {
    e.preventDefault()

    const handleAuth = res => {
      console.log('handleAuth', res)
      // handle errors
      messageElement.innerHTML = res.error || ''
      if (!res.error) window.location.reload()
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
  })
  closePopup.addEventListener('click', () => {
    hideModal()
  })
}
