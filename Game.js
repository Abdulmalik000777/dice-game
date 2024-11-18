const FairRandomGenerator = require("./FairRandomGenerator");

class Game {
  constructor(diceArray, cli) {
    this.diceArray = diceArray.map((config) => ({ sides: config }));
    this.cli = cli;
    this.userScore = 0;
    this.computerScore = 0;
    this.turns = 0;
    this.userDice = null;
    this.computerDice = null;
  }

  start() {
    console.log("Starting the game");
    this.playRound();
  }

  playRound() {
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
    }

    this.checkGameEnd();
  }

  checkGameEnd() {
    if (this.turns >= 6) {
      this.endRound();
    } else {
      this.turns++;
      this.playRound();
    }
  }

  endRound() {
    console.log("Round over!");
    console.log(`Your score: ${this.userScore}`);
    console.log(`Computer's score: ${this.computerScore}`);

    if (this.userScore > this.computerScore) {
      console.log("You win!");
    } else if (this.computerScore > this.userScore) {
      console.log("I win!");
    } else {
      console.log("It's a tie!");
    }
    this.endGame();
  }

  endGame() {
    console.log("Game over!");
  }

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
}

module.exports = Game;
