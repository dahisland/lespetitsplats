import * as norm from "../utils/normalizeTxt.js";

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
// -------------------------------------------------------------- DISPLAY SELECTED ACTIVE TAGS //
// ------------------------------------------------------------------------------------------- //

function displayTagsSelected(tagsListTag, containerUl) {
  let tagChecked = document.createElement("li");

  tagsListTag.classList.remove("selectedTags_item--unchecked");
  tagsListTag.classList.add("selectedTags_item--checked");
  tagChecked.innerHTML =
    tagsListTag.innerHTML +
    ` <span class="far fa-times-circle icons icons--close"></span>`;

  if (tagsListTag.parentNode.getAttribute("data-name") == "Appareils") {
    tagChecked.style.background = "#68d9a4";
  }
  if (tagsListTag.parentNode.getAttribute("data-name") == "Ingrédients") {
    tagChecked.style.background = "#3282f7";
  }
  if (tagsListTag.parentNode.getAttribute("data-name") == "Ustensiles") {
    tagChecked.style.background = "#ed6454";
  }

  containerUl.appendChild(tagChecked);
}

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------- STYLE TAGLISTS ON FOCUS //
// ------------------------------------------------------------------------------------------- //

function styleTagsListsOnFocus(
  containerTagsList,
  allContainersTagsList,
  containerUl
) {
  const allBtnDown = document.querySelectorAll(".searchTags_btnDown");
  const allBtnUp = document.querySelectorAll(".searchTags_btnUp");
  const btnDown = containerTagsList.firstElementChild.nextElementSibling;
  const btnUp = btnDown.nextElementSibling;

  allBtnDown.forEach((btn) => {
    btn.style.display = "block";
  });
  allBtnUp.forEach((btn) => {
    btn.style.display = "none";
  });
  allContainersTagsList.forEach((cont) => {
    cont.style.width = "fit-content";
  });
  containerUl.forEach((ul) => {
    ul.style.display = "none";
  });

  // Anim on focusin
  containerTagsList.style.width = "60%";
  containerTagsList.lastElementChild.style.display = "flex";
  btnDown.style.display = "none";
  btnUp.style.display = "block";
}

export {
  tagsListFilter,
  displayTagsLists,
  displayTagsSelected,
  styleTagsListsOnFocus,
};
