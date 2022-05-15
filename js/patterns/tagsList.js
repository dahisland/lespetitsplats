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

export { tagsListFilter, displayTagsLists };
