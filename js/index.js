import * as animNav from "./utils/animNav.js";
import * as data from "./data/recipes.js";
import * as card from "./patterns/cards.js";
import * as tags from "./patterns/tagsList.js";
import * as algo from "./algos/functionalAlgo.js";
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

data.recipes.forEach((rec) => {
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
});

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- DISPLAY CARDS RECIPES & TAGS LIST //
// ------------------------------------------------------------------------------------------- //

for (let element of arrayRecipes) {
  if (searchInput.value == "") {
    containerRecipes.appendChild(element.li);

    tags.displayTagsLists(element, containerTagsIngredient, objTagsIngredient);
    tags.displayTagsLists(element, containerTagsAppliance, objTagsAppliance);
    tags.displayTagsLists(element, containerTagsUstensil, objTagsUstensil);
  }
}

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------- PREVENT DEFAULT SUBMIT FOR FORM //
// ------------------------------------------------------------------------------------------- //

form.addEventListener("submit", (e) => {
  e.preventDefault();
});

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------------------------- STYLE & EVENTS FOR TAGS SELECTED //
// ------------------------------------------------------------------------------------------- //

const tagsSelectedContainer = document.querySelector(".nav_selectedTags");
let allTags = document.querySelectorAll(".selectedTags_item--unchecked");
let arrayTagsSelected = [];

function filterRecipeByTag() {
  const filterRecipes = (obj) => {
    const testEachSearchWord = (item) => {
      return obj.tags.includes(item) == true;
    };
    return arrayTagsSelected.every(testEachSearchWord);
  };

  if (arrayRecipesFiltered.length == 0) {
    containerRecipes.innerHTML = "";
    arrayRecipesFiltered = arrayRecipes.filter(filterRecipes);
    arrayRecipesFiltered.forEach((arr) => {
      containerRecipes.appendChild(arr.li);
    });
  } else {
    containerRecipes.innerHTML = "";
    arrayRecipesFiltered = arrayRecipesFiltered.filter(filterRecipes);
    arrayRecipesFiltered.forEach((arr) => {
      containerRecipes.appendChild(arr.li);
    });
  }
  return arrayRecipesFiltered;
}

allTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    let containerTagSelected = document.createElement("li");
    if (tag.getAttribute("data-status") == "unchecked") {
      arrayTagsSelected.push(norm.getNormalizeText(tag.textContent));
      tags.selectTag(containerTagSelected, tag);
      tagsSelectedContainer.appendChild(containerTagSelected);
    }

    // filtre des tags
    filterRecipeByTag();

    // Update tags list displays
    containerTagsIngredient.innerHTML = "";
    containerTagsAppliance.innerHTML = "";
    containerTagsUstensil.innerHTML = "";

    arrayRecipesFiltered.forEach((element) => {
      tags.displayTagsLists(
        element,
        containerTagsIngredient,
        objTagsIngredient
      );
      tags.displayTagsLists(element, containerTagsAppliance, objTagsAppliance);
      tags.displayTagsLists(element, containerTagsUstensil, objTagsUstensil);
    });

    //
    let allIconsClose = document.querySelectorAll(
      ".nav_selectedTags > li > span"
    );

    allIconsClose.forEach((icon) => {
      icon.addEventListener("click", () => {
        if (icon.parentNode.getAttribute("data-value") == tag.textContent) {
          tag.setAttribute("data-status", "unchecked");
          tag.classList.remove("selectedTags_item--checked");
          tag.classList.add("selectedTags_item--unchecked");
        }
        icon.parentNode.remove();

        delete arrayTagsSelected[
          arrayTagsSelected.indexOf(norm.getNormalizeText(tag.textContent))
        ];
        console.log(arrayTagsSelected);

        const filterRecipes = (obj) => {
          const testEachSearchWord = (item) => {
            return obj.tags.includes(item) == true;
          };
          return arrayTagsSelected.every(testEachSearchWord);
        };
        containerRecipes.innerHTML = "";
        arrayRecipesFiltered = arrayRecipes.filter(filterRecipes);
        arrayRecipesFiltered.forEach((arr) => {
          containerRecipes.appendChild(arr.li);
        });
      });
    });

    // Update tags list displays
    //   containerTagsIngredient.innerHTML = "";
    //   containerTagsAppliance.innerHTML = "";
    //   containerTagsUstensil.innerHTML = "";

    //   arrayRecipesFiltered.forEach((element) => {
    //     tags.displayTagsLists(
    //       element,
    //       containerTagsIngredient,
    //       objTagsIngredient
    //     );
    //     tags.displayTagsLists(element, containerTagsAppliance, objTagsAppliance);
    //     tags.displayTagsLists(element, containerTagsUstensil, objTagsUstensil);
    //   });
  });
});

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------------------- CALL NATIVE SEARCH ALGO ON EVENT INPUT //
// ------------------------------------------------------------------------------------------- //

searchInput.addEventListener("input", (e) => {
  let searchUser = e.target.value;
  let normalizeSearchUser = norm.getNormalizeText(searchUser).trim();
  // Create array containing each word searched by user (test)
  let regexWord = /([0-9a-z]{0,}\ ?)/g;
  let wordsSearchedArray = normalizeSearchUser.match(regexWord);
  // end test

  // Update cards recipes displays

  algo.searchInRecipes(containerRecipes, wordsSearchedArray, arrayRecipes);
  arrayRecipesFiltered = algo.searchInRecipes(
    containerRecipes,
    wordsSearchedArray,
    arrayRecipes
  );

  // Update tags list displays
  containerTagsIngredient.innerHTML = "";
  containerTagsAppliance.innerHTML = "";
  containerTagsUstensil.innerHTML = "";

  arrayRecipesFiltered.forEach((element) => {
    tags.displayTagsLists(element, containerTagsIngredient, objTagsIngredient);
    tags.displayTagsLists(element, containerTagsAppliance, objTagsAppliance);
    tags.displayTagsLists(element, containerTagsUstensil, objTagsUstensil);
  });
});

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------- SEARCH TAGS //
// ------------------------------------------------------------------------------------------- //
