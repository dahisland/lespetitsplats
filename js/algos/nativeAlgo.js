// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- ALGORITM FOR SEARCH BAR IN NATIVE //
// ------------------------------------------------------------------------------------------- //

function searchInRecipes(containerRecipes, inputValue, wordSearch) {
  let regexInput = new RegExp(`\\ ${wordSearch}\\ ?`, "gi");
  const messageNoMatch = document.querySelector(".main_noMatchMessage");

  for (let element of containerRecipes) {
    let noCaseIngredients = element.textContent
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[\:\'\,\.\(\)\!\?\;]/g, " ")
      .replace(/[\s]{2,}/g, " ")
      .toLowerCase();
    if (inputValue.length > 2 && noCaseIngredients.match(regexInput)) {
      element.style.display = "flex";
      element.setAttribute("data-visibility", "visible");
      messageNoMatch.style.display = "none";
    } else if (
      inputValue.length > 2 &&
      noCaseIngredients.substring(0, wordSearch.length) == wordSearch
    ) {
      element.style.display = "flex";
      element.setAttribute("data-visibility", "visible");
      messageNoMatch.style.display = "none";
    } else if (inputValue.length < 3) {
      element.style.display = "flex";
      element.setAttribute("data-visibility", "visible");
      messageNoMatch.style.display = "none";
    } else {
      element.style.display = "none";
      element.setAttribute("data-visibility", "hidden");
      messageNoMatch.style.display = "none";
    }
  }
}

export { searchInRecipes };
