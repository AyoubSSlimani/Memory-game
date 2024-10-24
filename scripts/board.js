import Card from './card.js';


class BoardGame {
    MAX_TIME = 60
    constructor(images) {
        this.matchedCards = [];
        this.locked = false;
        
        this.images = this.getImagesByLevel(images);
        this.images = this.images.concat(this.images);
        this.cards = [];

        this.timer = this.MAX_TIME;
        this.timerInterval;
    }

    create() {
        const board = document.createElement('div');
        board.classList.add('memory-board');

        this.cards = this.images.map(img => new Card(img));
        this.cards.forEach(card => board.appendChild(card.element));

        document.getElementById('timer').value = this.timer;
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

    updateGameStatus() {
        const gameStatus = document.getElementById('game-status');
        const modal = document.querySelector('.game-status-container');

        if (this.isGameOver()) {
            gameStatus.innerText = 'Game Over !';
            gameStatus.style.color = '#f44336';
            modal.style.display = 'block';
            this.stopTimer();
        }
        else if (this.matchedCards.length === this.cards.length) {
            gameStatus.innerText = 'You Win!';
            gameStatus.style.color = 'green';
            modal.style.display = 'block';
            this.stopTimer();
        }

    }

    updateTimer() {
        const timer = document.getElementById('timer');
        this.timerInterval = setInterval(() => {
            timer.value = parseInt(timer.value) - 1;
            this.timer = parseInt(timer.value);
            this.updateGameStatus();
        }, 1000);
    }

    stopTimer() {
        document.getElementById('timer').value = this.MAX_TIME;
        clearInterval(this.timerInterval);
    }

    isGameOver() {
        console.log("timer", this.timer);
        console.log("matchedCards", this.matchedCards.length);
        console.log("cards", this.cards.length);
        return this.timer === 0 && this.matchedCards.length !== this.cards.length;
    }
}

export default BoardGame;