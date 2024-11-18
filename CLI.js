<<<<<<< HEAD
// CLI.js
const readline = require("readline-sync");

class CLI {
  static promptUser(prompt) {
    return readline.question(prompt);
  }

  static showHelp() {
    console.log("Help: Choose a dice by entering the corresponding number.");
=======
const ProbabilityCalculator = require("./ProbabilityCalculator");
const chalk = require("chalk");
const Table = require("cli-table3");

class CLI {
  constructor(diceArray) {
    this.diceArray = diceArray;
  }

  promptUser(promptText) {
    const readlineSync = require("readline-sync");
    return readlineSync.question(promptText);
  }

  calculateHMAC(key, message) {
    const crypto = require("crypto");
    return crypto.createHmac("sha256", key).update(message).digest("hex");
  }

  generateKey() {
    const crypto = require("crypto");
    return crypto.randomBytes(32).toString("hex");
  }

  showHelp() {
    const calculator = new ProbabilityCalculator(this.diceArray);
    const probabilities = calculator.calculateProbabilities();

    console.log(chalk.green("Probability of the win for the user:"));

    const table = new Table({
      head: ["User Dice", ...this.diceArray.map((d) => d.join(","))],
      colWidths: [15, 15, 15, 15], // Adjust widths as needed
    });

    probabilities.forEach((row, i) => {
      table.push({ [this.diceArray[i].join(",")]: row });
    });

    console.log(table.toString());
>>>>>>> revert-to-cea0843e
  }
}

module.exports = CLI;
