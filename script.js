/* eslint-disable prefer-const */
/* ========================================================================== */
/* ========================================================================== */
/* ======================== ES 16 Mar 22 High Card Dom ====================== */
/* ========================================================================== */
/* ========================================================================== */

/* ========================================================================== */
/* ============================== Game logic ================================ */
/* ========================================================================== */
/* ========================================================================== */

// Null when click white space
// Tallying the hand
// Sorting by suit and rank

// Winning conditions
// Awarding scores
// Changing hands
// Betting and scoreboard
// Flipping card sound
// Possibility
// Confetti

/* ========================================================================== */
/* ========================================================================== */
/* ============================== HTML function ============================= */
/* ========================================================================== */
/* ========================================================================== */

const grid = document.createElement('div');
grid.setAttribute('class', 'grid');
document.body.appendChild(grid);

let buttonDeal = document.getElementById('dealButton');
let buttonShuffle = document.getElementById('shuffleButton');
let buttonBet = document.getElementById('betButton');
let outputBox = document.getElementById('output-div');
const outputBoxWords = document.getElementById('output-div-words');
let payTable = document.getElementById('payTable');
let betTable = document.getElementById('betTable');

let score = 100;
payTable.innerHTML = score;

let bet = 0;
betTable.innerHTML = bet;

let openModal = document.getElementById('openModal');
let closeModal = document.getElementById('closeModal');
let payTableModal = document.getElementById('payTableModal');

openModal.addEventListener('click', () => {
  payTableModal.showModal();
});
closeModal.addEventListener('click', () => {
  payTableModal.close();
});

// let reward;
const multiplier = {
  'Royal flush': 250,
  'Straight flush': 50,
  // eslint-disable-next-line quote-props
  'Flush': 6,
  'Full house': 9,
  'Four of a kind': 25,
  'Three of a kind': 3,
  'Two pairs': 2,
  'Jacks or Better': 1,
};

/* ========================================================================== */
/* ========================================================================== */
/* ============================== Helper function =========================== */
/* ========================================================================== */
/* ========================================================================== */

// Global variables
// eslint-disable-next-line prefer-const
// eslint-disable-next-line no-var
var playerHand = [];
let newDeck = [];
// let myOutputValue = '';
let cardIdArray = [0, 0, 0, 0, 0];
let gameMode = 'draw';
let squareArrayInNumbers = [];
// const gameMode = 'starting';

// Create deck, repeat 13 * 4
const createDeck = function (localDeck) {
  var localDeck = [];
  const suitArray = ['clubs', 'diamonds', 'hearts', 'spades'];

  // Create 4 suits

  for (let i = 0; i < 4; i++) {
  // Create 13 cards

    for (let j = 1; j <= 13; j++) {
      const cardRank = j;
      const cardOrder = j;
      let cardName = j;
      // Change name of picture card

      if (cardRank === 1) {
        cardName = 'ace';
      }
      if (cardRank === 11) {
        cardName = 'jack';
      }
      if (cardRank === 12) {
        cardName = 'queen';
      }
      if (cardRank === 13) {
        cardName = 'king';
      }

      const card = {
        rank: cardRank,
        name: cardName,
        suit: cardSuit,
        order: cardOrder,
      };

      var cardSuit = suitArray[i];

      if (cardSuit == 'diamonds') {
        card.order += 13;
      }
      if (cardSuit == 'hearts') {
        card.order += 26;
      }
      if (cardSuit == 'spades') {
        card.order += 39;
      }

      localDeck.push(card);
    }
  }
  return localDeck;
};

newDeck = createDeck();
console.log(createDeck());

// Shuffle it
const localDeck2 = [];
const shuffleDeck = function (localDeck2) {
  for (let i = 0; i < localDeck2.length; i++) {
    const currentCard = localDeck2[i];
    const randomCard = localDeck2[Math.ceil((Math.random() * localDeck2.length) - 1)];
    localDeck2[i] = randomCard;
    localDeck2[Math.ceil((Math.random() * localDeck2.length) - 1)] = currentCard;
  }
  return localDeck2;
};

// Create a shuffled deck
newDeck = shuffleDeck(newDeck);
console.log(newDeck);

// Converting string to image
// const convertArrayToImageLink = function (array) {
//   let output = '';
//   for (let index = 0; index < array.length; index++) {
//     const card = array[index];
//     const image = `<img src="https://raw.githubusercontent.com/Ardeeter/Blackjack-exercise/main/images/${
//       card.rank
//     }_of_${
//       card.suit
//     }.png"/>`;
//     output += image;
//   }
//   return output;
// };

// Sort function
function sortDeck(array, attribute) {
  array.sort((currentCard, nextCard) => {
    if (currentCard[attribute] < nextCard[attribute]) {
      return -1;
    } if (currentCard[attribute] > nextCard[attribute]) {
      return 1;
    }
    return 0;
  });
  return array;
}

