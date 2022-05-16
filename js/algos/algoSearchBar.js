import * as mess from "../patterns/message.js";

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------- ALGORITM FOR SEARCH BAR IN FUNCTIONAL //
// ------------------------------------------------------------------------------------------- //

function getArrayRecipesBySearchBar(arrayWordsSearched, arrayToFilter) {
  //callback function
  const filterRecipes = (obj) => {
    const testEachSearchWord = (item) => {
      let regexInput = new RegExp(`${item}\\ ?`, "gi");
      return obj.contentTxt.match(regexInput);
    };
    return arrayWordsSearched.every(testEachSearchWord);
  };
  let arrayFiltered = arrayToFilter.filter(filterRecipes);
  return arrayFiltered;
}

export { getArrayRecipesBySearchBar };
