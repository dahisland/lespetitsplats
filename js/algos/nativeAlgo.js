import * as mess from "../patterns/message.js";

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- ALGORITM FOR SEARCH BAR IN NATIVE //
// ------------------------------------------------------------------------------------------- //
function testWordSearched(obj, arrSearch, arrTest) {
  for (let item of arrSearch) {
    let regexInput = new RegExp(`${item}\\ ?`, "gi");
    if (arrSearch[0].length > 2 && !obj.contentTxt.match(regexInput)) {
      arrTest.push(1);
    } else {
      arrTest.push(0);
    }
  }
}

function searchInRecipes(container, wordsSearched, array, arrayFiltered) {
  container.innerHTML = "";
  arrayFiltered.length = 0;

  for (let obj of array) {
    let arrayTestSearchMatch = obj.testMatchSearch;
    arrayTestSearchMatch.length = 0;
    testWordSearched(obj, wordsSearched, arrayTestSearchMatch);
    if (arrayTestSearchMatch.includes(1) == false) {
      arrayFiltered.push(obj);
    }
  }

  if (arrayFiltered.length == 0) {
    container.appendChild(mess.messageNoFound());
  }
  for (let obj of arrayFiltered) {
    container.appendChild(obj.li);
  }
}

export { searchInRecipes };
