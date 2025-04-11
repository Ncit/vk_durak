class PockerPlayer {
  totalChips
  constructor(name, avatar, firstCard, secondCard, initialChips, xPosition, yPosition) {
    this.name = name;
    this.avatar = avatar;
    this.firstCard = firstCard;
    this.secondCard = secondCard;
    this.totalChips = initialChips;
    this.xPosition = xPosition;
    this.yPosition = yPosition;
  }
}