import * as animNav from "./utils/animNav.js";
import * as data from "./data/recipes.js";
import * as card from "./patterns/cards.js";
import * as tags from "./patterns/tagsList.js";
import * as algoBar from "./algos/algoSearchBar.js";
import * as algoTag from "./algos/algoByTag.js";
import * as norm from "./utils/normalizeTxt.js";
import * as mess from "./patterns/message.js";

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------------------------------- VARIABLES //
// ------------------------------------------------------------------------------------------- //

const tagsFilters = document.querySelectorAll(".searchTags_filter");
const downBtns = document.querySelectorAll(".searchTags_btnDown");
const upBtns = document.querySelectorAll(".searchTags_btnUp");
const ulTagsList = document.querySelectorAll(".searchTags_tagsList");
const containerTagsIngredient = ulTagsList[0];
const containerTagsAppliance = ulTagsList[1];
const containerTagsUstensil = ulTagsList[2];
const searchInput = document.querySelector(".searchBar_input");
const containerRecipes = document.querySelector(".main_recipesList");
const form = document.querySelector("form");

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------ ARRAYS //
// ------------------------------------------------------------------------------------------- //

// ----------------------------------------------------- Containers recipes & recipes filtered //

let arrayRecipes = [];
let arrayRecipesFiltered = [];

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------- OBJECTS //
// ------------------------------------------------------------------------------------------- //

// ----------------------------------------------------------------- Containers for tags lists //

let objTagsIngredient = {
  tags: [],
  li: [],
};
let objTagsUstensil = {
  tags: [],
  li: [],
};
let objTagsAppliance = {
  tags: [],
  li: [],
};

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------- INTERACTIONS FOR TAGS FILTERS //
// ------------------------------------------------------------------------------------------- //

animNav.animDownFilters(downBtns, tagsFilters);
animNav.animUpFilters(upBtns, tagsFilters);

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------------------- IMPLEMENTATION DATAS //
// ------------------------------------------------------------------------------------------- //

for (let rec of data.recipes) {
  // ------------------------------------------------------------------ Get data recipes cards //
  let cardRecipe = new card.recipe(
    rec.name,
    rec.time,
    rec.appliance,
    rec.ustensils,
    rec.ingredients,
    rec.description
  );
  cardRecipe.getCard(arrayRecipes);

  // ------------------------------------------------ Get data tags lists for each tags filter //

  for (let i = 0; i < rec.ingredients.length; i++) {
    let ingredientsClass = new tags.tagsListFilter(
      rec.ingredients[i].ingredient
    );
    ingredientsClass.createTagsList(objTagsIngredient);
  }
  for (let i = 0; i < rec.ustensils.length; i++) {
    let ustensilsClass = new tags.tagsListFilter(rec.ustensils[i]);
    ustensilsClass.createTagsList(objTagsUstensil);
  }
  let applianceClass = new tags.tagsListFilter(rec.appliance);
  applianceClass.createTagsList(objTagsAppliance);
}

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- DISPLAY CARDS RECIPES & TAGS LIST //
// ------------------------------------------------------------------------------------------- //

// Update tags list displays
function updateTagsLists(element) {
  tags.displayTagsLists(element, containerTagsIngredient, objTagsIngredient);
  tags.displayTagsLists(element, containerTagsAppliance, objTagsAppliance);
  tags.displayTagsLists(element, containerTagsUstensil, objTagsUstensil);
}

for (let element of arrayRecipes) {
  if (searchInput.value == "") {
    containerRecipes.appendChild(element.li);
    updateTagsLists(element);
  }
}

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------- PREVENT DEFAULT SUBMIT FOR FORM //
// ------------------------------------------------------------------------------------------- //

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------- SEARCH EVENTS //
// ------------------------------------------------------------------------------------------- //

const tagsSelectedUl = document.querySelector(".nav_selectedTags");
let tagsSelectedLi = tagsSelectedUl.childNodes;
const containerSeachTags = document.querySelectorAll(".searchTags_filter");

let allTags = document.querySelectorAll(".selectedTags_item--unchecked");
let arrayTagsSelected = [];
let arrayInputSearchBar = [];

// Display recipes filtered
function displayRecipesFiltered(array) {
  for (let element of array) {
    containerRecipes.appendChild(element.li);
    updateTagsLists(element);
  }
}

// Reset containers
function resetContainers() {
  containerTagsIngredient.innerHTML = "";
  containerTagsAppliance.innerHTML = "";
  containerTagsUstensil.innerHTML = "";
  containerRecipes.innerHTML = "";
}

