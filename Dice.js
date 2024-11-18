// Dice.js
class Dice {
  constructor(sides) {
    if (sides.length !== 6 || sides.some(isNaN)) {
      throw new Error("Each dice must have exactly six integer sides.");
    }
    this.sides = sides;
  }
<<<<<<< HEAD

  roll() {
    const index = Math.floor(Math.random() * this.sides.length);
    return this.sides[index];
  }
=======
>>>>>>> revert-to-cea0843e
}

module.exports = Dice;
