class BoardCard {
    cardDeck = "card_back"
    xPosition
    yPosition

    constructor(index, value) {
        this.buildPosition(index)
        this.value = value
    }

    buildPosition(index) {
        switch (index) {
            case 1:
                this.xPosition = 440
                this.yPosition = 300
                break;
            case 2:
                this.xPosition = 540
                this.yPosition = 300
                break;
            case 3:
                this.xPosition = 640
                this.yPosition = 300
                break;
            case 4:
                this.xPosition = 740
                this.yPosition = 300
                break;
            default:
                this.xPosition = 840
                this.yPosition = 300
                break;
        }
        
    }
}