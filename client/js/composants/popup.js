export const popup =
/* html */ `<span class="close-popup-btn" title="Close Modal" id="close-popup">x</span>
    <div id="message"></div>
    <div class="row row-responsive" id="popup-content">
        <form class="form-content column column-md-50 column-xs-100" id="form-connect">
            <h3>Connexion</h3>
            <h5>Déjà inscrit ? </h5>
            <div class ="input-container">

            <input type="text" placeholder="Ton email" name="email" id="logemail" required>

            <input type="password" placeholder="Ton mot de passe" name="psw" id="logpsw" required>
            </div>

            <p>
                <a href="#">Mot de passe oublié ?</a>
            </p>

            <button class='button-general' id='logsubmit' type='submit'>Se connecter</button>

        </form>
        <div id="auth"></div>
        <form id="sign-out-form" style="display: none">
            <input type="submit" value="logout">
        </form>
        <form class="form-content column column-md-50 column-xs-100" id="form-register">
            <h3>Créer un compte</h3>
            <h5>Pas encore inscrit ? </h5>
            <div class ="input-container">
            <input type="text" placeholder="Ton nom" name="name" id="register-name" required>

            <input type="email" placeholder="Ton email" name="email" id="register-email" required>

            <input type="password" placeholder="Choisir un mot de passe" name="psw" id="register-psw" required>

            <input type="password" placeholder="Confirmer le mot de passe" name="regist-psw-repeat" id="confirm-psw" required>
            </div>

            <button class='button-general' id='registsubmit' type='submit'>S'inscrire</button>
        </form>
  </div>`
