export const getCurrentUser = () => {
  return new Promise(resolve =>
    window.fetch('http://localhost:3333/session',
      {credentials: 'include'})
      .then(res => res.json())
      .then(user => {
        user.createdAt = new Date(user.createdAt)
        resolve(user)
      })
  )
}
