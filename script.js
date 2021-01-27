'use strict';

// Select Elements
const score_0 = document.querySelector('#score--0');
const score_1 = document.querySelector('#score--1');
const diceImge = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
let currentScore_0 = document.querySelector('#current--0');
let currentScore_1 = document.querySelector('#current--1');
const player_0 = document.querySelector('.player--0');
const player_1 = document.querySelector('.player--1');
let scors;
let currentScore;
let activePlayer;
let playing;

// Start Values
const init = function () {
  scors = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  score_0.textContent = 0;
  score_1.textContent = 0;
  currentScore_0.textContent = 0;
  currentScore_1.textContent = 0;
  diceImge.classList.add('hidden');
  player_0.classList.remove('player--winner');
  player_1.classList.remove('player--winner');
  player_0.classList.add('player--active');
  player_1.classList.remove('player--active');
};

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player_0.classList.toggle('player--active');
  player_1.classList.toggle('player--active');
  currentScore = 0;
};

init();

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Start Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceImge.classList.remove('hidden');
    diceImge.setAttribute('src', `dice-${dice}.png`);
    //Or diceImge.src = `dice-${dice}.png`;

    // Check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      //Switch to next player
      switchPlayer();
    }
  }
});

// Holling dice functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scors[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scors[activePlayer];

    // 2. Check if player's score is >=100
    if (scors[activePlayer] >= 50) {
      playing = false;
      diceImge.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

// New dice functionality
btnNew.addEventListener('click', init);
