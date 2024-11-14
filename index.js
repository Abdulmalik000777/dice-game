require("dotenv").config();
const readlineSync = require("readline-sync");
const crypto = require("crypto");
const Dice = require("./Dice");
const Game = require("./Game");
const CLI = require("./CLI");

function generateKey() {
  return crypto.randomBytes(16).toString("hex");
}

function calculateHMAC(key, message) {
  return crypto.createHmac("sha256", key).update(message).digest("hex");
}

const args = process.env.DICE_ARGS
  ? process.env.DICE_ARGS.split(" ")
  : process.argv.slice(2);

if (args.length < 3) {
  console.error("Error: Please provide at least three dice configurations.");
  console.error("Example: node index.js 2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3");
  process.exit(1);
}

const diceConfigs = args.map((arg) => arg.split(",").map(Number));
if (diceConfigs.some((config) => config.length !== 6)) {
  console.error(
    "Error: Each dice configuration must contain exactly six integers."
  );
  process.exit(1);
}

const diceArray = diceConfigs.map((config) => new Dice(config));
const cli = new CLI(diceArray);
const game = new Game(diceArray, cli);
cli.setGame(game);

game.start();
