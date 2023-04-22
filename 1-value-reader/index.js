function handleName() {
  let nameEl = document.getElementById("name-id");
  let screenEl = document.getElementById("screen-id");
  
    screenEl.textContent = nameEl.value;
    screenEl.style.padding = "1rem"
    screenEl.style.color = "green"
    screenEl.style.fontSize = "1.3rem"
    screenEl.style.rotate="-30deg"
}
