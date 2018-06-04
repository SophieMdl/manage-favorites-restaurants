/* ****** GESTION MODAL ******* */
export const showModal = () => {
  const showModal = document.getElementById('popup-cnx')

  showModal.style.display = 'block'
  const closePopup = document.getElementById('close-popup')
  closePopup.addEventListener('click', () => {
    showModal.style.display = 'none'
  })
  // formulaire d'inscription
  document.getElementById('form-register').addEventListener('submit', event => {
    event.preventDefault()
    let name = document.getElementById('register-name').value.charAt(0).toUpperCase() + document.getElementById('register-name').value.substring(1).toLowerCase()
    const email = document.getElementById('register-email').value
    const password = document.getElementById('register-psw').value
    const confirmpsw = document.getElementById('confirm-psw')

    if (password !== confirmpsw.value) {
      confirmpsw.setCustomValidity('Your passwords do not match')
      return
    }
    window.fetch('http://localhost:3333/register', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        password: password
      })
    })
  })
  // formulaire de connection
  const messageElement = document.getElementById('message')
  const signInForm = document.getElementById('form-connect')

  const handleAuth = res => {
    // handle errors
    messageElement.innerHTML = res.error || ''
    window.location.reload()
  }

  signInForm.addEventListener('submit', e => {
    e.preventDefault()

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

    window.fetch('http://localhost:3333/', { credentials: 'include' })
      .then(res => res.json())
      .then(handleAuth)
  })
}
