// CLI.js
const readline = require("readline-sync");

class CLI {
  static promptUser(prompt) {
    return readline.question(prompt);
  }

  static showHelp() {
    console.log("Help: Choose a dice by entering the corresponding number.");
  }
}

module.exports = CLI;
