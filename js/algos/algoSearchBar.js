// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- ALGORITM FOR SEARCH BAR IN NATIVE //
// ------------------------------------------------------------------------------------------- //

// Verify matches of each word in input with textContent recipes
function testWordSearched(obj, arrSearch, arrTest) {
  for (let item of arrSearch) {
    let regexInput = new RegExp(`${item}\\ ?`, "gi");
    if (obj.contentTxt.match(regexInput)) {
      arrTest.push(true);
    } else {
      arrTest.push(false);
    }
  }
}

// Generate array filtered containing all recipes matches with search user
function getArrayRecipesBySearchBar(wordsSearched, array) {
  let arrayFiltered = [];
  for (let obj of array) {
    let arrayTestSearchMatch = obj.testMatchSearch;
    arrayTestSearchMatch.length = 0;
    testWordSearched(obj, wordsSearched, arrayTestSearchMatch);
    if (arrayTestSearchMatch.includes(false) == false) {
      arrayFiltered.push(obj);
    }
  }
  return arrayFiltered;
}

export { getArrayRecipesBySearchBar, testWordSearched };
