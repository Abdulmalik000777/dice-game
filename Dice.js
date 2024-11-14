class Dice {
  constructor(sides) {
    this.sides = sides;
  }

  roll() {
    return this.sides[Math.floor(Math.random() * this.sides.length)];
  }
}

module.exports = Dice;
