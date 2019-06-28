const memory = document.getElementById("memory");
const card = document.querySelectorAll(".card");
const cardArray = Array.from(card);
const cardContainer = document.querySelector(".cardContainer");
const music = document.getElementById("dearlyBeloved");
const p1 = document.getElementById("p1");
const p2 = document.getElementById("p2");
const playGuide = document.querySelector(".playGuide");
const cardFace = document.getElementById("cardFace");
const result = document.getElementById("result");
let newCard = shuffle(cardArray);

let p1Score = document.getElementById("p1score");
let p2Score = document.getElementById("p2score");
let score1 = 0;
let score2 = 0;
let pairsFound = 0;

let player1 = true;
let dream = false;
let newTurn = false;
let wait = false;
let index = 0;
let firstCard, secondCard;

//start game
playMusic();
newGame();

//fade out playGuide
playGuide.addEventListener("click", fade);
function fade() {
  playGuide.classList.add("fade");
  setTimeout(() => {
    playGuide.style.display = "none";
  }, 1500);
}

//cards shuffled and flippable
function newGame() {
  addFlip();
  shuffle(cardArray);
  dealCard();
}

//add click on cards
function addFlip() {
  card.forEach(cardFlip => {
    cardFlip.addEventListener("click", flip);
  });
}

//shuffle my cards
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

//append the cards to cardContainer
function dealCard() {
  for (let i = 0; i < 10; i++) {
    cardContainer.appendChild(newCard[i]);
  }
}

//switch player turn
function changeTurn() {
  p1.classList.toggle("selected");
  p2.classList.toggle("selected");
  if (player1) {
    player1 = false;
  } else {
    player1 = true;
  }
}

//flip the card
function flip() {
  //make you wait to click again
  if (wait) return;
  //can't click the same card twice
  if (this === firstCard) return;
  //add css flip to card
  this.classList.add("flip");
  //first card
  if (!newTurn) {
    newTurn = true;
    firstCard = this;
  } else {
    //second card
    newTurn = false;
    secondCard = this;
    compare();
  }
}

//compare the two cards
function compare() {
  if (firstCard.dataset.framework === secondCard.dataset.framework) {
    //add to score if correct
    if (player1 === true) {
      score1 += 1;
      pairsFound += 1;
      p1Score.innerHTML = score1;
    } else {
      score2 += 1;
      pairsFound += 1;
      p2Score.innerHTML = score2;
    }
    //determine winner
    setTimeout(() => {
      if (pairsFound === 5) {
        if (score1 > score2) {
          result.innerHTML = "Player 1 Won <br/> Play Again?";
        } else {
          result.innerHTML = "Player 2 Won <br/> Play Again?";
        }
      }
    }, 1500);
    //can't click on found pairs
    firstCard.removeEventListener("click", flip);
    secondCard.removeEventListener("click", flip);
    clearBoard();
  } else {
    //flips back if it's not a pair
    wait = true;
    setTimeout(() => {
      firstCard.classList.remove("flip");
      secondCard.classList.remove("flip");
      wait = false;
      changeTurn();
      clearBoard();
    }, 1500);
  }
}

//play music in loop
function playMusic() {
  music.loop = true;
  music.play();
  music.volume = 0.2;
}

//reset board
function clearBoard() {
  newTurn = false;
  wait = false;
  firstCard = null;
  secondCard = null;
}

//restart game on click
result.addEventListener("click", reset);
function reset() {
  clearBoard();
  score1 = 0;
  score2 = 0;
  pairsFound = 0;
  p1Score.innerHTML = score1;
  p2Score.innerHTML = score2;
  result.innerHTML = "";
  //flips back all card and start newGame
  card.forEach(cardReset => {
    cardReset.classList.remove("flip");
  });
  setTimeout(newGame, 1000);

  //make sure at reset it starts with player 1
  if (player1) return;
  changeTurn();
}

//change style on click
cardFace.addEventListener("click", toggleStyle);
function toggleStyle() {
  reset();
  setTimeout(style, 1500);
  if (dream) {
    dream = false;
    cardFace.innerHTML = "<h1>Tarrot</h1>";
  } else {
    dream = true;
    setTimeout(style, 1500);
    cardFace.innerHTML = "<h1>Dream</h1>";
  }
}

//replace images
function style() {
  const card1 = document.querySelectorAll(".d1");
  const card2 = document.querySelectorAll(".d2");
  const card3 = document.querySelectorAll(".d3");
  const card4 = document.querySelectorAll(".d4");
  const card5 = document.querySelectorAll(".d5");
  if (!dream) {
    card1.forEach(thisCard => (thisCard.src = "./img/n1.jpg"));
    card2.forEach(thisCard => (thisCard.src = "./img/n2.jpg"));
    card3.forEach(thisCard => (thisCard.src = "./img/n3.jpg"));
    card4.forEach(thisCard => (thisCard.src = "./img/n4.jpg"));
    card5.forEach(thisCard => (thisCard.src = "./img/n5.jpg"));
  } else {
    card1.forEach(thisCard => (thisCard.src = "./img/1.jpg"));
    card2.forEach(thisCard => (thisCard.src = "./img/2.jpg"));
    card3.forEach(thisCard => (thisCard.src = "./img/3.jpg"));
    card4.forEach(thisCard => (thisCard.src = "./img/4.jpg"));
    card5.forEach(thisCard => (thisCard.src = "./img/5.jpg"));
  }
}

//keyboard control
document.addEventListener("keydown", move);
function move(event) {
  switch (event.keyCode) {
    case 37:
      left();
      break;
    case 39:
      right();
      break;
    case 38:
      up();
      break;
    case 40:
      down();
      break;
    case 13:
      enter();
      break;
  }
}

//movement of selector using keyboard
function left() {
  if (index === 0 || index === 5) return;
  newCard[index].children[1].classList.remove("selectedCard");
  index -= 1;
  newCard[index].children[1].classList.add("selectedCard");
}

function right() {
  if (index === 9 || index === 4) return;
  newCard[index].children[1].classList.remove("selectedCard");
  index += 1;
  newCard[index].children[1].classList.add("selectedCard");
}
function up() {
  if (index - 5 < 0) return;
  newCard[index].children[1].classList.remove("selectedCard");
  index -= 5;
  newCard[index].children[1].classList.add("selectedCard");
}

function down() {
  if (index + 5 > 9) return;
  newCard[index].children[1].classList.remove("selectedCard");
  index += 5;
  newCard[index].children[1].classList.add("selectedCard");
}

function enter() {
  document.querySelector(".selectedCard").click();
}
