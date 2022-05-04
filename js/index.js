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
const containerTagsIngredients = ulTagsList[0];
const containerTagsAppliances = ulTagsList[1];
const containerTagsUstensils = ulTagsList[2];
const searchInput = document.querySelector(".searchBar_input");
const containerRecipes = document.querySelector(".main_recipesList");

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------ ARRAYS //
// ------------------------------------------------------------------------------------------- //

// ----------------------------------------------------- Containers recipes & recipes filtered //
let arrayRecipes = [];
let arrayRecipesFiltered = [];

// ----------------------------------------------------------------- Containers for tags lists //
let arrayTagsIngredients = [];
let arrayTagsAppliances = [];
let arrayTagsUstensils = [];

// ------------------------------------------------------- TextContent normalized of tags list //
let ingredientsArr = [];
let applianceArr = [];
let ustensilsArr = [];

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------- INTERACTIONS FOR TAGS FILTERS //
// ------------------------------------------------------------------------------------------- //

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

  let ingredientsByRecipeArr = [];
  ingredientsByRecipeArr.length = 0;
  for (let i = 0; i < rec.ingredients.length; i++) {
    ingredientsByRecipeArr.push(rec.ingredients[i].ingredient);
  }
  // Create obj with container li, tags & description for each recipe
  let objRecipe = {
    name: norm.getNormalizeText(rec.name),
    li: cardRecipe.getCard(),
    tags: norm.getNormalizeText(
      ingredientsByRecipeArr.toString() +
        " " +
        rec.appliance +
        " " +
        rec.ustensils
    ),
    description: norm.getNormalizeText(rec.description),
  };
  console.log(rec.ustensils);
  // Push obj in an array
  arrayRecipes.push(objRecipe);

  // ------------------------------------------------ Get data tags lists for each tags filter //

  for (let i = 0; i < rec.ingredients.length; i++) {
    tags.createArrayTagsList(
      rec.ingredients[i].ingredient,
      ingredientsArr,
      arrayTagsIngredients
    );
  }
  for (let i = 0; i < rec.ustensils.length; i++) {
    tags.createArrayTagsList(
      rec.ustensils[i],
      ustensilsArr,
      arrayTagsUstensils
    );
  }
  tags.createArrayTagsList(rec.appliance, applianceArr, arrayTagsAppliances);
});
// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- DISPLAY TAGS LIST //
// ------------------------------------------------------------------------------------------- //

tags.displayTagsLists(
  arrayRecipes,
  containerTagsIngredients,
  arrayTagsIngredients
);
tags.displayTagsLists(
  arrayRecipes,
  containerTagsAppliances,
  arrayTagsAppliances
);
tags.displayTagsLists(arrayRecipes, containerTagsUstensils, arrayTagsUstensils);

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------- DISPLAY CARDS RECIPES //
// ------------------------------------------------------------------------------------------- //

for (let element of arrayRecipes) {
  if (searchInput.value == "") {
    containerRecipes.appendChild(element.li);
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
  tags.displayTagsLists(
    arrayRecipesFiltered,
    containerTagsIngredients,
    arrayTagsIngredients
  );
  tags.displayTagsLists(
    arrayRecipesFiltered,
    containerTagsUstensils,
    arrayTagsUstensils
  );
  tags.displayTagsLists(
    arrayRecipesFiltered,
    containerTagsAppliances,
    arrayTagsAppliances
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
