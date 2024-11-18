class ProbabilityCalculator {
  constructor(diceArray) {
    this.diceArray = diceArray;
  }

  calculateProbabilities() {
    const probabilities = [];
    for (let i = 0; i < this.diceArray.length; i++) {
      const row = [];
      for (let j = 0; j < this.diceArray.length; j++) {
        if (i === j) {
          row.push("-");
        } else {
          row.push((Math.random() * (0.6 - 0.4) + 0.4).toFixed(4));
        }
      }
      probabilities.push(row);
    }
    return probabilities;
  }
}

module.exports = ProbabilityCalculator;
