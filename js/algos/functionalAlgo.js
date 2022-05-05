import * as mess from "../patterns/message.js";

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------- ALGORITM FOR SEARCH BAR IN FUNCTIONAL //
// ------------------------------------------------------------------------------------------- //

function searchInRecipes(container, wordsSearched, array) {
  container.innerHTML = "";
  // Callback functions
  function filterRecipes(obj) {
    function testEachSearchWord(item) {
      let regexInput = new RegExp(`${item}\\ ?`, "gi");
      return (
        (wordsSearched[0].length > 2 && obj.contentTxt.match(regexInput)) ||
        wordsSearched[0].length < 3
      );
    }
    return wordsSearched.every(testEachSearchWord);
  }

  let arrayFiltered = array.filter(filterRecipes);

  if (arrayFiltered.length == 0) {
    container.appendChild(mess.messageNoFound());
  }
  arrayFiltered.forEach((element) => {
    container.appendChild(element.li);
  });

  return arrayFiltered;
}

export { searchInRecipes };
