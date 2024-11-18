const Game = require("./Game");
const CLI = require("./CLI");

// Command-line arguments (excluding node and script path)
const args = process.argv.slice(2);

// Validate the dice configurations
const diceConfigs = args.map((arg) => {
  const config = arg.split(",").map(Number);
  if (config.some(isNaN) || config.length !== 6) {
    console.error(
      "Error: Each dice configuration must contain exactly six integers."
    );
    process.exit(1);
  }
  return config;
});

// Ensure at least three dice configurations are provided
if (diceConfigs.length < 3) {
  console.error("Error: You must provide at least three dice configurations.");
  process.exit(1);
}

// Instantiate the CLI and Game objects
const cli = new CLI(diceConfigs);
const game = new Game(diceConfigs, cli);

// Start the game
game.start();
