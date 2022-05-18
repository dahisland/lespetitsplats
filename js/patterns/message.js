function messageNoMatch() {
  const containerMessage = document.createElement("div");
  containerMessage.classList.add("main_noMatchMessage");
  const message = document.createElement("p");
  message.innerHTML = "Aucune recette ne correspond à votre recherche";

  containerMessage.appendChild(message);

  return containerMessage;
}
function messageTagNoMatch() {
  const containerMessage = document.createElement("div");
  containerMessage.classList.add("main_noTagMatchMessage");
  const message = document.createElement("p");
  message.innerHTML = "Aucun élément ne correspond à votre recherche";

  containerMessage.appendChild(message);

  return containerMessage;
}

export { messageNoMatch, messageTagNoMatch };
