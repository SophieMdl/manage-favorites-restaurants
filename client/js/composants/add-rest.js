export const addtEtab =
  `
<h1>Ajouter un nouveau restaurant</h1>

    <p>Remplissez les champs ci-dessous :</p>

    <form id="form">
      <div>
        <label>Nom : <input type="text" id="name-etab" required name="nom" value="nameresto"/></label>
      </div>

      <div>
        <label>Adresse : <input type="text" id="adress-etab" name="adresse" value="Adresse" /></label>
      </div>

      <div>
        <label>Catégorie : <select name="category" id="catego-etab">
          <option value="Choisir">Choisir</option>
          <option value="asiatique">Asiatique</option>
          <option value="burger">Burger</option>
          <option value="francais">Français</option>
          <option value="healthy">Healthy</option>
          <option value="pizza">Pizza</option>
          <option value="snack">Snack</option>
        </select></label>
      </div>

      <div>
        <label>Photo :
          <input id="file" type="file" /></label>
        </div>


        <div>
          <label>Budget : <select name="budget" id="budget-etab">
            <option value="Choisir">Choisir</option>
            <option value="0-5">Entre 0 et 5 €</option>
            <option value="5-10">Entre 5 et 10 €</option>
            <option value="10-15">Entre 10 et 15 €</option>
            <option value="+15">Plus de 15 €</option>
          </select></label>
        </div>

        <div>
          <label>Description : <textarea name="description" id="description-etab"></textarea></label>
        </div>

        <div>
          <label>Carte bleue acceptée :
            <input type="checkbox" name="cb" id="cb-etab" /></label>
          </div>

          <div>
            <label>Adapté pour les végétariens :
              <input type="checkbox" name="vege" id="vege-etab" /></label>
            </div>

            <div class="button-wrapper">
              <button type="submit" value="Envoyer"> Envoyer</button>
            </div>
          </form>
    `
