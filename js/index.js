import * as animNav from "./utils/animNav.js";
import * as data from "./data/recipes.js";
import * as card from "./patterns/cards.js";
import * as tags from "./patterns/tagsList.js";
import * as algo from "./algos/nativeAlgo.js";
import * as norm from "./utils/normalizeTxt.js";

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------- VARIABLES //
// ------------------------------------------------------------------------------------------- //

const tagsFilters = document.querySelectorAll(".searchTags_filter");
const downBtns = document.querySelectorAll(".searchTags_btnDown");
const upBtns = document.querySelectorAll(".searchTags_btnUp");
const ulTagsList = document.querySelectorAll(".searchTags_tagsList");
const searchInput = document.querySelector(".searchBar_input");
const containerRecipes = document.querySelector(".main_recipesList");

let arrayRecipes = [];
let arrayRecipesFiltered = [];

// Animation of tags filters
animNav.animDownFilters(downBtns, tagsFilters);
animNav.animUpFilters(upBtns, tagsFilters);

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------- IMPLEMENTATION DATAS //
// ------------------------------------------------------------------------------------------- //

data.recipes.forEach((rec) => {
  // ------------------------------------------------------------------ Get data recipes cards //
  let cardRecipe = new card.recipe(
    rec.name,
    rec.time,
    rec.ingredients,
    rec.description
  );
  arrayRecipes.push(cardRecipe.getCard());

  // ------------------------------------------------ Get data tags lists for each tags filter //

  // Get tags list ingredients
  for (let i = 0; i < rec.ingredients.length; i++) {
    let tagsListIngredients = new tags.tagsListFilter(
      rec.ingredients[i].ingredient,
      tags.ingredientsArr,
      ulTagsList[0]
    );
    tagsListIngredients.getTagsList();
  }
  // Get tags list ustensils
  for (let i = 0; i < rec.ustensils.length; i++) {
    let tagsListUstensils = new tags.tagsListFilter(
      rec.ustensils[i],
      tags.ustensilsArr,
      ulTagsList[2]
    );
    tagsListUstensils.getTagsList();
  }
  // Get tags list appliances
  let tagsListAppliance = new tags.tagsListFilter(
    rec.appliance,
    tags.applianceArr,
    ulTagsList[1]
  );
  tagsListAppliance.getTagsList();
});

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------- DISPLAY CARDS RECIPES //
// ------------------------------------------------------------------------------------------- //

for (let element of arrayRecipes) {
  if (searchInput.value == "") {
    containerRecipes.appendChild(element);
  }
}

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------------------- CALL NATIVE SEARCH ALGO ON EVENT INPUT //
// ------------------------------------------------------------------------------------------- //

searchInput.addEventListener("input", (e) => {
  let searchUser = e.target.value;
  let normalizeSearchUser = norm.getNormalizeText(searchUser);

  algo.searchInRecipes(
    containerRecipes,
    normalizeSearchUser,
    arrayRecipes,
    arrayRecipesFiltered
  );
});

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------- STYLE & EVENTS FOR TAGS SELECTED //
// ------------------------------------------------------------------------------------------- //

const tagsSelectedContainer = document.querySelector(".nav_selectedTags");
const allTags = document.querySelectorAll(".selectedTags_item--unchecked");

allTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    let containerTagSelected = document.createElement("p");
    if (tag.getAttribute("data-status") == "unchecked") {
      tags.selectTag(containerTagSelected, tag);
      tagsSelectedContainer.appendChild(containerTagSelected);
    }
    tags.unselectTag(tag);
  });
});
