// Dice.js
class Dice {
  constructor(sides) {
    this.sides = sides;
  }

  roll() {
    const index = Math.floor(Math.random() * this.sides.length);
    return this.sides[index];
  }
}

module.exports = Dice;
