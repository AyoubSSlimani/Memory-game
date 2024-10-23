const containerCard = document.querySelector("#container-card");
const startGame = document.querySelector("#start-game");
const easyBtn = document.querySelector(".easy");
const mediumBtn = document.querySelector(".medium");
const hardBtn = document.querySelector(".hard");
const containerEndGame = document.querySelector("#end-game");
const againBtn = document.querySelector(".again");
const resetBtn = document.querySelector(".reset");
const stopBtn = document.querySelector("#stop");
const chrono = document.querySelector("#chrono");
const seconde = document.querySelector(".seconde");
const zeroSeconde = document.querySelector(".zero-seconde");
const zeroMinute = document.querySelector(".zero-minute");
const minute = document.querySelector(".minute");

// variable pour le son
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");
const clearGameSound = new Audio("sounds/clearGame.mp3");
const startGameSound = new Audio("sounds/startGame.mp3");
const stopSound = new Audio("sounds/stop.mp3");
const easyModeSound = new Audio("sounds/easyMode.mp3");
const mediumModeSound = new Audio("sounds/mediumMode.mp3");
const hardModeSound = new Audio("sounds/hardMode.mp3");

//Par défaut le jeu est en difficulté easy
//Séléction de la difficulté du jeu
let currentMode = "";
let lastMode = "";
let currentModeClick = 0;

let jetonClick = 0;
let imageTemp = "";
let idCard = 0;
let idCardArray = [];
let idImageTemp;
let idImageTemp2;
let gameStart = false;
let gameStop = false;
let lastClickButton = null;

//variable pour le chrono
let minuteur;
let sec = 0;
let min = 0;
let bestScore = [];

//
const launchGame = () => {
    gameStart = true;
    gameStop = true;
    if(containerCard.childElementCount === 0) {
        colorCurrentBtn(easyBtn);
        modeGame(easyBtn, copyArrayImages.slice(0, 12));
        lastClickButton = easyBtn;
    }
    stopBtn.classList.toggle("cacher");
    time();
}

startGame.addEventListener("click", () => {
    startGameSound.play();
    console.log(gameStart);
    startGame.classList.toggle("cacher");
    launchGame();
})

stopBtn.addEventListener("click", () => {
    stopSound.play();
    gameStop = false;
    gameStart = false;
    startGame.classList.toggle("cacher");

    resetChrono();

    stopBtn.classList.toggle("cacher");
    deletAndReset();
    if(containerCard.childElementCount === 0) {
        colorCurrentBtn(easyBtn);
        currentModeClick = 0;
        modeGame(easyBtn, copyArrayImages.slice(0, 12));
        lastClickButton = easyBtn;
    }
    console.log(gameStop);
    console.log(gameStart);

})


const modeGame = (modeId, arrayImageDifficulty) => {
    if(currentMode !== modeId.classList[0]) {
        currentModeClick = 0;
    }

    currentMode = modeId.classList[0];


    if(currentMode === modeId.classList[0] && currentModeClick < 1){

        currentModeClick++;
        arrayImageDifficulty.forEach(() => {
            const card = document.createElement("div");
            card.classList.add("card", "hidden");
        
            if(modeId.classList[0] !== "easy"){
                containerCard.style.width = "1100px";
            } else {
                containerCard.style.width = "900px";
            }
            containerCard.appendChild(card);
        })

        shuffleImage(arrayImageDifficulty);
        insertImageCard(arrayImageDifficulty);

        const cards = document.querySelectorAll(".card");
        cards.forEach((card) => {
            const image = card.querySelector(".img");
            card.addEventListener("click", () => {
                if(gameStart){
                    cardEven(image, card, arrayImageDifficulty);
                }
            })
        })

        lastMode = modeId.classList[0];
    }
}

// document.addEventListener("DOMContentLoaded", () => {
//     colorCurrentBtn(easyBtn);
//     modeGame(easyBtn, copyArrayImages.slice(0, 12));
//     lastClickButton = easyBtn;
//     // currentMode = "";
// })

easyBtn.addEventListener("click", () => {
    if(lastClickButton !== easyBtn) {
        easyModeSound.play();
        if(!gameStart){
            colorCurrentBtn(easyBtn);
            deletAndReset();
            modeGame(easyBtn, copyArrayImages.slice(0, 12));
        }

            lastClickButton = easyBtn;
            if(gameStop) {
                gameStart = false;
                stopBtn.classList.toggle("cacher");
                startGame.classList.toggle("cacher");
                resetChrono();
            }
    }
        
})



