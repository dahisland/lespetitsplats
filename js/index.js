const tagsFilters = document.querySelectorAll(".searchTags_filter");
const filters = ["Ingrédients", "Appareils", "Ustensiles"];

tagsFilters.forEach((filter) => {
  console.log(filter);
  const btnDown = filter.childNodes[3];
  const btnUp = filter.childNodes[5];
  const tagsList = filter.childNodes[7];
  const inputFilter = filter.childNodes[1];
  const filterIngredients = document.getElementById("filter-ingredients");
  const filterDevices = document.getElementById("filter-devices");
  const filterUtensils = document.getElementById("filter-utensils");
  btnDown.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(inputFilter.getAttribute("value"));
    btnDown.style.display = "none";
    btnUp.style.display = "block";
    tagsList.style.display = "flex";
    inputFilter.setAttribute("value", "");
    if (filter.id == "filter-ingredients") {
      filterIngredients.style.width = "47%";
      filterDevices.style.width = "fit-content";
      filterDevices.childNodes[7].style.display = "none";
      filterDevices.childNodes[1].setAttribute("value", filters[1]);
      filterDevices.childNodes[5].style.display = "none";
      filterDevices.childNodes[3].style.display = "block";
      filterUtensils.style.width = "fit-content";
      filterUtensils.childNodes[7].style.display = "none";
      filterUtensils.childNodes[1].setAttribute("value", filters[2]);
      filterUtensils.childNodes[5].style.display = "none";
      filterUtensils.childNodes[3].style.display = "block";
    }
    if (filter.id == "filter-devices") {
      filterDevices.style.width = "47%";
      filterIngredients.style.width = "fit-content";
      filterIngredients.childNodes[7].style.display = "none";
      filterIngredients.childNodes[1].setAttribute("value", filters[0]);
      filterIngredients.childNodes[5].style.display = "none";
      filterIngredients.childNodes[3].style.display = "block";
      filterUtensils.style.width = "fit-content";
      filterUtensils.childNodes[7].style.display = "none";
      filterUtensils.childNodes[1].setAttribute("value", filters[2]);
      filterUtensils.childNodes[5].style.display = "none";
      filterUtensils.childNodes[3].style.display = "block";
    }
    if (filter.id == "filter-utensils") {
      filterUtensils.style.width = "47%";
      filterDevices.style.width = "fit-content";
      filterDevices.childNodes[7].style.display = "none";
      filterDevices.childNodes[1].setAttribute("value", filters[1]);
      filterDevices.childNodes[5].style.display = "none";
      filterDevices.childNodes[3].style.display = "block";
      filterIngredients.style.width = "fit-content";
      filterIngredients.childNodes[7].style.display = "none";
      filterIngredients.childNodes[1].setAttribute("value", filters[0]);
      filterIngredients.childNodes[5].style.display = "none";
      filterIngredients.childNodes[3].style.display = "block";
    }
  });
  btnUp.addEventListener("click", (e) => {
    e.preventDefault();
    btnDown.style.display = "block";
    btnUp.style.display = "none";
    tagsList.style.display = "none";
    if (filter.id == "filter-ingredients") {
      inputFilter.setAttribute("value", filters[0]);
    }
    if (filter.id == "filter-devices") {
      inputFilter.setAttribute("value", filters[1]);
    }
    if (filter.id == "filter-devices") {
      inputFilter.setAttribute("value", filters[2]);
    }
    filter.style.width = "fit-content";
  });
});
