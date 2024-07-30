"use strict";

//selecting elements
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
const currentScore0El = document.getElementById("current--0");
const currentScore1El = document.getElementById("current--1");
const player0NameEl = document.getElementById("name--0");
const player1NameEl = document.getElementById("name--1");
const diceImg = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

//initializing scores
let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;

//roll dice logic
const diceRollFn = () => {
  return Math.trunc(Math.random() * 6) + 1;
};
const toggleUI = () => {
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};
//switch player fn
const switchPlayerFn = (activePlayer) => {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  toggleUI();
  return activePlayer === 0 ? 1 : 0;
};

const resetGame = () => {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  diceImg.classList.add("hidden");
  player0El.classList.contains("player--active")
    ? ""
    : player0El.classList.add("player--active");
  player1El.classList.contains("player--active")
    ? player1El.classList.remove("player--active")
    : "";
  player0NameEl.textContent = "Player 1";
  player1NameEl.textContent = "Player 2";
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;
  score0El.textContent = scores[0];
  score1El.textContent = scores[1];
  btnRoll.removeAttribute("disabled");
  btnNew.removeAttribute("disabled");
};

//rolling dice functionality
btnRoll.addEventListener("click", function () {
  //1.roll dice
  let diceNum = diceRollFn();

  //2.display dice
  diceImg.classList.remove("hidden");
  diceImg.src = `dice-${diceNum}.png`;

  //3. check for rolled 1: if true, switch to next player
  if (diceNum != 1) {
    //4. Add dice roll to current score
    currentScore += diceNum;
    //5. update and display the current score
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    // switch player
    activePlayer = switchPlayerFn(activePlayer);
  }
});

//hold functionality
btnHold.addEventListener("click", function () {
  //1. add current score to the player score
  scores[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];

  //2. check score > 100
  if (scores[activePlayer] < 100) {
    // 3. switch player
    activePlayer = switchPlayerFn(activePlayer);
  } else {
    //player won
    console.log(`player--${activePlayer}`);
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.toggle("player--winner");
    document.getElementById(`name--${activePlayer}`).textContent = "🥳🥳🥳";
    btnHold.setAttribute("disabled", "");
    btnRoll.setAttribute("disabled", "");
  }
});

//new game functionality
btnNew.addEventListener("click", () => {
  resetGame();
});
