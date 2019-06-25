const memory = document.getElementById("memory");
const card = document.querySelectorAll(".card");
const music = document.getElementById("dearlyBeloved");
let newTurn = false;
let wait = false;
let firstCard, secondCard;

card.forEach(cardFlip => {
  cardFlip.addEventListener("click", flip);
});

start();
function start() {
  playMusic();
  dealCards();
}

function dealCards() {
  card.forEach(card => {
    let shuffle = Math.floor(Math.random() * 11);
    card.style.order = shuffle;
  });
}

function flip() {
  if (wait) return;
  if (this === firstCard) return;
  this.classList.add("flip");
  if (!newTurn) {
    newTurn = true;
    firstCard = this;
  } else {
    newTurn = false;
    secondCard = this;
    compare();
  }
}

function compare() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
    clearBoard();
  } else {
    wait = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      wait = false;
    }, 1500);
  }
}

function playMusic() {
  console.log("lol");
  let playPromise = music.play();
  music.loop = true;
  if (playPromise !== null) {
    playPromise.catch(() => {
      music.play();
    });
  }
}

function clearBoard() {
  newTurn = false;
  wait = false;
  firstCard = null;
  secondCard = null;
}
