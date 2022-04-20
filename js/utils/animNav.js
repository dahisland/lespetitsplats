function resetTagsFilters(containerTagsFilters) {
  containerTagsFilters.forEach((filter) => {
    filter.style.width = "fit-content";
    filter.children[0].setAttribute("value", filter.getAttribute("data-name"));
    filter.children[1].style.display = "block";
    filter.children[2].style.display = "none";
    filter.children[3].style.display = "none";
  });
}
function animDownFilters(containerDownBtns, containerTagsFilters) {
  containerDownBtns.forEach((btn) => {
    const btnParent = btn.parentNode;
    const inputFilter = btn.previousElementSibling;
    const upBtn = btn.nextElementSibling;
    const filterList = btnParent.lastElementChild;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      resetTagsFilters(containerTagsFilters);
      btn.style.display = "none";
      upBtn.style.display = "block";
      filterList.style.display = "flex";
      btnParent.style.width = "47%";
      inputFilter.setAttribute("value", "");
    });
  });
}

function animUpFilters(containerUpBtns, containerTagsFilters) {
  containerUpBtns.forEach((btn) => {
    const btnParent = btn.parentNode;
    const inputFilter = btn.previousElementSibling;
    const upBtn = btn.nextElementSibling;
    const filterList = btnParent.lastElementChild;
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      resetTagsFilters(containerTagsFilters);
    });
  });
}

export { resetTagsFilters, animDownFilters, animUpFilters };
