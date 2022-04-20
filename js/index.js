import * as animNav from "./utils/animNav.js";
import * as data from "./data/recipes.js";
import * as card from "./patterns/cards.js";

const tagsFilters = document.querySelectorAll(".searchTags_filter");
const downBtns = document.querySelectorAll(".searchTags_btnDown");
const upBtns = document.querySelectorAll(".searchTags_btnUp");

// Animation of tags filters
animNav.animDownFilters(downBtns, tagsFilters);
animNav.animUpFilters(upBtns, tagsFilters);

// Get cards recipes
data.recipes.forEach((rec) => {
  let cardRecipe = new card.recipe(
    rec.name,
    rec.time,
    rec.ingredients,
    rec.description
  );
  cardRecipe.getCard();
});
