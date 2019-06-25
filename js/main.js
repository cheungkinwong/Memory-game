const memory = document.getElementById("memory");
const card = document.querySelectorAll(".card");

card.forEach(cardFlip => {
  cardFlip.addEventListener("click", flip);
});

function flip() {
  this.classList.toggle("flip");
  console.log(this);
}
