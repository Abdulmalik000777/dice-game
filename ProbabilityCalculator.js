class ProbabilityCalculator {
  constructor(diceArray) {
    this.diceArray = diceArray;
  }

  calculateProbabilities() {
    const probabilities = [];
    for (let i = 0; i < this.diceArray.length; i++) {
      probabilities[i] = [];
      for (let j = 0; j < this.diceArray.length; j++) {
        probabilities[i][j] = this.calculateWinProbability(
          this.diceArray[i],
          this.diceArray[j]
        );
      }
    }
    return probabilities;
  }

  calculateWinProbability(userDice, opponentDice) {
    let userWins = 0;
    let totalGames = 0;
    for (let userRoll of userDice.sides) {
      for (let opponentRoll of opponentDice.sides) {
        totalGames++;
        if (userRoll > opponentRoll) {
          userWins++;
        }
      }
    }
    return userWins / totalGames;
  }
}

module.exports = ProbabilityCalculator;
