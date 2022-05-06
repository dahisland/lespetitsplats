import * as norm from "../utils/normalizeTxt.js";

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- GET CARDS RECIPES //
// ------------------------------------------------------------------------------------------- //

class recipe {
  constructor(name, time, appliance, ustensils, ingredients, description) {
    this.name = name;
    this.time = time;
    this.appliance = appliance;
    this.ustensils = ustensils;
    this.ingredients = ingredients;
    this.description = description;
  }

  getCard(arrRecipe) {
    const container = document.createElement("li");
    container.classList.add("recipesList_cards");

    const picture = document.createElement("picture");
    const image = document.createElement("img");
    image.setAttribute("src", "./img/recipes.jpg");
    image.setAttribute("alt", "Photo de " + this.name);
    picture.appendChild(image);

    const banner = document.createElement("div");
    banner.classList.add("li_title");

    const title = document.createElement("h2");
    title.innerHTML = this.name;
    banner.appendChild(title);

    const timer = document.createElement("aside");
    banner.appendChild(timer);

    const icon = document.createElement("span");
    icon.classList.add("far");
    icon.classList.add("fa-clock");
    icon.classList.add("icons");
    timer.appendChild(icon);
    timer.innerHTML += " " + this.time + "min ";

    const content = document.createElement("div");
    content.classList.add("li_recipe");

    const list = document.createElement("ul");
    list.classList.add("recipe_ingredients");
    content.appendChild(list);

    for (let i = 0; i < this.ingredients.length; i++) {
      let containerIng = document.createElement("li");
      let span = document.createElement("span");
      span.innerHTML = this.ingredients[i].ingredient + " ";
      containerIng.appendChild(span);
      if (this.ingredients[i].quantity != undefined) {
        containerIng.innerHTML += ": " + this.ingredients[i].quantity + " ";
      }
      if (this.ingredients[i].unit != undefined) {
        containerIng.innerHTML += this.ingredients[i].unit + " ";
      }
      list.appendChild(containerIng);
    }
    const describe = document.createElement("p");
    describe.classList.add("recipe_description");
    describe.innerHTML = this.description;
    content.appendChild(describe);

    container.appendChild(picture);
    container.appendChild(banner);
    container.appendChild(content);

    // Create obj with container li, tags & description for each recipe

    let ingredientsByRecipeArr = [];
    ingredientsByRecipeArr.length = 0;
    for (let i = 0; i < this.ingredients.length; i++) {
      ingredientsByRecipeArr.push(this.ingredients[i].ingredient);
    }

    let objRecipe = {
      name: norm.getNormalizeText(this.name),
      li: container,
      tags: [],
      contentTxt: norm.getNormalizeText(
        this.name +
          " " +
          this.time +
          "min " +
          ingredientsByRecipeArr +
          " " +
          this.description
      ),
      testMatchSearch: [],
    };

    for (let i = 0; i < this.ingredients.length; i++) {
      objRecipe.tags.push(
        norm.getNormalizeText(this.ingredients[i].ingredient)
      );
    }
    for (let i = 0; i < this.ustensils.length; i++) {
      objRecipe.tags.push(norm.getNormalizeText(this.ustensils[i]));
    }
    objRecipe.tags.push(norm.getNormalizeText(this.appliance));

    // Push obj in an array
    arrRecipe.push(objRecipe);
  }
}

export { recipe };
