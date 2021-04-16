'use strict';
// Selecting elements

let player1 = document.querySelector('.player--0');
let player2 = document.querySelector('.player--1');

let score1 = document.querySelector('#score--0');
let score2 = document.querySelector('#score--1');
let diceEl = document.querySelector('.dice');
let currentEl1 = document.getElementById('current--0');
let currentEl2 = document.getElementById('current--1');

let btnNew = document.querySelector('.btn--new');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');

let rules = document.querySelector('.rules');
let btnRules = document.querySelector('.btn--rules');
let btnRulesClose = document.querySelector('.rules--close');

//additional variables

let activePlayer = 0;
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;

  player1.classList.toggle('player--active');
  player2.classList.toggle('player--active');
}
let currentScore = 0;
let scores = [0, 0];
let playGame = true;

// Starting conditions
function reset() {
  score1.textContent = 0;
  score2.textContent = 0;
  currentEl1.textContent = 0;
  currentEl2.textContent = 0;
  diceEl.classList.add('hidden');
  player1.classList.remove('player--winner');
  player2.classList.remove('player--winner');
  player1.classList.add('player--active');
  player2.classList.remove('player--active');
  currentScore = 0;
  scores = [0, 0];
  playGame = true;
  activePlayer = 0;
  document.querySelector('#name--0').innerHTML = 'Player 1';
  document.querySelector('#name--1').innerHTML = 'Player 2';
  rules.classList.add('hidden');
}
reset();

// Rolling dice functionality
//btnRoll

btnRoll.addEventListener('click', () => {
  //1. Generate random number <1:6>
  //2. Display the dice img
  //3. Check if the number == 1, if so - change player

  if (playGame) {
    let dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice !== 1) {
      currentScore += dice;
      if (activePlayer === 0) currentEl1.textContent = currentScore;
      else currentEl2.textContent = currentScore;
    } else {
      switchPlayer();
      if (activePlayer === 0) currentEl2.textContent = 0;
      else currentEl1.textContent = 0;
    }
  }
});

//btnHold

btnHold.addEventListener('click', () => {
  if (playGame) {
    //1. Add current player score to his overall game score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //2. Check if player's score >= 30
    if (scores[activePlayer] >= 30) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document.querySelector(`#name--${activePlayer}`).innerHTML = `Player ${
        activePlayer === 0 ? `1` : `2`
      } won!`;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      playGame = false;
      diceEl.classList.add('hidden');
      currentEl1.textContent = 0;
    } else switchPlayer();
  }
});

//btnNew
btnNew.addEventListener('click', () => {
  reset();
});

//Rules open
btnRules.addEventListener('click', () => {
  rules.classList.remove('hidden');
});

//Rules close
btnRulesClose.addEventListener('click', () => {
  rules.classList.add('hidden');
});
