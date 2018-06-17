export const header =
  `<div class="first-column column column-md-40 column-sm-66 column-xs-90 flex">
        <div id="logo-wrapper">
            <a href="index.html">
                <img src="images/logo.svg" alt="logo" />
            </a>
        </div>
        <h1>Take eat easy</h1>
    </div>

    <div id="choice-wrapper" class="column column-0 column-md-40 flex">
        <div id="search-wrapper" class="">
            <form class="search" id="search-form">
                <input type="text" id="search-input" placeholder="Chercher un restaurant">
                <button class="btn-search" type="submit">
                <span class="icn icn-search-white"></span>
                </button>
            </form>
        </div>
        <div id="randomeal-btn" class="randomeal-wrapper desktop-only"><a href = "list-restaurants.html?random=eat">
              <span class="icn icn-dice"></span>
              <span class='text-randomeal'>Randomeal</span>
              </a>
        </div>
    </div>
    <div class="last-column column column-md-20 column-sm-33 column-xs-10 flex">
        <div id="connexion-button">
        </div>
        <div id="randomeal-btn" class="btn-red btn-randomeal mobile-only">
        <span class="icn icn-dice"></span>
      </div>
        <div id="btn-search-mobile" class="btn-red btn-search mobile-only">
          <span class="icn icn-search-white"></span>
        </div>
    </div>
    `
