// Game.js
const Dice = require("./Dice");
const DiceParser = require("./DiceParser");
const FairRandomGenerator = require("./FairRandomGenerator");
const FairNumberProtocol = require("./FairNumberProtocol");
const HMACGenerator = require("./HMACGenerator");
const CLI = require("./CLI");
const consoleTable = require("console.table");

class Game {
<<<<<<< HEAD
  constructor(diceArray) {
    this.diceArray = diceArray;
=======
  constructor(diceArray, cli) {
    this.diceArray = diceArray.map((config) => ({ sides: config }));
    this.cli = cli;
    this.userScore = 0;
    this.computerScore = 0;
    this.turns = 0;
>>>>>>> revert-to-cea0843e
    this.userDice = null;
    this.computerDice = null;
  }

  start() {
<<<<<<< HEAD
    console.log("Starting the game with a 6-sided dice!");
=======
    console.log("Starting the game");
    this.playRound();
  }
>>>>>>> revert-to-cea0843e

    const { key, computerSelection, hmac } =
      FairNumberProtocol.determineFirstMove();

    console.log(`Let's determine who makes the first move.`);
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
    const userSelection = CLI.promptUser("Your selection (0 or 1): ");
    const userSelectionInt = parseInt(userSelection);

<<<<<<< HEAD
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
=======
    this.handleUserSelection("Your selection: ", (userSelection) => {
      console.log(`My selection: ${computerSelection} (KEY=${key}).`);
      if (userSelection === computerSelection) {
        console.log("You make the first move and select your dice first.");
        this.userSelectDice();
      } else {
        console.log("I make the first move and choose my dice first.");
        this.computerSelectDice();
      }
    });
  }

  userSelectDice() {
    console.log("Choose your dice:");
    this.diceArray.forEach((dice, index) => {
      console.log(`${index} - ${dice.sides.join(",")}`);
    });
    console.log("X - exit\n? - help");

    this.handleUserSelection("Your selection: ", (diceIndex) => {
      if (diceIndex >= 0 && diceIndex < this.diceArray.length) {
        const selectedDice = this.diceArray[diceIndex];
        console.log(`You choose the [${selectedDice.sides.join(",")}] dice.`);
        this.userDice = selectedDice;
        this.computerSelectDifferentDice(diceIndex);
      } else {
        console.log("Invalid selection. Please try again.");
        this.userSelectDice();
      }
    });
  }

  computerSelectDifferentDice(userDiceIndex) {
    const computerDiceIndex = this.diceArray.findIndex(
      (_, index) => index !== userDiceIndex
    );
    this.computerDice = this.diceArray[computerDiceIndex];
    console.log(`I choose the [${this.computerDice.sides.join(",")}] dice.`);
    this.proceedWithThrows();
  }

  computerSelectDice() {
    const diceIndex = 1;
    const selectedDice = this.diceArray[diceIndex];
    console.log(`I choose the [${selectedDice.sides.join(",")}] dice.`);
    this.computerDice = selectedDice;
    this.userSelectDice();
  }

  proceedWithThrows() {
    this.userThrow();
  }

  userThrow() {
    console.log("It's time for your throw.");

    const {
      value: randomValue,
      key,
      hmac,
    } = FairRandomGenerator.generateRandomValue(6);

    console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);

    this.handleUserSelection(
      "Add your number modulo 6.\n0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help\nYour selection: ",
      (userValue) => {
        const result = (randomValue + userValue) % 6;
        console.log(`My number is ${randomValue} (KEY=${key}).`);
        console.log(
          `The result is ${randomValue} + ${userValue} = ${result} (mod 6).`
        );
        const userThrow = this.userDice.sides[result];
        console.log(`Your throw is ${userThrow}.`);

        this.userScore += userThrow;

        this.computerThrow();
      }
    );
  }

  computerThrow() {
    console.log("It's time for my throw.");

    const {
      value: randomValue,
      key,
      hmac,
    } = FairRandomGenerator.generateRandomValue(6);

    console.log(`I selected a random value in the range 0..5 (HMAC=${hmac}).`);

    this.handleUserSelection(
      "Add your number modulo 6.\n0 - 0\n1 - 1\n2 - 2\n3 - 3\n4 - 4\n5 - 5\nX - exit\n? - help\nYour selection: ",
      (computerValue) => {
        const result = (randomValue + computerValue) % 6;
        console.log(`My number is ${randomValue} (KEY=${key}).`);
        console.log(
          `The result is ${randomValue} + ${computerValue} = ${result} (mod 6).`
        );
        const computerThrow = this.computerDice.sides[result];
        console.log(`My throw is ${computerThrow}.`);

        this.computerScore += computerThrow;

        this.announceWinner();
      }
    );
  }

  announceWinner() {
    if (this.userScore > this.computerScore) {
      console.log(`You win (${this.userScore} > ${this.computerScore})!`);
    } else if (this.computerScore > this.userScore) {
      console.log(`I win (${this.computerScore} > ${this.userScore})!`);
    } else {
      console.log(`It's a tie (${this.userScore} = ${this.computerScore})!`);
>>>>>>> revert-to-cea0843e
    }

<<<<<<< HEAD
  performThrows() {
    if (!this.userDice || !this.computerDice) {
      console.log("Error: Both players must select different dice.");
      return;
=======
    this.checkGameEnd();
  }

  checkGameEnd() {
    if (this.turns >= 6) {
      this.endRound();
    } else {
      this.turns++;
      this.playRound();
>>>>>>> revert-to-cea0843e
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
<<<<<<< HEAD

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
=======
    this.endGame();
>>>>>>> revert-to-cea0843e
  }

  endGame() {
    console.log("Game over!");
  }
<<<<<<< HEAD
=======

  handleUserSelection(promptText, callback) {
    let selection = this.cli.promptUser(promptText);
    if (selection === "X" || selection === "x") {
      console.log("Exiting the game.");
      return;
    }
    if (selection === "?") {
      this.cli.showHelp();
      selection = this.cli.promptUser(promptText); // Prompt again after showing help
    }
    callback(parseInt(selection));
  }
>>>>>>> revert-to-cea0843e
}

module.exports = Game;
