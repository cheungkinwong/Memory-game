const container = document.getElementById("memory");
console.log(container);

let random = () => Math.floor(Math.random() * 19);

function deal() {
  let newCard = document.createElement("div");
  newCard.classList.add("card");
  container.appendChild(newCard);
}
