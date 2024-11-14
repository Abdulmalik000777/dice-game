Dice Game
A dice game where two players (user and computer) compete by selecting dice and rolling them to determine the winner. The game uses HMAC for fair random generation to ensure that the computer's selection is transparent and verifiable.

Getting Started
Prerequisites
Node.js (v20.15.1 or later)

npm (v6.14.8 or later)

Installation
Clone the repository:

bash
git clone https://github.com/Abdulmalik000777/Dice-game.git
cd dice-game
Install dependencies:

bash
npm install
Configuration
Create a .env file in the root directory and add the following line:

plaintext
DICE_ARGS="2,2,4,4,9,9 6,8,1,1,8,6 7,5,3,7,5,3"
Running the Game
Start the game:

bash
npm start
Usage
The game will prompt you to guess a random value to determine who goes first.

After the first move is determined, both players select their dice.

The dice are rolled, and the results are displayed to determine the winner.

Launch with Different Parameters
4 Identical Dice:

bash
node index.js 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6 1,2,3,4,5,6
3 Dice:

bash
node index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7
Launch with Incorrect Parameters
No Dice:

bash
node index.js
2 Dice:

bash
node index.js 1,2,3,4,5,6 1,2,3,4,5,6
Invalid Number of Sides:

bash
node index.js 1,2,3,4,5 1,2,3,4,5,6,7
Non-Integer Value:

bash
node index.js 1,2,3,4,5,6 1,2,3,4,5,a
Help Table with Probabilities
Display the probability table:

bash
node index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7
When prompted, type ? and press Enter.

Whole Game Played with Results
Run the game and play through:

bash
node index.js 2,2,4,4,9,9 1,1,6,6,8,8 3,3,5,5,7,7
Play the game at least twice to capture the complete output.

HMAC Calculation
The game uses HMAC to ensure fairness:

Generate a Key: A secure random key is generated.

Calculate HMAC: HMAC is calculated using the key and the computer's value.

Reveal Key: The key is revealed after the user makes their selection, allowing the user to verify the HMAC.

Repository Structure
dice-game/
│
├── .env
├── index.js
├── package.json
├── package-lock.json
├── Dice.js
├── Game.js
├── FairRandomGenerator.js
├── CLI.js
├── HMACGenerator.js
├── ProbabilityCalculator.js
└── README.md
Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your improvements.
