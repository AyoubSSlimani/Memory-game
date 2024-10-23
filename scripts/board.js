import Card from './card.js';


class BoardGame {
    constructor(arrayImages) {
        this.matchedCards = [];
        this.locked = false;
        this.cards = arrayImages.map(imageSrc => new Card(imageSrc));
    }

    create() {
        const board = document.createElement('div');
        board.classList.add('memory-board');

        this.cards.forEach(card => board.appendChild(card.element));
        return board;
    }

    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

    eventHandler() {
        this.cards.forEach(card => {
            card.element.addEventListener('click', () => {
                if (this.locked) return;
                if (card.element.classList.contains('flip')) return;

                card.flip();
                const flippedCards = this.cards.filter(card => card.element.classList.contains('flip'));

                if (flippedCards.length === 2) {
                    this.locked = true;

                    setTimeout(() => {
                        if (flippedCards[0].equals(flippedCards[1])) {
                            flippedCards.forEach(card => card.lock());
                            this.matchedCards.push(...flippedCards);
                        }
                        else {
                            flippedCards.forEach(card => card.unflip());
                        }
                        
                        this.locked = false;
                    }, 1000);
                }
            });
        });
    }
}

export default BoardGame;