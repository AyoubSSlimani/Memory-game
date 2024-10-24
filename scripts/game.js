import BoardGame from './board.js';


const arrayImages = [
    "../assets/images/daby.png",
    "../assets/images/gojo.png",
    "../assets/images/meruem.png",
    "../assets/images/zenitsu.png",
    "../assets/images/roy.png",
    "../assets/images/Light.png",
    "../assets/images/gintoki.png",
    "../assets/images/Kira.png",
    "../assets/images/kim-shin.png",
    "../assets/images/ryochi.jpg",
    "../assets/images/okarin.png",
    "../assets/images/SatoMask.png",
]

document.querySelector('.start').addEventListener('click', () => {
    document.querySelector('.start').style.display = 'none';
    document.querySelector('.give-up').style.display = 'block';
    initializeGame();
});

function initializeGame() {
    const boardGame = new BoardGame(arrayImages);
    boardGame.shuffle();
    const board = boardGame.create();
    const columns = Math.ceil(Math.sqrt(boardGame.cards.length));
    
    board.style.setProperty('--columns', columns);
    document.body.appendChild(board);

    boardGame.eventHandler();
    boardGame.startTimer();
}