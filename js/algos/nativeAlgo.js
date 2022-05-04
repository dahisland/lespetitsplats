import * as mess from "../patterns/message.js";

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- ALGORITM FOR SEARCH BAR IN NATIVE //
// ------------------------------------------------------------------------------------------- //

function searchInRecipes(container, wordSearch, array, arrayFiltered) {
  let regexInput = new RegExp(`\\ ${wordSearch}\\ ?`, "gi");
  container.innerHTML = "";
  arrayFiltered.length = 0;
  for (let el of array) {
    if (wordSearch.length > 2 && el.contentTxt.match(regexInput)) {
      arrayFiltered.push(el);
    } else if (
      wordSearch.length > 2 &&
      el.contentTxt.substring(0, wordSearch.length) == wordSearch
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
    container.appendChild(elFilt.li);
  }
}

export { searchInRecipes };
