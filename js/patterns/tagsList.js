import * as norm from "../utils/normalizeTxt.js";

// ------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------- ARRAYS FOR EACH TAGS LIST //
// ------------------------------------------------------------------------------------------- //

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------- GET INITIALS TAGS LISTS //
// ------------------------------------------------------------------------------------------- //

// Generate initial tags list object for each tags list filter

class tagsListFilter {
  constructor(tag) {
    this.tag = tag;
  }
  createTagsList(objTagList) {
    let normalizeTagTxt = norm.getNormalizeText(this.tag);
    let upperTagTxt = this.tag[0].toUpperCase() + this.tag.substring(1);

    if (objTagList.tags.includes(normalizeTagTxt) == false) {
      let elementTagList = document.createElement("li");
      elementTagList.innerHTML = upperTagTxt;
      elementTagList.classList.add("selectedTags_item--unchecked");
      objTagList.tags.push(normalizeTagTxt);
      objTagList.li.push(elementTagList);
    }
  }
}

// Function to display tags lists in their containers

function displayTagsLists(attr, containerTags, arrayTags) {
  let normalizeRecipeTxt = attr.tags;
  for (let item of arrayTags.li) {
    if (
      normalizeRecipeTxt.includes(
        norm.getNormalizeText(item.textContent).trim()
      ) == true
    ) {
      containerTags.appendChild(item);
    }
  }
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
// function unselectTag(element) {
//   let tagsIconClose = document.querySelectorAll(
//     ".nav_selectedTags > li > span"
//   );
//   tagsIconClose.forEach((iconClose) => {
//     iconClose.addEventListener("click", () => {
//       if (
//         iconClose.parentNode.getAttribute("data-value") == element.innerHTML
//       ) {
//         element.setAttribute("data-status", "unchecked");
//         element.classList.remove("selectedTags_item--checked");
//         element.classList.add("selectedTags_item--unchecked");
//         iconClose.parentNode.remove();
//       }
//     });
//   });
// }

export { tagsListFilter, displayTagsLists, selectTag };
