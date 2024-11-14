const readlineSync = require("readline-sync");
const crypto = require("crypto");
const Table = require("cli-table");
const ProbabilityCalculator = require("./ProbabilityCalculator");

class CLI {
  constructor(diceArray) {
    this.diceArray = diceArray;
    this.game = null;
  }

  setGame(game) {
    this.game = game;
  }

  generateKey() {
    return crypto.randomBytes(16).toString("hex");
  }

  calculateHMAC(key, message) {
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }

  showHelp() {
    const calculator = new ProbabilityCalculator(this.diceArray);
    const probabilities = calculator.calculateProbabilities();

    const table = new Table({
      head: [
        "User Dice",
        ...this.diceArray.map((dice) => dice.sides.join(",")),
      ],
    });

    this.diceArray.forEach((userDice, i) => {
      const row = {};
      row[userDice.sides.join(",")] = this.diceArray.map((_, j) =>
        i === j ? "-" : probabilities[i][j].toFixed(4)
      );
      table.push(row);
    });

    console.log("Probability of the win for the user:");
    console.log(table.toString());
  }

  promptUser(promptText) {
    return readlineSync.question(promptText);
  }

  handleUserSelection(selection) {
    if (selection === "?") {
      this.showHelp();
    } else if (selection.toLowerCase() === "x") {
      console.log("Exiting the game.");
    } else {
      const diceIndex = parseInt(selection);
      if (
        !isNaN(diceIndex) &&
        diceIndex >= 0 &&
        diceIndex < this.diceArray.length
      ) {
        console.log(
          `You selected dice: ${this.diceArray[diceIndex].sides.join(",")}`
        );
        this.game.processSelection(diceIndex);
      } else {
        console.log("Invalid selection. Please try again.");
      }
    }
  }
}

module.exports = CLI;
