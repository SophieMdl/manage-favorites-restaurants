const localhost = 'http://localhost:3333'
const herokuhost = 'https://wild-and-hungry.herokuapp.com'

export const getFetchUrl = (window.location.hostname.includes('localhost')) ? localhost : herokuhost
