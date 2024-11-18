class Dice {
  constructor(sides) {
    if (sides.length !== 6 || sides.some(isNaN)) {
      throw new Error("Each dice must have exactly six integer sides.");
    }
    this.sides = sides;
  }
}

module.exports = Dice;
