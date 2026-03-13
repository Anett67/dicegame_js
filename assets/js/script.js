// Select elements
const diceImage                     = document.querySelector('.dice-image');
const gameBoardContainer            = document.querySelector('.gameboard');
const newGameBtn                    = document.getElementById('new-game');
const rollDiceBtn                   = document.getElementById('roll-dice');
const holdBtn                       = document.getElementById('hold');
const globalPlayerBlocks            = document.querySelectorAll('.player-block');
const roundBlocks                   = document.querySelectorAll('.round-block');
const spinner                       = document.querySelector('.spinner')
const firstGlobalScoreContainer     = document.querySelector('.player-block.player-1 > .global-score');
const firstCurrentScoreContainer    = document.querySelector('.round-block.player-1 > .round-score');
const secondGlobalScoreContainer    = document.querySelector('.player-block.player-2 > .global-score');
const secondCurrentScoreContainer   = document.querySelector('.round-block.player-2 > .round-score');


let currentGlobalScoreContainer;
let currentRoundScoreContainer;
let currentGlobalScore;
let currentRoundScore; 
let currentPlayerName;
let currentPlayer;

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
    firstGlobalScoreContainer.textContent = JSON.parse(localStorage.getItem('score'))[0].global
    firstCurrentScoreContainer.textContent = JSON.parse(localStorage.getItem('score'))[0].current
    secondGlobalScoreContainer.textContent = JSON.parse(localStorage.getItem('score'))[1].global
    secondCurrentScoreContainer.textContent = JSON.parse(localStorage.getItem('score'))[1].current
    currentGlobalScore              = parseInt(currentGlobalScoreContainer.textContent);
    currentRoundScore               = parseInt(currentRoundScoreContainer.textContent);
    currentPlayerName               = document.querySelector('.player-block.current-player > .player-name').textContent;
    currentPlayer                   = currentPlayerName === 'PLAYER 1' ? 0 : 1;
}

const setLocalStorage = (newGame = false) => {
    if(!localStorage.getItem('score') || newGame) {
        localStorage.setItem('score', JSON.stringify([
            { current: 0, global: 0 },
            { current: 0, global: 0 },
        ]))
    }
}

const rollDice = () => {
    diceImage.classList.add('d-none')
    spinner.classList.remove('d-none')
    const diceNumber = Math.ceil(Math.random() * 6);
    diceImage.setAttribute('src', diceImagesSources[diceNumber-1]);
    setTimeout(function() {
        updateCurrentScore(diceNumber);
        updateLocalStorage()
        if( diceNumber === 1 ) changePlayer();
        spinner.classList.add('d-none')   
        diceImage.classList.remove('d-none')         
    }, 1000)
}

const updateCurrentScore = score => {
    currentRoundScore = score > 1 ? currentRoundScore += score : 0;
    currentRoundScoreContainer.textContent = currentRoundScore;
}

const holdScore = () => {
    currentGlobalScore += currentRoundScore;
    currentGlobalScoreContainer.textContent = currentGlobalScore;
    updateCurrentScore(0);
    updateLocalStorage()
    
    if(currentGlobalScore >= 100){
        alert(`Game over. ${currentPlayerName} won. Congratulations!`);
        startNewGame();
        return;
    }
        
    changePlayer();
}

const updateLocalStorage = () => {
    let storedScore = JSON.parse(localStorage.getItem('score'))
    storedScore[currentPlayer].current = currentRoundScore
    storedScore[currentPlayer].global = currentGlobalScore
    localStorage.setItem('score', JSON.stringify(storedScore))
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

const startNewGame = () => {

    if(gameBoardContainer.classList.contains('right-active')){
        gameBoardContainer.classList.remove('right-active');
        gameBoardContainer.classList.add('left-active');
    }

    if(!globalPlayerBlocks[0].classList.contains('current-player')){
        globalPlayerBlocks[0].classList.add('current-player');
        globalPlayerBlocks[1].classList.remove('current-player');
    }

    if(!roundBlocks[0].classList.contains('current-player')){
        roundBlocks[0].classList.add('current-player');
        roundBlocks[1].classList.remove('current-player');
    }

    for(block of globalPlayerBlocks){
        block.children[1].textContent = 0;
    }

    for(block of roundBlocks){
        block.children[1].textContent = 0;
    }

    diceImage.setAttribute('src', diceImagesSources[0]);
    
    setLocalStorage(true);
    initializeScoreVariables();
}

setLocalStorage()
initializeScoreVariables();

// EventListeners
rollDiceBtn.addEventListener('click', rollDice);
holdBtn.addEventListener('click', holdScore);
newGameBtn.addEventListener('click', startNewGame);


// Add focus on dialog button for accessibility
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})


