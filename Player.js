class Player {
  constructor(
    name, number=0, team="", color="#000000", cards=[], isTurn=false
    ) {
    this.name = name;
    this.number = number;
    this.team = team;
    this.color = color;
    this.cards = cards;
    this.isTurn = isTurn;
  }

}

module.exports = Player;