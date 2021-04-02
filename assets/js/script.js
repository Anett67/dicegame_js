// Select elements
const diceImage                 = document.querySelector('.dice-image');
const gameBoardContainer        = document.querySelector('.gameboard');
const currentPlayerGlobalScore  = document.querySelector('.player-block.current-player > .global-score');
const currentPlayerRoundScore   = document.querySelector('.round-block.current-player > .round-score');;
const newGameBtn                = document.getElementById('new-game');
const rollDiceBtn               = document.getElementById('roll-dice');
const holdBtn                   = document.getElementById('hold');

const diceImagesSources = [
    './assets/img/dice/one.png',
    './assets/img/dice/two.png',
    './assets/img/dice/three.png',
    './assets/img/dice/four.png',
    './assets/img/dice/five.png',
    './assets/img/dice/six.png',
]

// const gamePlay = {
//     currentDice: 1,
//     player1: {
//         name : 'Player 1',
//         globalScore: 0,
//         roundScore: 0
//     },
//     player2: {
//         name : 'Player 2',
//         globalScore: 0,
//         roundScore: 0
//     },
//     currentPlayer: 1
// }

// const initializeGameData = (gamePlay) => {
//     diceImage.setAttribute('src', diceImagesSources[gamePlay.currentDice - 1]);

// }

const rollDice = () => {
    const diceNumber = Math.ceil(Math.random() * 6);
    diceImage.setAttribute('src', diceImagesSources[diceNumber-1]);
}


