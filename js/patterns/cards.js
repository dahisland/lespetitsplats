const containerRecipes = document.querySelector(".main_recipesList");

// ------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------- GET CARDS RECIPES //
// ------------------------------------------------------------------------------------------- //

class recipe {
  constructor(name, time, ingredients, description) {
    this.name = name;
    this.time = time;
    this.ingredients = ingredients;
    this.description = description;
  }

  getCard() {
    const container = document.createElement("li");
    container.setAttribute("data-visibility", "visible");
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
    containerRecipes.appendChild(container);
  }
}

export { recipe };
