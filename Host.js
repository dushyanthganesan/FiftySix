class Host {
  constructor() {
    this.players = [];
    this.playedCards = [];
  }

  newPlayer(name, number) {
    this.players.push(name);
  }

  played(card) {
    this.playedCards.push(card);
  }
}

module.exports = Host;