import * as mess from "../patterns/message.js";
import * as norm from "../utils/normalizeTxt.js";

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- ALGORITM FOR SEARCH BAR IN NATIVE //
// ------------------------------------------------------------------------------------------- //

function searchInRecipes(container, wordSearch, array) {
  let regexInput = new RegExp(`\\ ${wordSearch}\\ ?`, "gi");
  container.innerHTML = "";

  function filterArray(obj) {
    let normalizeIngredients = norm.getNormalizeText(obj.li.textContent);
    if (wordSearch.length > 2 && normalizeIngredients.match(regexInput)) {
      return true;
    } else if (
      wordSearch.length > 2 &&
      normalizeIngredients.substring(0, wordSearch.length) == wordSearch
    ) {
      return true;
    } else if (wordSearch.length < 3) {
      return true;
    } else {
      return false;
    }
  }
  let arrayFiltered = array.filter(filterArray);
  if (arrayFiltered.length == 0) {
    container.appendChild(mess.messageNoFound());
  }
  arrayFiltered.forEach((elFilt) => {
    container.appendChild(elFilt.li);
  });
  return arrayFiltered;
}

export { searchInRecipes };