// function convertArrayToImageLink (card) {
//   const image = `<img src="https://raw.githubusercontent.com/Ardeeter/Blackjack-exercise/main/images/${
//     card.rank
//   }_of_${
//     card.suit
//   }.png"/>`;
//   // let output = '';
//   // output += image;
//   // console.log(output);
//   return image;
// };

function convertArrayToImageLink(card) {
  let output = '';
  // for (let index = 0; index < array.length; index++) {
  // let chosenId;
  // const card = array[index];
  const image = `<img src="https://raw.githubusercontent.com/Ardeeter/Blackjack-exercise/main/images/${
    card.rank
  }_of_${
    card.suit
  }.png"/>`;
  output += image;
  // image.setAttribute('id', index);

  // card.addEventListener('click', (event) => {
  //   chosenId = event.target.getAttribute('id');
  //   console.log(`chosenId: ${chosenId}`);
  // });
  // }
  return output;
}

const convertToImage = function (array) {
  let output = '';
  for (let index = 0; index < array.length; index++) {
    const card = array[index];
    const image = `<img src="https://raw.githubusercontent.com/Ardeeter/Blackjack-exercise/main/images/${
      card.rank
    }_of_${
      card.suit
    }.png"/>`;
    output += image;
  }
  return output;
};

// drawCard();

function drawCard() {
  for (let i = 0; i < 5; i += 1) {
    playerHand.push(newDeck.pop());
    // Convert to image; loop 5 times
    sortDeck(playerHand, 'rank');
    // myOutputValue = convertArrayToImageLink(playerHand);
    // outputBox.innerHTML = myOutputValue;
  //   // return myOutputValue;
  }
  // console.log(playerHand);
}

function createSquares() {
  // note that square array has to be here to hold correctly
  const squareArray = [];
  for (let i = 0; i < playerHand.length; i += 1) {
    let square = [];
    let chosenId;

    square = document.createElement('div');
    square.setAttribute('class', 'square');
    square.setAttribute('id', i);
    square.innerHTML = convertArrayToImageLink(playerHand[i]);

    grid.appendChild(square);
    square.addEventListener('click', (event) => {
      chosenId = event.target.getAttribute('id');
      console.log(`chosenId: ${chosenId}`);
      if (squareArray.includes(chosenId) === true) {
        squareArray.splice(squareArray.indexOf(chosenId, 1));
        square.style.height = '50px';
        cardIdArray[chosenId] = 0;
      }
      else if (squareArray.includes(chosenId) === false) {
        squareArray.push(chosenId);

        square.style.height = '100px';
        .scale-up-center {
	-webkit-animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: scale-up-center 0.4s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
        cardIdArray[chosenId] = 1;
      }
      // if (clickMode === 'hold') {
      //   squareArray.push(chosenId);
      //   square.style.height = '100px';
      //   clickMode = 'unhold';
      // }
      // else if (clickMode === 'unhold') {
      //   squareArray.splice(squareArray.indexOf(chosenId));
      //   square.style.height = '50px';
      //   clickMode = 'hold';
      // }
      squareArrayInNumbers = squareArray.map((element) => Number(element));

      console.log(`squareArrayInNumbers: ${squareArrayInNumbers}`);
      console.log(cardIdArray);
    });
  }
}

function shuffleHand() {
  for (let i = 0; i < cardIdArray.length; i += 1) {
    if (cardIdArray[i] === 0) {
      playerHand[i] = newDeck.pop();
    }
  }
  console.log(playerHand);
  return convertToImage(playerHand);
}

/* ========================================================================== */
/* ========================================================================== */
/* ============================== Game function ============================= */
/* ========================================================================== */
/* ========================================================================== */

// Doesn't work if placed above the buttons, because card is not drawn until then.
// calculateTally(playerHand);

// sortDeck(playerHand, 'rank');

// Calculate tally

function calculateNameTally() {
  const cardNameTally = {};
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardName = playerHand[i].name;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    else {
      cardNameTally[cardName] = 1;
    }
  }
  for (cardName in cardNameTally) {
    // console.log(`There are ${cardNameTally[cardName]} ${cardName}s in the hand`);
  }
  // console.log(cardNameTally);
  return cardNameTally;
}

function calculateSuitTally() {
  const cardNameTally = {};
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardName = playerHand[i].suit;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    else {
      cardNameTally[cardName] = 1;
    }
  }
  for (cardName in cardNameTally) {
    // console.log(`There are ${cardNameTally[cardName]} ${cardName} in the hand`);
  }
  // console.log(cardNameTally);
  return cardNameTally;
}

function calculateRankTally() {
  const cardNameTally = {};
  for (let i = 0; i < playerHand.length; i += 1) {
    const cardName = playerHand[i].rank;
    if (cardName in cardNameTally) {
      cardNameTally[cardName] += 1;
    }
    else {
      cardNameTally[cardName] = 1;
    }
  }
  for (cardName in cardNameTally) {
    // console.log(`There are ${cardNameTally[cardName]} ${cardName} in the hand`);
  }
  // console.log(cardNameTally);
  return cardNameTally;
}

