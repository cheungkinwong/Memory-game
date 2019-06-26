const memory = document.getElementById("memory");
const card = document.querySelectorAll(".card");
const music = document.getElementById("dearlyBeloved");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const playGuide = document.querySelector(".playGuide");
const tarrotStyle = document.getElementById("tarrot");
const dreamStyle = document.getElementById("dream");
const result = document.getElementById("result");

let p1Score = document.getElementById("p1score");
let p2Score = document.getElementById("p2score");
let score1 = 0;
let score2 = 0;
let pairsFound = 0;

let player1 = true;
let dream = true;
let newTurn = false;
let wait = false;
let firstCard, secondCard;

playGuide.addEventListener("click", fade);
function fade() {
  playGuide.classList.add("fade");
  setTimeout(() => {
    playGuide.style.display = "none";
  }, 1500);
}

function addFlip() {
  card.forEach(cardFlip => {
    cardFlip.addEventListener("click", flip);
  });
}

start();

function start() {
  addFlip();
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
      pairsFound += 1;
      p1Score.innerHTML = score1;
    } else {
      score2 += 1;
      pairsFound += 1;
      p2Score.innerHTML = score2;
    }
    if (pairsFound === 5) {
      setTimeout(reset, 3000);
      if (score1 > score2) {
        result.innerHTML = "Player 1 Won";
        console.log("lol");
      } else {
        console.log("rofl");
        result.innerHTML = "Player 2 Won";
      }
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
  music.loop = true;
  music.play();
}

function clearBoard() {
  newTurn = false;
  wait = false;
  firstCard = null;
  secondCard = null;
}

function reset() {
  score1 = 0;
  score2 = 0;
  pairsFound = 0;
  p1Score.innerHTML = score1;
  p2Score.innerHTML = score2;
  result.innerHTML = "";

  card.forEach(cardReset => {
    cardReset.classList.remove("flip");
  });
  setTimeout(addFlip, dealCards, 1000);
}

tarrotStyle.addEventListener("click", style);
function style() {
  console.log("lol");
}

dreamStyle.addEventListener("click", style);
function style() {
  console.log("lol");
}
