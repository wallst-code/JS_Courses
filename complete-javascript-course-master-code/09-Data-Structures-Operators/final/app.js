'use strict';

const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};

// Create the player1 and player2 arrays by destructing the original array.
const [players1, players2] = game.players;
console.log(players1, players2);

//Here we destructure the player1 array to have a goal keeper variable and the remaining players to an array.
//into one array using the rest syntax.
const [gk, ...fieldPlayers] = players1;
console.log(gk, fieldPlayers);

//Spread operator to make a composite array of both teams.
const allPlayers = [...players1, ...players2];
console.log(allPlayers);

//New array contianing players1 and add 3 new players.
//We unpack the player1 array and then add 3 into a new array called players1Final.
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Periscic'];
console.log(players1Final);

//Nested obj destructure - we changed the name of x to draw using the colon.
//We took the odds property which is an object, then deconstruct further inside the odds obj.
const {
  odds: { team1, x: draw, team2 },
} = game;
console.log(team1, draw, team2);

//Rest Parameters - aggregates separate parameters - allows us to take in an unknown amount of parameters.
const printGoals = function (...players) {
  console.log(players);
  console.log(`${players.length} goals were scored.`);
};

printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');

//Using the spread operator to unpack an array and then let the function repack it.
printGoals(...game.scored);

//Logical Operators - it does nothing if a false short-circuits in this case.
// The left side must test out to true and then the right side will run.
team1 < team2 && console.log('Team 1 is more likely to win');
team2 < team1 && console.log('Team 2 is more likely to win');
