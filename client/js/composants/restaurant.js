export const restaurantElement = restaurant => {
  let str = `
  <div class='column column-md-33 column-sm-50 xs-100'>
  <div class="restaurant">
    <div class="simple-infos">
      <img src="${restaurant.url}">
      <h5>${restaurant.name}</h5>
      <h6>${restaurant.category}</h6>
    </div>
    <p class="more-infos">${restaurant.description}</p>
    <a target="_blank" href="https://maps.google.com/?q=${restaurant.location}" class="more-infos">
      <span class="icn icn-location"></span>
      <span class="text">${restaurant.location}</span>
    </a>
   `

  if (restaurant.takeAway === 'Oui') {
    str = `${str}
    <p class="more-infos">
      <span class="icn icn-bag"></span>
      <span>Propose à emporter</span>
    </p> `
  }
  if (restaurant.cart === 'Oui') {
    str =
    /* html */ `${str}
    <p class="more-infos">
      <span class="icn icn-card"></span>
      <span>Accepte la CB</span>
    </p> `
  }
  if (restaurant.vegetarian === 'Oui') {
    str =
    /* html */ `${str}
    <p class="more-infos">
      <span class="icn icn-carrot"></span>
      <span>Propose un plat végétarien</span>
    </p>`
  }
  str = /* html */ `${str}
    <div class="like-wrapper">
      <span class="icn icn-like" id=${restaurant.id}></span>
      <span>${restaurant.like.length}</span>
    </div>
    <p class="price-wrapper">
      <span class="icn icn-price"></span>
      <span>${restaurant.budget}</span>
    </p>
      </div>
    </div>`
  return str
}
