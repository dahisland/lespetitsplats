import * as mess from "../patterns/message.js";

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- ALGORITM FOR SEARCH BAR IN NATIVE //
// ------------------------------------------------------------------------------------------- //
const containerRecipes = document.querySelector(".main_recipesList");
let arrayRecipesFiltered = [];

function searchInRecipes(wordSearch, array) {
  let regexInput = new RegExp(`\\ ${wordSearch}\\ ?`, "gi");
  containerRecipes.innerHTML = "";
  arrayRecipesFiltered.length = 0;
  for (let el of array) {
    let normalizeIngredients = el.textContent
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\:\'\,\.\(\)\!\?\;]/g, " ")
      .replace(/[\s]{2,}/g, " ")
      .toLowerCase();
    if (wordSearch.length > 2 && normalizeIngredients.match(regexInput)) {
      arrayRecipesFiltered.push(el);
    } else if (
      wordSearch.length > 2 &&
      normalizeIngredients.substring(0, wordSearch.length) == wordSearch
    ) {
      arrayRecipesFiltered.push(el);
    } else if (wordSearch.length < 3) {
      arrayRecipesFiltered.push(el);
    }
  }
  if (arrayRecipesFiltered.length == 0) {
    containerRecipes.appendChild(mess.messageNoFound());
  }
  for (let elFilt of arrayRecipesFiltered) {
    containerRecipes.appendChild(elFilt);
  }
}

export { searchInRecipes };
