export const isConnected = user => {
  return `
  <div class="connexion-wrapper">
    <div id="sign-out" class="btn-red icn-connexion-wrapper">
      <span class="icn icn-logout"></span>
    </div>
    <div class="btn-red connected">
    <a href="profile.html">
      <span class="icn icn-profile"></span>
      <span class="text">Hello ${user.name} ! </span>
    </a>
    </div>
  </div>
  `
}

export const isNotConnected =
  `
  <div id="open-popup" class="btn-red">
    <span class="icn icn-profile"></span>
    <span class="text">Connexion</span>
  </div>
`