// ------------------------------------------------------------- Events input for search bar //
searchInput.addEventListener("input", (e) => {
  // Create array containing each word searched by user
  let normalizeSearchUser = norm.getNormalizeText(e.target.value).trim();
  let regexWord = /([0-9a-z]{1,}\ ?)/g;
  arrayInputSearchBar = normalizeSearchUser.match(regexWord);

  console.log(arrayInputSearchBar);
  resetContainers();

  let lengthTagSelected = tagsSelectedLi.length;
  arrayRecipesFiltered = [];

  switch (lengthTagSelected) {
    case 0:
      {
        if (arrayInputSearchBar != null && arrayInputSearchBar[0].length > 2) {
          arrayRecipesFiltered = algoBar.getArrayRecipesBySearchBar(
            arrayInputSearchBar,
            arrayRecipes
          );
          if (arrayRecipesFiltered.length != 0) {
            displayRecipesFiltered(arrayRecipesFiltered);
          } else {
            containerRecipes.appendChild(mess.messageNoMatch());
          }
        } else {
          displayRecipesFiltered(arrayRecipes);
        }
      }
      break;
    default: {
      if (arrayInputSearchBar != null && arrayInputSearchBar[0].length > 2) {
        arrayRecipesFiltered = algoBar.getArrayRecipesBySearchBar(
          arrayInputSearchBar,
          arrayRecipes
        );
        arrayRecipesFiltered = algoTag.getArrayRecipesByTags(
          arrayTagsSelected,
          arrayRecipesFiltered
        );
      } else {
        arrayRecipesFiltered = algoTag.getArrayRecipesByTags(
          arrayTagsSelected,
          arrayRecipes
        );
      }
      if (arrayRecipesFiltered.length != 0) {
        displayRecipesFiltered(arrayRecipesFiltered);
      } else {
        containerRecipes.appendChild(mess.messageNoMatch());
      }
    }
  }
});

// ----------------------------------------------------------------- Event on click for tags //

function displayRecipesByTag() {
  arrayTagsSelected.length = 0;
  resetContainers();

  // Create array containing each word searched by user
  let normalizeInputSearchBar = norm.getNormalizeText(searchInput.value).trim();
  let regexWord = /([0-9a-z]{0,}\ ?)/g;
  arrayInputSearchBar = normalizeInputSearchBar.match(regexWord);
  // Create array containing each selected tag textContent
  for (let li of tagsSelectedLi) {
    let tagNormalizedText = norm.getNormalizeText(li.textContent).trim();
    arrayTagsSelected.push(tagNormalizedText);
  }

  // Generate array containing recipes filtered
  if (arrayInputSearchBar[0].length < 3) {
    arrayRecipesFiltered = algoTag.getArrayRecipesByTags(
      arrayTagsSelected,
      arrayRecipes
    );
  } else {
    arrayRecipesFiltered = algoBar.getArrayRecipesBySearchBar(
      arrayInputSearchBar,
      arrayRecipes
    );
    arrayRecipesFiltered = algoTag.getArrayRecipesByTags(
      arrayTagsSelected,
      arrayRecipesFiltered
    );
  }

  // Display result of search (recipes filtered)
  if (arrayRecipesFiltered.length != 0) {
    displayRecipesFiltered(arrayRecipesFiltered);
  } else {
    containerRecipes.appendChild(mess.messageNoMatch());
  }
}

for (let tag of allTags) {
  tag.addEventListener("click", (e) => {
    //display tags selected in the tags selected bar
    if (tag.classList == "selectedTags_item--unchecked") {
      tags.displayTagsSelected(tag, tagsSelectedUl);
    }
    // Updating recipes displays
    displayRecipesByTag();

    // Add event for buttons close for tags selected in the tags selected bar
    let allIconsSpan = document.querySelectorAll(
      ".nav_selectedTags > li > span"
    );
    for (let icon of allIconsSpan) {
      icon.addEventListener("click", () => {
        tag.classList.remove("selectedTags_item--checked");
        tag.classList.add("selectedTags_item--unchecked");
        icon.parentNode.remove();
        // Updating recipes displays
        displayRecipesByTag();
      });
    }
  });
}

// ---------------------------------------  Events for update tagslists using input for tags //

for (let container of containerSeachTags) {
  let arrayLiTagsLists = [];
  arrayLiTagsLists.length = 0;
  let tagsFromTagList = container.lastElementChild.childNodes;
  let input = container.firstElementChild;

  // Events on focus
  input.addEventListener("focusin", () => {
    input.value = "";
    tagsFromTagList = container.lastElementChild.childNodes;
    arrayLiTagsLists.length = 0;
    for (let li of tagsFromTagList) {
      arrayLiTagsLists.push(li);
    }
    tags.styleTagsListsOnFocus(container, containerSeachTags, ulTagsList);
  });

  input.addEventListener("focusout", () => {
    input.value = input.getAttribute("data-value");
  });

  // Events on input
  input.addEventListener("input", (e) => {
    e.preventDefault();
    let tagValueNormalized = norm.getNormalizeText(e.target.value).trim();
    let regexInput = new RegExp(`${tagValueNormalized}\\ ?`, "gi");
    let arrayTagsFiltered = [];

    arrayTagsFiltered = algoTag.getArrayTags(arrayLiTagsLists, regexInput);

    container.lastElementChild.innerHTML = "";
    if (arrayTagsFiltered.length != 0) {
      for (let li of arrayTagsFiltered) {
        container.lastElementChild.appendChild(li);
      }
    } else {
      container.lastElementChild.appendChild(mess.messageTagNoMatch());
    }
  });
}
