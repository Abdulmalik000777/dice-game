const Game = require("./Game");
const CLI = require("./CLI");

const args = process.argv.slice(2);

const diceConfigs = args.map((arg) => {
  const config = arg.split(",").map(Number);
  if (config.some(isNaN) || config.length !== 6) {
    console.error("Error: Each dice configuration must contain exactly six integers.");
    process.exit(1);
  }
  return config;
});

if (diceConfigs.length < 3) {
  console.error("Error: You must provide at least three dice configurations.");
  process.exit(1);
}

const cli = new CLI(diceConfigs);
const game = new Game(diceConfigs, cli);

game.start();
