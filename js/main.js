const memory = document.getElementById("memory");
const card = document.querySelectorAll(".card");
const music = document.getElementById("dearlyBeloved");
let isFlipped = false;

card.forEach(cardFlip => {
  cardFlip.addEventListener("click", flip);
});

playMusic();
dealCards();
function dealCards() {
  card.forEach(card => {
    let shuffle = Math.floor(Math.random() * 11);
    card.style.order = shuffle;
  });
}

function flip() {
  this.classList.toggle("flip");
  if (isFlipped === false) {
    isFlipped = true;
    console.log(this);
  } else {
    isFlipped = false;
  }
}

function playMusic() {
  console.log("lol");
  music.play();
  music.loop = true;
}
