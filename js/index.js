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

// ------------------------------------------------------------------------------------------- //
// ---------------------------------------------------- CALL NATIVE SEARCH ALGO ON EVENT INPUT //
// ------------------------------------------------------------------------------------------- //

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------- TEST SEARCH //
// ------------------------------------------------------------------------------------------- //
const tagsSelectedContainer = document.querySelector(".nav_selectedTags");

let allTags = document.querySelectorAll(".selectedTags_item--unchecked");
let arrayTagsSelected = [];
let wordsInputSearchBarArray = [];

// Update tags list displays
function updateTagsLists(element) {
  tags.displayTagsLists(element, containerTagsIngredient, objTagsIngredient);
  tags.displayTagsLists(element, containerTagsAppliance, objTagsAppliance);
  tags.displayTagsLists(element, containerTagsUstensil, objTagsUstensil);
}

// Callback functions
const filterRecipes = (obj) => {
  const testEachSearchWord = (item) => {
    let regexInput = new RegExp(`${item}\\ ?`, "gi");
    return obj.contentTxt.match(regexInput);
  };
  return wordsInputSearchBarArray.every(testEachSearchWord);
};
const filterRecipesByTag = (obj) => {
  const testEachTagWord = (item) => {
    return obj.tags.includes(item) == true;
  };
  return arrayTagsSelected.every(testEachTagWord);
};

// algo for search bar
searchInput.addEventListener("input", (e) => {
  let searchUser = e.target.value;
  let normalizeSearchUser = norm.getNormalizeText(searchUser).trim();
  // Create array containing each word searched by user
  let regexWord = /([0-9a-z]{0,}\ ?)/g;
  wordsInputSearchBarArray = normalizeSearchUser.match(regexWord);

  containerTagsIngredient.innerHTML = "";
  containerTagsAppliance.innerHTML = "";
  containerTagsUstensil.innerHTML = "";
  containerRecipes.innerHTML = "";

  if (
    tagsSelectedContainer.childNodes.length == 0 &&
    wordsInputSearchBarArray[0].length > 2
  ) {
    arrayRecipesFiltered = arrayRecipes.filter(filterRecipes);
    if (arrayRecipesFiltered.length != 0) {
      arrayRecipesFiltered.forEach((element) => {
        containerRecipes.appendChild(element.li);
        updateTagsLists(element);
      });
    } else {
      containerRecipes.appendChild(mess.messageNoMatch());
    }
  }
  if (
    tagsSelectedContainer.childNodes.length == 0 &&
    wordsInputSearchBarArray[0].length < 3
  ) {
    arrayRecipes.forEach((element) => {
      containerRecipes.appendChild(element.li);
      updateTagsLists(element);
    });
  }

  if (
    tagsSelectedContainer.childNodes.length != 0 &&
    wordsInputSearchBarArray[0].length > 2
  ) {
    arrayRecipesFiltered = arrayRecipes.filter(filterRecipes);
    arrayRecipesFiltered = arrayRecipesFiltered.filter(filterRecipesByTag);

    if (arrayRecipesFiltered.length != 0) {
      arrayRecipesFiltered.forEach((element) => {
        containerRecipes.appendChild(element.li);
        updateTagsLists(element);
      });
    } else {
      containerRecipes.appendChild(mess.messageNoMatch());
    }
  }
  if (
    tagsSelectedContainer.childNodes.length != 0 &&
    wordsInputSearchBarArray[0].length < 3
  ) {
    arrayRecipesFiltered = arrayRecipes.filter(filterRecipesByTag);

    if (arrayRecipesFiltered.length != 0) {
      arrayRecipesFiltered.forEach((element) => {
        containerRecipes.appendChild(element.li);
        updateTagsLists(element);
      });
    } else {
      containerRecipes.appendChild(mess.messageNoMatch());
    }
  }
});
// tag search
allTags.forEach((tag) => {
  tag.addEventListener("click", () => {
    tag.classList.remove("selectedTags_item--unchecked");
    tag.classList.add("selectedTags_item--checked");
    let tagSelected = document.createElement("li");
    tagSelected.innerHTML =
      tag.innerHTML +
      ` <span class="far fa-times-circle icons icons--close"></span>`;
    if (tag.parentNode.getAttribute("data-name") == "Appareils") {
      tagSelected.style.background = "#68d9a4";
    }
    if (tag.parentNode.getAttribute("data-name") == "Ingrédients") {
      tagSelected.style.background = "#3282f7";
    }
    if (tag.parentNode.getAttribute("data-name") == "Ustensiles") {
      tagSelected.style.background = "#ed6454";
    }

    tagsSelectedContainer.appendChild(tagSelected);

    function displayRecipesByTag() {
      arrayTagsSelected.length = 0;
      containerTagsIngredient.innerHTML = "";
      containerTagsAppliance.innerHTML = "";
      containerTagsUstensil.innerHTML = "";
      containerRecipes.innerHTML = "";

      tagsSelectedContainer.childNodes.forEach((tagSelected) => {
        let tagNormalizedText = norm
          .getNormalizeText(tagSelected.textContent)
          .trim();
        arrayTagsSelected.push(tagNormalizedText);
      });

      let normalizeInputSearchBar = norm
        .getNormalizeText(searchInput.value)
        .trim();
      // Create array containing each word searched by user
      let regexWord = /([0-9a-z]{0,}\ ?)/g;
      wordsInputSearchBarArray = normalizeInputSearchBar.match(regexWord);

      if (wordsInputSearchBarArray[0].length < 3) {
        arrayRecipesFiltered = arrayRecipes.filter(filterRecipesByTag);
        if (arrayRecipesFiltered.length != 0) {
          arrayRecipesFiltered.forEach((element) => {
            containerRecipes.appendChild(element.li);
            updateTagsLists(element);
          });
        } else {
          containerRecipes.appendChild(mess.messageNoMatch());
        }
      }
      if (wordsInputSearchBarArray[0].length > 2) {
        arrayRecipesFiltered = arrayRecipes.filter(filterRecipes);
        arrayRecipesFiltered = arrayRecipesFiltered.filter(filterRecipesByTag);
        if (arrayRecipesFiltered.length != 0) {
          arrayRecipesFiltered.forEach((element) => {
            containerRecipes.appendChild(element.li);
            updateTagsLists(element);
          });
        } else {
          containerRecipes.appendChild(mess.messageNoMatch());
        }
      }
    }

    displayRecipesByTag();

    let allIconSpan = document.querySelectorAll(
      ".nav_selectedTags > li > span"
    );

    allIconSpan.forEach((icon) => {
      icon.addEventListener("click", () => {
        tag.classList.remove("selectedTags_item--checked");
        tag.classList.add("selectedTags_item--unchecked");

        icon.parentNode.remove();
        displayRecipesByTag();
      });
    });
  });
});

