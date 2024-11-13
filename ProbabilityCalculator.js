class ProbabilityCalculator {
  static calculateProbabilities(diceArray) {
    const probabilities = [];
    for (let i = 0; i < diceArray.length; i++) {
      probabilities[i] = [];
      for (let j = 0; j < diceArray.length; j++) {
        if (i === j) {
          probabilities[i][j] = "- (0.3333)";
        } else {
          probabilities[i][j] = this.calculateWinProbability(
            diceArray[i],
            diceArray[j]
          );
        }
      }
    }
    return probabilities;
  }

  static calculateWinProbability(dice1, dice2) {
    let wins = 0;
    for (let i = 0; i < dice1.values.length; i++) {
      for (let j = 0; j < dice2.values.length; j++) {
        if (dice1.values[i] > dice2.values[j]) {
          wins++;
        }
      }
    }
    const totalComparisons = dice1.values.length * dice2.values.length;
    return (wins / totalComparisons).toFixed(4);
  }

  static generateProbabilityTable(diceArray) {
    const probabilities = this.calculateProbabilities(diceArray);
    let table = "Probability of the win for the user:\n";
    table +=
      "+-------------" + "+-------------".repeat(diceArray.length) + "+\n";
    table += "| User dice v ";
    diceArray.forEach((dice, index) => {
      table += `| ${dice.values.join(",")} `;
    });
    table += "|\n";
    table +=
      "+-------------" + "+-------------".repeat(diceArray.length) + "+\n";

    for (let i = 0; i < diceArray.length; i++) {
      table += `| ${diceArray[i].values.join(",")} `;
      for (let j = 0; j < diceArray.length; j++) {
        table += `| ${probabilities[i][j]} `;
      }
      table += "|\n";
      table +=
        "+-------------" + "+-------------".repeat(diceArray.length) + "+\n";
    }
    return table;
  }
}

module.exports = ProbabilityCalculator;
