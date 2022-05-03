import * as mess from "../patterns/message.js";
import * as norm from "../utils/normalizeTxt.js";

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- ALGORITM FOR SEARCH BAR IN NATIVE //
// ------------------------------------------------------------------------------------------- //

function searchInRecipes(container, wordSearch, array, arrayFiltered) {
  let regexInput = new RegExp(`\\ ${wordSearch}\\ ?`, "gi");
  container.innerHTML = "";
  arrayFiltered.length = 0;
  for (let el of array) {
    let normalizeIngredients = norm.getNormalizeText(el.textContent);
    if (wordSearch.length > 2 && normalizeIngredients.match(regexInput)) {
      arrayFiltered.push(el);
    } else if (
      wordSearch.length > 2 &&
      normalizeIngredients.substring(0, wordSearch.length) == wordSearch
    ) {
      arrayFiltered.push(el);
    } else if (wordSearch.length < 3) {
      arrayFiltered.push(el);
    }
  }
  if (arrayFiltered.length == 0) {
    container.appendChild(mess.messageNoFound());
  }
  for (let elFilt of arrayFiltered) {
    container.appendChild(elFilt);
  }
}

export { searchInRecipes };