function checkIfIncreasingRank(array) {
  for (let i = 0; i < array.length; i += 1) {
    const card = array[i];
    const nextCard = array[i + 1];
    if (nextCard - card === 1) {
      return true;
    }
    return false;
  }
}

// console.log(checkIfIncreasingRank(arrayOfRankKeysInNumbers));

function doesArrayMatch(handArray, winningArray) {
  for (let i = 0; i < winningArray.length; i += 1) {
    const checker = winningArray.every((element) => handArray.includes(element));
    // console.log(`winningArray: ${winningArray}; handArray: ${handArray}`);
    if (checker === true) {
      return true;
    }
    return false;
  }
}

// const array1 = [2, 3];
// const array2 = [3, 1];
// console.log(doesArrayMatch(array1, array2));

// calcHandScore(talliedHandSuit, talliedHandName);
// console.log(calcHandScore());

function calcHandScore() {
  const talliedHandName = calculateNameTally();
  const talliedHandSuit = calculateSuitTally();
  const talliedHandRank = calculateRankTally();
  // console.log(Object.values(talliedHandSuit));
  // console.log(Object.keys(talliedHandRank));
  // console.log(playerHand);

  // Generate array of rank keys
  const arrayOfRankKeys = Object.keys(talliedHandRank);
  const arrayOfRankKeysInNumbers = arrayOfRankKeys.map((element) => Number(element));
  const arrayOfRankValue = Object.values(talliedHandRank);
  const arrayOfRankValueInNumbers = arrayOfRankValue.map((element) => Number(element));
  // console.log(arrayOfRankValueInNumbers);

  // One suit only - Royal flush, straight flush, flush
  if (Number(Object.values(talliedHandSuit)) === 5) {
    if (talliedHandName.ace === 1 && talliedHandName['10'] === 1 && talliedHandName.jack === 1 && talliedHandName.queen === 1 && talliedHandName.king === 1) {
      // console.log('Royal flush');
      return 'Royal flush';
    }
    if (checkIfIncreasingRank(arrayOfRankKeysInNumbers) === true) {
      return 'Straight flush';
    }
    return 'Flush';
  }
  // Two denomination only - Full house, Four of a kind
  if (arrayOfRankKeysInNumbers.length === 2) {
    if (doesArrayMatch(arrayOfRankValueInNumbers, [2, 3]) === true) {
      return 'Full house';
    }
    if (doesArrayMatch(arrayOfRankValueInNumbers, [1, 4]) === true) {
      return 'Four of a kind';
    }
  }
  // Three denomination only - Three of a kind, two pairs
  if (arrayOfRankKeysInNumbers.length === 3) {
    if (doesArrayMatch(arrayOfRankValueInNumbers, [1, 1, 3]) === true) {
      return 'Three of a kind';
    }
    if (doesArrayMatch(arrayOfRankValueInNumbers, [1, 2, 2]) === true) {
      return 'Two pairs';
    }
  }
  if (talliedHandName.jack === 2) {
    return 'Jacks or Better';
  }
  // Generic lose
  return 'You lose';
}

// console.log(calcHandScore());
// console.log(`prize: ${multiplier[calcHandScore()] * bet}`);

/* ========================================================================== */
/* ========================================================================== */
/* ============================== Buttons ============================= */
/* ========================================================================== */
/* ========================================================================== */

// Reshuffle card
// eslint-disable-next-line prefer-const

buttonDeal.addEventListener('click', () => {
  grid.innerHTML = null;
  playerHand = [];
  drawCard();
  createSquares();
  sortDeck(playerHand, 'rank');
  if (calcHandScore() !== 'You lose') {
    outputBoxWords.innerHTML = `You've already got a ${calcHandScore()}. Pick wisely and you may win even bigger.`;
  }
  else {
    outputBoxWords.innerHTML = "You haven't won anything yet. Shuffle your cards.";
  }
});

buttonShuffle.addEventListener('click', () => {
  shuffleHand();
  grid.innerHTML = null;
  // playerHand = [
  //   { rank: 11, suit: 'hearts', name: 'jacks' },
  //   { rank: 11, suit: 'hearts', name: 'jacks' },
  //   { rank: 11, suit: 'hearts', name: 'jacks' },
  //   { rank: 11, suit: 'hearts', name: 'jacks' },
  //   { rank: 5, suit: 'diamonds', name: '5' },
  // ];
  createSquares();
  if (calcHandScore() !== 'You lose') {
    outputBoxWords.innerHTML = `You won $${multiplier[calcHandScore()] * bet} with ${calcHandScore()}.`;
    score = score - bet + multiplier[calcHandScore()] * bet;
    payTable.innerHTML = score;
  }
  else {
    outputBoxWords.innerHTML = 'You lose. Try again.';
    score -= bet;
    payTable.innerHTML = score;
  }
});

buttonBet.addEventListener('click', () => {
  if (bet <= 5) {
    bet += 1;
    betTable.innerHTML = bet;
  }
});
