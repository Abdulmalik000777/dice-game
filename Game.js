const FairRandomGenerator = require("./FairRandomGenerator");

class Game {
  constructor(diceArray, cli) {
    this.diceArray = diceArray;
    this.cli = cli;
    this.userDice = null;
    this.computerDice = null;
    this.history = [];
  }

  start() {
    this.determineFirstMove();
  }

  determineFirstMove() {
    const { value, key, hmac } = FairRandomGenerator.generateRandomValue(2);
    console.log(`Let's determine who makes the first move.`);
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
    console.log(`Try to guess my selection.\n0 - 0\n1 - 1\nX - exit\n? - help`);

    this.cli.question("Your selection: ", (userSelection) => {
      if (userSelection === "X") {
        this.cli.close();
        return;
      }
      if (userSelection === "?") {
        this.cli.showHelp();
        return;
      }
      const userGuess = parseInt(userSelection, 10);
      if (isNaN(userGuess) || userGuess < 0 || userGuess > 1) {
        console.log("Invalid selection. Please enter 0 or 1.");
        return this.determineFirstMove(); // Retry
      }
      console.log(`My selection: ${value} (KEY=${key}).`);
      if (userGuess === value) {
        console.log("You go first!");
        this.userTurn();
      } else {
        console.log("I go first!");
        this.computerTurn();
      }
    });
  }

  userTurn() {
    console.log("Choose your dice:");
    this.diceArray.forEach((dice, index) => {
      console.log(`${index} - ${dice.values.join(",")}`);
    });
    console.log("X - exit\n? - help");

    this.cli.question("Your selection: ", (userSelection) => {
      if (userSelection === "X") {
        this.cli.close();
        return;
      }
      if (userSelection === "?") {
        this.cli.showHelp();
        return;
      }

      const userDiceIndex = parseInt(userSelection, 10);
      if (
        isNaN(userDiceIndex) ||
        userDiceIndex < 0 ||
        userDiceIndex >= this.diceArray.length
      ) {
        console.log("Invalid selection. Please choose a valid dice number.");
        return this.userTurn(); // Retry
      }
      this.userDice = this.diceArray[userDiceIndex];
      console.log(`You chose the [${this.userDice.values.join(", ")}] dice.`);

      // Validate user dice selection
      if (!this.userDice) {
        console.error("Error: User dice selection is not valid.");
        return;
      }

      console.log(`User dice set to: [${this.userDice.values.join(", ")}]`);
      this.computerTurn();
    });
  }

  computerTurn() {
    let computerDiceIndex;
    let attempts = 0;
    do {
      computerDiceIndex = FairRandomGenerator.generateRandomValue(
        this.diceArray.length
      ).value;
      attempts++;
      if (attempts > 100) {
        console.error(
          "Error: Unable to select a different dice for the computer after 100 attempts."
        );
        return;
      }
    } while (this.diceArray[computerDiceIndex] === this.userDice);

    console.log(`Selected index for computer dice: ${computerDiceIndex}`);
    this.computerDice = this.diceArray[computerDiceIndex];
    console.log(`I chose the [${this.computerDice.values.join(", ")}] dice.`);

    // Validate computer dice selection
    if (!this.computerDice) {
      console.error("Error: Computer dice selection is not valid.");
      return;
    }

    // Ensure user dice is set before proceeding
    if (!this.userDice) {
      console.log("Waiting for user to choose dice...");
      this.userTurn();
      return;
    }

    this.debugState("After computerTurn");
    this.playGame();
  }

  playGame() {
    this.debugState("Before playGame");
    console.log("Starting the game...");
    console.log(
      `User dice: ${
        this.userDice ? this.userDice.values.join(", ") : "Not selected"
      }`
    );
    console.log(
      `Computer dice: ${
        this.computerDice ? this.computerDice.values.join(", ") : "Not selected"
      }`
    );

    if (
      !this.userDice ||
      !this.computerDice ||
      this.userDice === this.computerDice
    ) {
      console.error(
        "Error: Dice selection not completed properly or dice are the same."
      );
      return;
    }

    const userRoll = this.rollDice(this.userDice);
    const computerRoll = this.rollDice(this.computerDice);
    console.log(`Your roll: ${userRoll}`);
    console.log(`My roll: ${computerRoll}`);

    if (userRoll > computerRoll) {
      console.log("You win!");
      this.history.push("User wins");
    } else if (userRoll < computerRoll) {
      console.log("I win!");
      this.history.push("Computer wins");
    } else {
      console.log("It's a tie!");
      this.history.push("Tie");
    }

    this.showHistory();
  }

  rollDice(dice) {
    const randomValue = FairRandomGenerator.generateRandomValue(
      dice.values.length
    ).value;
    return dice.values[randomValue];
  }

  showHistory() {
    console.log("Game History:");
    this.history.forEach((result, index) => {
      console.log(`${index + 1}: ${result}`);
    });
    this.cli.close();
  }

  debugState(context) {
    console.log(`[DEBUG] ${context}`);
    console.log(
      `userDice: ${
        this.userDice ? this.userDice.values.join(", ") : "Not selected"
      }`
    );
    console.log(
      `computerDice: ${
        this.computerDice ? this.computerDice.values.join(", ") : "Not selected"
      }`
    );
  }
}

module.exports = Game;
