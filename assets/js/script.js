// Select elements
const diceImage                     = document.querySelector('.dice-image');
const gameBoardContainer            = document.querySelector('.gameboard');
const currentGlobalScoreContainer   = document.querySelector('.player-block.current-player > .global-score');
const currentRoundScoreContainer    = document.querySelector('.round-block.current-player > .round-score');
const newGameBtn                    = document.getElementById('new-game');
const rollDiceBtn                   = document.getElementById('roll-dice');
const holdBtn                       = document.getElementById('hold');

let currentGlobalScore = parseInt(currentGlobalScoreContainer.textContent);
let currentRoundScore = parseInt(currentRoundScoreContainer.textContent); 

const diceImagesSources = [
    './assets/img/dice/one.png',
    './assets/img/dice/two.png',
    './assets/img/dice/three.png',
    './assets/img/dice/four.png',
    './assets/img/dice/five.png',
    './assets/img/dice/six.png',
]

// Functions
const rollDice = () => {
    const diceNumber = Math.ceil(Math.random() * 6);
    diceImage.setAttribute('src', diceImagesSources[diceNumber-1]);
    updateCurrentScore(diceNumber);
}

const updateCurrentScore = score => {
    currentRoundScore += score;
    currentRoundScoreContainer.textContent = currentRoundScore;
}

// EventListeners
rollDiceBtn.addEventListener('click', rollDice);


