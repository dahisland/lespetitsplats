import * as norm from "../utils/normalizeTxt.js";

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------- ALGO FOR SEARCH RECIPES BY TAGS //
// ------------------------------------------------------------------------------------------- //

function getArrayRecipesByTags(arrayTagsChecked, arrayToFilter) {
  const filterRecipesByTag = (obj) => {
    const testEachTagWord = (item) => {
      return obj.tags.includes(item) == true;
    };
    return arrayTagsChecked.every(testEachTagWord);
  };
  let arrayFiltered = arrayToFilter.filter(filterRecipesByTag);
  return arrayFiltered;
}

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------- ALGO FOR SEARCH TAG IN TAGSLISTS //
// ------------------------------------------------------------------------------------------- //

function getArrayTags(arrayToFilter, regex) {
  const matchTag = (obj) => {
    return norm.getNormalizeText(obj.textContent).trim().match(regex);
  };
  let arrayFiltered = arrayToFilter.filter(matchTag);
  return arrayFiltered;
}

export { getArrayRecipesByTags, getArrayTags };
