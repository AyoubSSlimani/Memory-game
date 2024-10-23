class Card {
    constructor(imageSrc) {
        this.imageSrc = imageSrc;
        this.element = this.create();
    }

    create() {
        const card = document.createElement('div');
        card.classList.add('memory-card');

        card.innerHTML = `
            <img class="front-face hidden" src="${this.imageSrc}" alt="Memory Card">
            <span class="back-face"></span>
        `;
        return card;
    }

    flip() {
        this.element.classList.add('flip');
        this.element.querySelector('.front-face').classList.remove('hidden');
    }

    unflip() {
        setTimeout(() => {
            this.element.classList.remove('flip');
            this.element.querySelector('.front-face').classList.add('hidden');
        }, 100);
    }

    lock() {
        this.element.classList.remove('flip');
        this.element.classList.add('locked');
    }

    match(card) {
        this.imageSrc === card.imageSrc ? this.lock() : this.unflip();
    }

    equals(card) {
        return this.imageSrc === card.imageSrc;
    }
}

export default Card;