const readline = require("readline");
const ProbabilityCalculator = require("./ProbabilityCalculator");

class CLI {
  constructor(diceArray) {
    this.diceArray = diceArray;
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  setGame(game) {
    this.game = game;
  }

  showHelp() {
    const table = ProbabilityCalculator.generateProbabilityTable(
      this.diceArray
    );
    console.log(table);
    this.rl.question("Your selection: ", (answer) => {
      if (answer === "X") {
        this.rl.close();
      } else {
        this.game.determineFirstMove();
      }
    });
  }

  question(query, callback) {
    this.rl.question(query, callback);
  }

  close() {
    this.rl.close();
  }
}

module.exports = CLI;
