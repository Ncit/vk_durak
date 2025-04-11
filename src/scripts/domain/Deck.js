class Deck {
    suits = ['hearts', 'diamonds', 'clubs', 'spades']
    values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace']
    cardDeck = this.buildCardDeck()

    resetCardDeck() {
        this.cardDeck = this.buildCardDeck()
    }

    constructor() {

    }

    buildCardDeck() {
        let deck = [];
        this.suits.forEach(suit => {
            this.values.forEach(value => {
                deck.push({ suit: suit, value: value });
            });
        });
        Phaser.Utils.Array.Shuffle(deck);
        return deck;
    }

    getCardFromDeck() {
        const card = this.cardDeck[0]
        this.removeCard()
        return `${card["suit"]}-${card["value"]}`
    }

    removeCard() {
        return this.cardDeck.splice(0, 1);
    }
}