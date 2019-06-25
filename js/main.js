const memory = document.getElementById("memory");
const card = document.querySelectorAll(".card");
const music = document.getElementById("dearlyBeloved");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");

let p1Score = document.getElementById("p1score");
let p2Score = document.getElementById("p2score");
let score1 = 0;
let score2 = 0;

let player1 = true;
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

function changeTurn() {
  p1.classList.toggle("myTurn");
  p2.classList.toggle("myTurn");
  if (player1) {
    player1 = false;
  } else {
    player1 = true;
  }
  console.log(player1);
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
    if (player1 === true) {
      score1 += 1;
      p1Score.innerHTML = score1;
    } else {
      score2 += 1;
      p2Score.innerHTML = score2;
    }

    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
    clearBoard();
  } else {
    wait = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      wait = false;
      changeTurn();
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