mediumBtn.addEventListener("click", () => {
    if(lastClickButton !== mediumBtn) {
        mediumModeSound.play();
        if(!gameStart){
            colorCurrentBtn(mediumBtn);
            deletAndReset();
            modeGame(mediumBtn, copyArrayImages.slice(0, 16));

            lastClickButton = mediumBtn;
            if(gameStop) {
                gameStart = false;
                stopBtn.classList.toggle("cacher");
                startGame.classList.toggle("cacher");
                resetChrono();
            }
        }
    }
})



hardBtn.addEventListener("click", () => {
    if(lastClickButton !== hardBtn) {
        hardModeSound.play();
        if(!gameStart){
            colorCurrentBtn(hardBtn);
            deletAndReset();
            modeGame(hardBtn, copyArrayImages);


            lastClickButton = hardBtn;
            if(gameStop) {
                gameStart = false;
                stopBtn.classList.toggle("cacher");
                startGame.classList.toggle("cacher");
                resetChrono();
            }
        }
    }
})

//Fonction qui permet de changer le border du niveau de difficulté actuel
const colorCurrentBtn = (currentBtn) => {
    switch(currentBtn.className){
        case "easy":
            currentBtn.classList.add("colorBtn");
            mediumBtn.classList.remove("colorBtn");
            hardBtn.classList.remove("colorBtn");
            break;
        case "medium":
            currentBtn.classList.add("colorBtn");
            easyBtn.classList.remove("colorBtn");
            hardBtn.classList.remove("colorBtn");
            break;
        case "hard":
            currentBtn.classList.add("colorBtn");
            mediumBtn.classList.remove("colorBtn");
            easyBtn.classList.remove("colorBtn");
            break;
        default:
            console.log("erreur pour le changement de couleur");
            break;
    }
    
}

const deletAndReset = () => {
        containerCard.innerHTML = "";
        copyArrayImages = [...arrayImages];
        idCardArray = [];
}

const arrayImages = ["images/daby.png",
                     "images/daby.png",
                     "images/gojo.png",
                     "images/gojo.png",
                     "images/meruem.png",
                     "images/meruem.png",
                     "images/zenitsu.png",
                     "images/zenitsu.png",
                     "images/roy.png",
                     "images/roy.png",
                     "images/Light.png",
                     "images/Light.png",
                     "images/gintoki.png",
                     "images/gintoki.png",
                     "images/Kira.png",
                     "images/Kira.png",
                     "images/kim-shin.png",
                     "images/kim-shin.png",
                     "images/ryochi.jpg",
                     "images/ryochi.jpg",
                     "images/okarin.png",
                     "images/okarin.png",
                     "images/SatoMask.png",
                     "images/SatoMask.png"
]

let copyArrayImages = [...arrayImages];


// Fonction permettant de mélanger un tableau (les images)
const shuffleImage = (array) => {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}


const insertImageCard = (arrayImage) => {

    const cards = document.querySelectorAll(".card");

    cards.forEach((card, index) => {
        if(card.children.length === 0){
            const image = document.createElement("img");
            image.src = arrayImage[index];
            image.style.display = "none";
            image.classList.add("img");
            image.id = idCard++;
    
            card.appendChild(image);
        }
    })

    idCard = 0;
}

//Fonction qui vérifie si la deuxième carte est identique
const cardEven = (thisImage, thisCard, arrayImage) => {
    if(jetonClick === 0 && !thisCard.classList.contains("cleared")){
        jetonClick++;
        imageTemp += thisImage.src;
        idImageTemp = parseInt(thisImage.id);
        thisImage.style.display = "";
    } else if(jetonClick === 1 && thisImage.src === imageTemp && !thisCard.classList.contains("cleared")) {
        correctSound.play();
        thisImage.style.display = "";
        idImageTemp2 += parseInt(thisImage.id);
        let previousCard = document.getElementById(`${idImageTemp}`);
        let parent = previousCard.parentElement;
        parent.classList.add("cleared");
        thisCard.classList.add("cleared");
        idCardArray.push(idImageTemp, idImageTemp2);
        if(idCardArray.length === arrayImage.length){
            correctSound.play();
            setTimeout(() => {
                finishGame();
            }, 500);
        }
        resetParameterCardEven();
    } else if(jetonClick === 1 && !thisCard.classList.contains("cleared")) {
        wrongSound.play();
        jetonClick++;
        idImageTemp2 = parseInt(thisImage.id);
        thisImage.style.display = "";
        setTimeout(() => {
            let previousCard = document.getElementById(`${idImageTemp}`);
            previousCard.style.display = "none";
            let previousCard2 = document.getElementById(`${idImageTemp2}`);
            previousCard2.style.display = "none";
            resetParameterCardEven();
            
        }, 500)
    }
}

//Fonction qui remet à zéro des variables pour la fonction cardEven
const resetParameterCardEven = () => {
    idImageTemp = 0;
    idImageTemp2 = 0;
    jetonClick = 0;
    imageTemp = "";
}