const containerSeachTags = document.querySelectorAll(".searchTags_filter");
containerSeachTags.forEach((container) => {
  let arrayLiTagsLists = [];
  arrayLiTagsLists.length = 0;
  let tagsFromTagList = container.lastElementChild.childNodes;

  container.addEventListener("focusin", () => {
    //reset
    const allBtnDown = document.querySelectorAll(".searchTags_btnDown");
    const allBtnUp = document.querySelectorAll(".searchTags_btnUp");
    const btnDown = container.firstElementChild.nextElementSibling;
    const btnUp = btnDown.nextElementSibling;

    allBtnDown.forEach((btn) => {
      btn.style.display = "block";
    });
    allBtnUp.forEach((btn) => {
      btn.style.display = "none";
    });
    containerSeachTags.forEach((cont) => {
      cont.style.width = "fit-content";
    });
    ulTagsList.forEach((ul) => {
      ul.style.display = "none";
    });

    // Anim on focusin
    container.style.width = "60%";
    container.lastElementChild.style.display = "flex";
    btnDown.style.display = "none";
    btnUp.style.display = "block";
  });

  let input = container.firstElementChild;
  input.addEventListener("focusin", () => {
    input.value = "";
    tagsFromTagList = container.lastElementChild.childNodes;
    arrayLiTagsLists.length = 0;
    tagsFromTagList.forEach((li) => {
      arrayLiTagsLists.push(li);
    });
  });

  input.addEventListener("focusout", () => {
    input.value = input.getAttribute("data-value");
  });

  input.addEventListener("input", (e) => {
    e.preventDefault();
    let tagValueNormalized = norm.getNormalizeText(e.target.value).trim();
    let regexInput = new RegExp(`${tagValueNormalized}\\ ?`, "gi");

    const matchTag = (obj) => {
      return norm.getNormalizeText(obj.textContent).trim().match(regexInput);
    };
    let arrayFiltered = arrayLiTagsLists.filter(matchTag);
    console.log(arrayFiltered);

    container.lastElementChild.innerHTML = "";
    if (arrayFiltered.length != 0) {
      arrayFiltered.forEach((li) => {
        container.lastElementChild.appendChild(li);
      });
    } else {
      container.lastElementChild.appendChild(mess.messageNoMatch());
    }
  });
});
