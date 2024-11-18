// Game.js
const Dice = require("./Dice");
const DiceParser = require("./DiceParser");
const FairRandomGenerator = require("./FairRandomGenerator");
const FairNumberProtocol = require("./FairNumberProtocol");
const HMACGenerator = require("./HMACGenerator");
const CLI = require("./CLI");
const consoleTable = require("console.table");

class Game {
  constructor(diceArray) {
    this.diceArray = diceArray;
    this.userDice = null;
    this.computerDice = null;
  }

  start() {
    console.log("Starting the game with a 6-sided dice!");

    const { key, computerSelection, hmac } =
      FairNumberProtocol.determineFirstMove();

    console.log(`Let's determine who makes the first move.`);
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
    const userSelection = CLI.promptUser("Your selection (0 or 1): ");
    const userSelectionInt = parseInt(userSelection);

    if (userSelectionInt === computerSelection) {
      console.log("You make the first move.");
      this.userSelectsDice();
    } else {
      console.log(
        `I make the first move. My selection: ${computerSelection} (KEY=${key}).`
      );
      this.computerSelectsDice();
    }

    this.performThrows();
  }

  userSelectsDice() {
    console.log("Choose your dice:");
    this.userDice = this.selectDice("user");
  }

  computerSelectsDice() {
    console.log("I will now choose my dice.");
    this.computerDice = this.selectDice("computer");
  }

  selectDice(player) {
    const diceChoices = this.diceArray
      .map((dice, index) => `${index} - ${dice.sides.join(",")}`)
      .join("\n");
    console.log(`Available dice:\n${diceChoices}\nX - exit\n? - help`);

    const selection = CLI.promptUser(
      `${player === "user" ? "Your" : "My"} selection: `
    );

    if (selection === "X" || selection === "x") {
      console.log("Exiting the game.");
      process.exit();
    }

    if (selection === "?") {
      CLI.showHelp();
      return this.selectDice(player);
    }

    const diceIndex = parseInt(selection);
    if (
      !isNaN(diceIndex) &&
      diceIndex >= 0 &&
      diceIndex < this.diceArray.length
    ) {
      return this.diceArray[diceIndex];
    } else {
      console.log("Invalid selection. Please try again.");
      return this.selectDice(player);
    }
  }

  performThrows() {
    if (!this.userDice || !this.computerDice) {
      console.log("Error: Both players must select different dice.");
      return;
    }

    console.log("It's time for the throws.");
    const userThrow = this.generateFairThrow(this.userDice, "user");
    const computerThrow = this.generateFairThrow(this.computerDice, "computer");

    console.table([
      { "Your Throw": userThrow },
      { "Computer Throw": computerThrow },
    ]);

    if (userThrow > computerThrow) {
      console.log("You win!");
    } else if (computerThrow > userThrow) {
      console.log("I win!");
    } else {
      console.log("It's a tie!");
    }

    this.endGame();
  }

  generateFairThrow(dice, player) {
    const { key, computerNumber, hmac } =
      FairNumberProtocol.generateFairRandomNumber(dice.sides.length);
    console.log(
      `I selected a random value in the range 0..${
        dice.sides.length - 1
      } (HMAC=${hmac}).`
    );

    const userSelection = CLI.promptUser(
      "Add your number modulo 6:\n0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help\nYour selection: "
    );
    if (userSelection === "X" || userSelection === "x") {
      console.log("Exiting the game.");
      process.exit();
    }
    const userValue = parseInt(userSelection);

    const result = (computerNumber + userValue) % dice.sides.length;
    const diceRoll = dice.sides[result];
    console.log(`My number is ${computerNumber} (KEY=${key}).`);
    console.log(
      `The result is ${computerNumber} + ${userValue} = ${result} (mod ${dice.sides.length}).`
    );
    console.log(`Your throw is ${diceRoll}.`);

    return diceRoll;
  }

  endGame() {
    console.log("Game over!");
  }
}

module.exports = Game;
