// Select elements
const diceImage                     = document.querySelector('.dice-image');
const gameBoardContainer            = document.querySelector('.gameboard');
const newGameBtn                    = document.getElementById('new-game');
const rollDiceBtn                   = document.getElementById('roll-dice');
const holdBtn                       = document.getElementById('hold');
const globalPlayerBlocks            = document.querySelectorAll('.player-block');
const roundBlocks                   = document.querySelectorAll('.round-block');

let currentGlobalScoreContainer;
let currentRoundScoreContainer;
let currentGlobalScore;
let currentRoundScore; 
let currentPlayerName;

const diceImagesSources = [
    './assets/img/dice/one.png',
    './assets/img/dice/two.png',
    './assets/img/dice/three.png',
    './assets/img/dice/four.png',
    './assets/img/dice/five.png',
    './assets/img/dice/six.png',
]

// Functions

const initializeScoreVariables = () => {
    currentGlobalScoreContainer     = document.querySelector('.player-block.current-player > .global-score');
    currentRoundScoreContainer      = document.querySelector('.round-block.current-player > .round-score'); 
    currentGlobalScore              = parseInt(currentGlobalScoreContainer.textContent);
    currentRoundScore               = parseInt(currentRoundScoreContainer.textContent);
    currentPlayerName               = document.querySelector('.player-block.current-player > .player-name').textContent;
}

const rollDice = () => {
    const diceNumber = Math.ceil(Math.random() * 6);
    diceImage.setAttribute('src', diceImagesSources[diceNumber-1]);
    updateCurrentScore(diceNumber);
    if( diceNumber === 1 ) changePlayer();
}

const updateCurrentScore = score => {
    currentRoundScore = score > 1 ? currentRoundScore += score : 0;
    currentRoundScoreContainer.textContent = currentRoundScore;
}

const holdScore = () => {
    currentGlobalScore += currentRoundScore;
    currentGlobalScoreContainer.textContent = currentGlobalScore;
    updateCurrentScore(0);
    
    if(currentGlobalScore >= 100){
        alert(`Game over. ${currentPlayerName} won. Congratulations!`);
        return;
    }
        
    changePlayer();
}

const changeGameboardBackground = () => {
    // Change gameboard background color
    if(gameBoardContainer.classList.contains('left-active')){
        gameBoardContainer.classList.remove('left-active');
        gameBoardContainer.classList.add('right-active');
    }else if(gameBoardContainer.classList.contains('right-active')){
        gameBoardContainer.classList.remove('right-active');
        gameBoardContainer.classList.add('left-active');
    }
}

const changePlayer = () => {

    changeGameboardBackground();

    for(block of globalPlayerBlocks){
        if(block.classList.contains('current-player')){
            block.classList.remove('current-player');
        }else{
            block.classList.add('current-player');
        }
    }

    for(block of roundBlocks){
        if(block.classList.contains('current-player')){
            block.classList.remove('current-player');
        }else{
            block.classList.add('current-player');
        }
    }
    
    initializeScoreVariables();

}

initializeScoreVariables();

// EventListeners
rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);


