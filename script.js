const containerCard = document.querySelector("#container-card");
const cards = document.querySelectorAll(".card");
const startGame = document.querySelector("#start-game");

let jetonClick = 0;
let imageTemp = "";
let idCard = 0;
let idCardArray = [];
let idImageTemp;
let idImageTemp2;

const images = ["images/daby.png",
                "images/gojo.png",
                "images/meruem.png",
                "images/zenitsu.png"
];

const joker = ["images/gintoki.png"]


const tableauImages = [...images, ...images, ...joker];

const chrono = () => {
    const minuteur = document.createElement("div");
    minuteur.id = "minuteur";

    containerCard.appendChild(minuteur);
}

Permet de cibler une seule carte et la retourner
cards.forEach((card) => {
    const styles = getComputedStyle(card);
    card.addEventListener("click", (event) => {
        event.target.classList.toggle("hidden");
        if(styles.backgroundColor){
            event.target.style.removeProperty("background-color");
        } else {
            event.target.style.backgroundColor = "red";
        }
    })
})

// Fonction permettant de mélanger un tableau
const shuffleImage = (array) => {
    for(let i = array.length - 1; i > 0; i--){
        const j = Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

// Action à réaliser quand je démarre la partie
startGame.addEventListener("click", () => {
    shuffleImage(tableauImages);
    insertImageCard();
})


const insertImageCard = () => {

    //Je mélange les images dans les tableaux 
    shuffleImage(tableauImages);

    cards.forEach((card, index) => {
        const image = document.createElement("img");
        image.src = tableauImages[index];
        // image.style.backgroundImage = "url('tableauImages[index]')";
        image.style.display = "none";
        image.id = idCard++;

        card.appendChild(image);

        card.addEventListener("click", () => {
            cardEven(image, card)
        })
    })
    
}

//Fonction qui vérifie si la deuxième carte est identique
const cardEven = (thisImage, thisCard) => {
    if(jetonClick === 0 && !thisCard.classList.contains("cleared")){
        console.log("ici");
        jetonClick++;
        imageTemp += thisImage.src;
        idImageTemp = parseInt(thisImage.id);
        thisImage.style.display = "";
        thisCard.classList.add("clicked");
    } else if(jetonClick === 1 && thisImage.src === imageTemp) {
        console.log("juste");
        thisImage.style.display = "";
        let previousCard = document.getElementById(`${idImageTemp}`);
        let parent = previousCard.parentElement;
        parent.classList.add("cleared");
        thisCard.classList.add("cleared");
        // idCardArray.push(idImageTemp, idImageTemp2);
        thisCard.classList.add("clicked");
        jetonClick = 0;
        idImageTemp2 = 0;
        imageTemp = "";
    } else if(!thisCard.classList.contains("cleared")) {
        console.log("la");
        idImageTemp2 = parseInt(thisImage.id);
        thisImage.style.display = "";
        setTimeout(() => {
            let previousCard = document.getElementById(`${idImageTemp}`);
            let parent = previousCard.parentElement;
            previousCard.style.display = "none";
            parent.classList.remove("clicked");
            let previousCard2 = document.getElementById(`${idImageTemp2}`);
            let parent2 = previousCard2.parentElement;
            previousCard2.style.display = "none";
            parent2.classList.remove("clicked");

            idImageTemp = 0;
            idImageTemp2 = 0;
            jetonClick = 0;
            imageTemp = "";
            
        }, 1000)
    }
}

//Fonction qui vérifie si cette carte à déja été retourné 
const cardCleared = (card) => {

}

//Fonction qui vérifie si toutes les cartes ont été trouvé 
const finishGame = (arrayCard) => {
    if(arrayCard.length === (tableauImages.length) -1){
        return alert("Félicitation vous avez fini la partie!");
    }
}



















// Fonction pour créer un nombre de carte 
// const createCard = () => {
//     const card = document.createElement("div");
//     card.classList.add("card", "hidden");

// }

