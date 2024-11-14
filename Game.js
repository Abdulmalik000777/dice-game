const FairRandomGenerator = require("./FairRandomGenerator");

class Game {
  constructor(diceArray, cli) {
    this.diceArray = diceArray;
    this.cli = cli;
    this.userScore = 0;
    this.computerScore = 0;
    this.turns = 0;
    this.computerKey = null;
    this.computerValue = null;
  }

  start() {
    this.determineFirstMove();
  }

  determineFirstMove() {
    const key = this.cli.generateKey();
    const computerSelection = Math.floor(Math.random() * 2);
    const hmac = this.cli.calculateHMAC(key, computerSelection.toString());

    console.log(`Let's determine who makes the first move.`);
    console.log(`I selected a random value in the range 0..1 (HMAC=${hmac}).`);
    console.log(`Try to guess my selection.`);
    console.log(`0 - 0`);
    console.log(`1 - 1`);
    console.log(`X - exit`);
    console.log(`? - help`);

    const selection = this.cli.promptUser("Your selection: ");

    if (selection === "X" || selection === "x") {
      console.log("Exiting the game.");
      return;
    }

    const userSelection = parseInt(selection);
    console.log(`My selection: ${computerSelection} (KEY=${key}).`);
    if (userSelection === computerSelection) {
      console.log("You make the first move.");
      this.userTurn();
    } else {
      console.log("I make the first move.");
      this.computerTurn();
    }
  }

  userTurn() {
    console.log("It's time for your throw.");
    this.makeThrow("user");
  }

  computerTurn() {
    console.log("It's time for my throw.");
    this.makeThrow("computer");
  }

  makeThrow(player) {
    const diceChoices = this.diceArray
      .map((dice, index) => `${index} - ${dice.sides.join(",")}`)
      .join("\n");
    console.log(`Choose your dice:\n${diceChoices}\nX - exit\n? - help`);

    const selection = this.cli.promptUser("Your selection: ");

    if (selection === "X" || selection === "x") {
      console.log("Exiting the game.");
      return;
    }

    if (selection === "?") {
      this.cli.showHelp();
      this.makeThrow(player);
      return;
    }

    const diceIndex = parseInt(selection);
    if (
      !isNaN(diceIndex) &&
      diceIndex >= 0 &&
      diceIndex < this.diceArray.length
    ) {
      const selectedDice = this.diceArray[diceIndex];
      if (player === "user") {
        this.userRoll(selectedDice);
      } else {
        this.computerRoll(selectedDice);
      }
    } else {
      console.log("Invalid selection. Please try again.");
      this.makeThrow(player);
    }
  }

  userRoll(selectedDice) {
    console.log("You roll the dice...");
    const userRoll = selectedDice.roll();
    console.log(`You rolled: ${userRoll}`);

    const {
      value: computerValue,
      key: computerKey,
      hmac,
    } = FairRandomGenerator.generateRandomValue(6);
    this.computerValue = computerValue;
    this.computerKey = computerKey;
    console.log(`My random value (HMAC=${hmac}).`);

    const userSelection = this.cli.promptUser("Add your number modulo 6: ");
    const userValue = parseInt(userSelection);
    const result = (computerValue + userValue) % 6;

    console.log(`My number is ${computerValue} (KEY=${computerKey}).`);
    console.log(`The result is ${result} (mod 6).`);
    const computerRoll = selectedDice.sides[computerValue];
    console.log(`My throw is ${computerRoll}.`);
    console.log(`Your throw is ${userRoll}.`);

    this.userScore += userRoll;
    this.computerScore += computerRoll;
    this.turns++;
    this.checkGameEnd();
  }

  computerRoll(selectedDice) {
    console.log("I roll the dice...");
    const computerRoll = selectedDice.roll();
    console.log(`I rolled: ${computerRoll}`);

    const {
      value: userValue,
      key: userKey,
      hmac,
    } = FairRandomGenerator.generateRandomValue(6);
    this.userValue = userValue;
    this.userKey = userKey;
    console.log(`My random value (HMAC=${hmac}).`);

    const computerSelection = this.cli.promptUser("Add your number modulo 6: ");
    const computerValue = parseInt(computerSelection);
    const result = (userValue + computerValue) % 6;

    console.log(`My number is ${userValue} (KEY=${userKey}).`);
    console.log(`The result is ${result} (mod 6).`);
    const userRoll = selectedDice.sides[userValue];
    console.log(`My throw is ${computerRoll}.`);
    console.log(`Your throw is ${userRoll}.`);

    this.userScore += userRoll;
    this.computerScore += computerRoll;
    this.turns++;
    this.checkGameEnd();
  }

  checkGameEnd() {
    if (this.turns >= 6) {
      this.endGame();
    } else {
      if (this.turns % 2 === 0) {
        this.userTurn();
      } else {
        this.computerTurn();
      }
    }
  }

  endGame() {
    console.log("Game over!");
    console.log(`Your score: ${this.userScore}`);
    console.log(`Computer's score: ${this.computerScore}`);

    if (this.userScore > this.computerScore) {
      console.log("You win!");
    } else if (this.computerScore > this.userScore) {
      console.log("I win!");
    } else {
      console.log("It's a tie!");
    }
  }

  processSelection(diceIndex) {
    console.log(`Processing selection: ${diceIndex}`);
  }
}

module.exports = Game;
