import Card from './card.js';


class BoardGame {
    constructor(images) {
        this.matchedCards = [];
        this.locked = false;
        this.images = this.getImagesByLevel(images);
        this.images = this.images.concat(this.images);
        this.cards = [];
        this.timer = 0;
    }

    create() {
        const board = document.createElement('div');
        board.classList.add('memory-board');

        this.cards = this.images.map(img => new Card(img));
        this.cards.forEach(card => board.appendChild(card.element));
        return board;
    }

    getImagesByLevel(images) {
        const level = document.getElementById('level').value;

        if (level === 'easy') return images.slice(0, 6);
        else if (level === 'medium') return images.slice(0, 12);
        else return images;
    }

    shuffle() {
        for (let i = this.images.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.images[i], this.images[j]] = [this.images[j], this.images[i]];
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

    startTimer() {
        const timer = document.getElementById('timer');
        this.timer = setInterval(() => {
            timer.value = parseInt(timer.value) - 1;
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    isGameOver() {
        return this.timer === 0 && this.matchedCards.length !== this.cards.length;
    }
}

export default BoardGame;