//Fonction qui vérifie si toutes les cartes ont été trouvé 
const finishGame = (arrayId, arrayCard) => {
        clearGameSound.play();
        gameStop = false;
        stopBtn.classList.toggle("cacher");

        alert("Félicitation vous avez fini la partie!");
        againBtn.classList.toggle("cacher");
        resetBtn.classList.toggle("cacher");
        containerEndGame.classList.toggle("cacher");

        registerTime();
        console.log(bestScore);
        zeroSeconde.classList.toggle("cacher");
        resetChrono();
}

againBtn.addEventListener("click", () => {
    startGameSound.play();
    gameStart = false;
    againBtn.classList.toggle("cacher");
    resetBtn.classList.toggle("cacher");
    containerEndGame.classList.toggle("cacher");
    stopBtn.classList.toggle("cacher");
    gameStart = true;
    gameStop = true;
    deletAndReset();
    relancerUnMode(currentMode);
})

resetBtn.addEventListener("click", () => {
    stopSound.play();
    gameStart = false;
    gameStop = false;
    againBtn.classList.toggle("cacher");
    resetBtn.classList.toggle("cacher");
    containerEndGame.classList.toggle("cacher");
    startGame.classList.toggle("cacher");
    resetChrono();
    
    deletAndReset();
    if(containerCard.childElementCount === 0) {
        colorCurrentBtn(easyBtn);
        currentModeClick = 0;
        modeGame(easyBtn, copyArrayImages.slice(0, 12));
        lastClickButton = easyBtn;
    }
})


const relancerUnMode = (thisMode) => {
    switch(thisMode){
        case "easy":
            currentModeClick--;
            modeGame(easyBtn, copyArrayImages.slice(0, 12));
            resetChrono();
            time();
            break;
        case "medium":
            currentModeClick--;
            modeGame(mediumBtn, copyArrayImages.slice(0, 16));
            time();
            break;
        case "hard":
            currentModeClick--;
            modeGame(hardBtn, copyArrayImages);
            time();
            break;
        default:
            console.log("aucun mode séléctionner");
            break;
    }
}


const time = () => {
    minuteur = setInterval(() => {
        sec++;
        console.log("Interval is running", minuteur);

        if(sec === 10){
            zeroSeconde.classList.toggle("cacher");
        }
        
        if(sec === 60) {
            sec = 0;
            if(sec === 0){
                zeroSeconde.classList.toggle("cacher");
                min++;

                if(min === 9 || min > 9){
                    zeroMinute.classList.toggle("cacher");
                    min++;
                }
            }

        } 
        seconde.textContent = sec.toString();
        minute.textContent = min.toString();
    }, 1000);

}

const resetChrono = () => {
    clearInterval(minuteur);

    if(!gameStart && lastClickButton !== null){
        zeroSeconde.classList.toggle("cacher");
        if(sec < 10 || sec >= 10){
            zeroSeconde.classList.toggle("cacher");
            if(sec >= 10){
                zeroSeconde.classList.toggle("cacher");
            }
        }
    } 

    minute.textContent = "0";
    seconde.textContent = "0";

    sec = 0;
    min = 0;


}

// Fonction qui permet d'enregistrer le score sous le bon format
const registerTime = () => {
    if(sec > 10) {
        bestScore.push(`0${min}:${sec}`);
        // zeroSeconde.classList.toggle("cacher");
    } else {
        bestScore.push(`0${min}:0${sec}`);
    }
}


//Ce qu'il me reste à faire dans ce projet 
// Mettre une limite de temps pour réaliser le jeu
// Pour chaque mode aller sur un generateur de voix et mettre une voix en fonction de 1-2sec
// -En démarrant le jeu je bloque les autres difficultés, un bouton "arreter apparait" si j'appuie dessus les autres modes sont debloquées
// -Mettre ses temps dans un localStorage et permettre à l'utilisateur de pouvoir vider le localStorage
// -Mettre un son quand on trouve 2 paires, autre son quand on se trompe, un son quand la partie débute et un son quand la partie se termine
// -L'utilisateur peut choisir de couper le son quand il clique sur l'icone son (barrer l'icone)
// -Faire le responsive
// -Ajouter des règles pour guider l'utilisateur
// -Ajouter un effet css qui retourne les cartes de façon styler
// -Décorer la carte face caché avec un logo de point d'intérrogation ou autre
// -Créer un thème de carte que l'utilisateur peut choisir (yugioh, pokemon, manga, animaux etc..) récupérer des images persos avec une api ?




//BUG A FIX
// -En medium j'ai bug de click quand je click sur plusieurs cartes
// -Quand je retourne toutes les cartes le bouton recommencer apparait mais si je change de difficulté le bouton recommencer reste visible