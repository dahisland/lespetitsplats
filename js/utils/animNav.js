// ------------------------------------------------------------------------------------------- //
// -------------------------------------------------- RESET STYLE FOR ELEMENTS IN TAGS FILTERS //
// ------------------------------------------------------------------------------------------- //

function resetStyleTagsFilters(containerTagsFilters) {
  containerTagsFilters.forEach((filter) => {
    filter.style.width = "fit-content";
    // style for input
    filter.children[0].setAttribute("value", filter.getAttribute("data-name"));
    // Style for button down
    filter.children[1].style.display = "block";
    // Style for button up
    filter.children[2].style.display = "none";
    // Style for tags list
    filter.children[3].style.display = "none";
  });
}

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------ STYLE & EVENTS FOR BUTTON ARROW DOWN //
// ------------------------------------------------------------------------------------------- //

function animDownFilters(containerDownBtns, containerTagsFilters) {
  containerDownBtns.forEach((btn) => {
    const btnParent = btn.parentNode;
    const inputFilter = btn.previousElementSibling;
    const upBtn = btn.nextElementSibling;
    const filterList = btnParent.lastElementChild;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      resetStyleTagsFilters(containerTagsFilters);
      btn.style.display = "none";
      upBtn.style.display = "block";
      filterList.style.display = "flex";
      btnParent.style.width = "60%";
      inputFilter.setAttribute("value", "");
    });
  });
}

// ------------------------------------------------------------------------------------------- //
// -------------------------------------------------------- STYLE & EVENTS FOR BUTTON ARROW UP //
// ------------------------------------------------------------------------------------------- //

function animUpFilters(containerUpBtns, containerTagsFilters) {
  containerUpBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      resetStyleTagsFilters(containerTagsFilters);
    });
  });
}

export { resetStyleTagsFilters, animDownFilters, animUpFilters };
