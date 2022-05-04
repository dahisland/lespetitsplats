import * as norm from "../utils/normalizeTxt.js";

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------- ARRAYS FOR EACH TAGS LIST //
// ------------------------------------------------------------------------------------------- //

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------- GET INITIALS TAGS LISTS //
// ------------------------------------------------------------------------------------------- //

// Generate initial tags list for each tags list filter

class tagsListFilter {
  constructor(tag, arrayTag) {
    this.tag = tag;
    this.arrayTag = arrayTag;
  }
  createTagsList() {
    let noCaseString = norm.getNormalizeText(this.tag);
    let displayString = this.tag[0].toUpperCase() + this.tag.substring(1);
    let elementTagList = document.createElement("li");
    elementTagList.classList.add("selectedTags_item--unchecked");
    elementTagList.setAttribute("data-status", "unchecked");

    if (this.arrayTag.includes(noCaseString) == false) {
      this.arrayTag.push(noCaseString);
      elementTagList.innerHTML = displayString;
    }
    return elementTagList;
  }
}

// Function to create arrays containing tags lists elements
function createArrayTagsList(dataTag, arrayTxtContent, arrayContainer) {
  let tagsListItem = new tagsListFilter(dataTag, arrayTxtContent);
  let tagItem = tagsListItem.createTagsList();
  if (tagItem.textContent != "") {
    arrayContainer.push(tagItem);
  }
}

// Function to display tags lists in their containers
function displayTagsLists(arrRecipe, containerTags, arrayTags) {
  containerTags.innerHTML = "";
  arrRecipe.forEach((arr) => {
    let normalizeRecipeTxt = arr.tags;
    for (let item of arrayTags) {
      let normalizeTagsTxt = norm.getNormalizeText(item.textContent);
      if (normalizeRecipeTxt.includes(normalizeTagsTxt) == true) {
        containerTags.appendChild(item);
      }
    }
  });
}

// ------------------------------------------------------------------------------------------- //
// --------------------------------------------------------- DISPLAY/HIDE SELECTED ACTIVE TAGS //
// ------------------------------------------------------------------------------------------- //

// Function for display tags selected in the tags-selected bar
function selectTag(tagSelect, element) {
  tagSelect.innerHTML =
    element.innerHTML +
    '<span class="far fa-times-circle icons icons--close"></span>';
  tagSelect.setAttribute("data-value", element.innerHTML);
  element.setAttribute("data-status", "checked");
  element.classList.remove("selectedTags_item--unchecked");
  element.classList.add("selectedTags_item--checked");
  if (element.parentNode.getAttribute("data-name") == "Appareils") {
    tagSelect.style.background = "#68d9a4";
  }
  if (element.parentNode.getAttribute("data-name") == "Ingrédients") {
    tagSelect.style.background = "#3282f7";
  }
  if (element.parentNode.getAttribute("data-name") == "Ustensiles") {
    tagSelect.style.background = "#ed6454";
  }
}

// function for hide tags unselected in the tags-selected bar
function unselectTag(element) {
  let tagsIconClose = document.querySelectorAll(".nav_selectedTags > p > span");
  tagsIconClose.forEach((iconClose) => {
    iconClose.addEventListener("click", () => {
      if (
        iconClose.parentNode.getAttribute("data-value") == element.innerHTML
      ) {
        element.setAttribute("data-status", "unchecked");
        element.classList.remove("selectedTags_item--checked");
        element.classList.add("selectedTags_item--unchecked");
        iconClose.parentNode.style.display = "none";
      }
    });
  });
}

export {
  tagsListFilter,
  createArrayTagsList,
  displayTagsLists,
  selectTag,
  unselectTag,
};
