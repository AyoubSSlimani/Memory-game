import BoardGame from './board.js';


const arrayImages = ["../assets/images/daby.png",
    "../assets/images/daby.png", "../assets/images/gojo.png", "../assets/images/gojo.png",
    "../assets/images/meruem.png", "../assets/images/meruem.png", "../assets/images/zenitsu.png",
    "../assets/images/zenitsu.png", "../assets/images/roy.png", "../assets/images/roy.png",
    "../assets/images/Light.png", "../assets/images/Light.png", "../assets/images/gintoki.png",
    "../assets/images/gintoki.png", "../assets/images/Kira.png", "../assets/images/Kira.png",
    "../assets/images/kim-shin.png", "../assets/images/kim-shin.png", "../assets/images/ryochi.jpg",
    "../assets/images/ryochi.jpg", "../assets/images/okarin.png", "../assets/images/okarin.png",
    "../assets/images/SatoMask.png", "../assets/images/SatoMask.png"
]


function initializeGame() {
    const boardGame = new BoardGame(arrayImages);
    boardGame.shuffle();

    const board = boardGame.create();
    document.body.appendChild(board);

    window.addEventListener('DOMContentLoaded', () => {
        boardGame.eventHandler();
    });
}

initializeGame();