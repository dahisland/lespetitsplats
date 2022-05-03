function getNormalizeText(txt) {
  let normalizedText = txt
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[\:\'\,\.\(\)\!\?\;]/g, " ")
    .replace(/[\s]{2,}/g, " ")
    .toLowerCase();
  return normalizedText;
}

export { getNormalizeText };
