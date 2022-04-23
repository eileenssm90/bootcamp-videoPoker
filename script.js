/* eslint-disable max-len */
/* eslint-disable no-loop-func */
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

const grid = document.getElementById('grid');

let buttonDeal = document.getElementById('dealButton');
let buttonShuffle = document.getElementById('shuffleButton');
let buttonBet = document.getElementById('betButton');
let outputBox = document.getElementById('output-div');
const outputBoxWords = document.getElementById('output-div-words');

let bet = 0;
let betTable = document.getElementById('betTable');
let rewardsContainer = document.getElementById('rewardsContainer');

let betAmount1 = document.getElementById('bet-amount-1');
let betAmount2 = document.getElementById('bet-amount-2');
let betAmount3 = document.getElementById('bet-amount-3');
let betAmount4 = document.getElementById('bet-amount-4');
let betAmount5 = document.getElementById('bet-amount-5');

betAmount1.style.visibility = 'hidden';
betAmount2.style.visibility = 'hidden';
betAmount3.style.visibility = 'hidden';
betAmount4.style.visibility = 'hidden';
betAmount5.style.visibility = 'hidden';

let betPrompt = document.getElementById('betPrompt');
let dealPrompt = document.getElementById('dealPrompt');
let swapPrompt = document.getElementById('swapPrompt');
let winningPrompt = document.getElementById('winningPrompt');
let bankContainer = document.getElementById('bankContainer');
let totalBetAmount = document.getElementById('total-bet-amount');

// let holdPrompt0 = document.getElementById('holdPrompt0');
// let holdPrompt1 = document.getElementById('holdPrompt1');
// let holdPrompt2 = document.getElementById('holdPrompt2');
// let holdPrompt3 = document.getElementById('holdPrompt3');
// let holdPrompt4 = document.getElementById('holdPrompt4');

// let instructionsPrompt = document.getElementById('instructionsPrompt');

betPrompt.style.visibility = 'visible';
dealPrompt.style.visibility = 'hidden';
swapPrompt.style.visibility = 'hidden';
winningPrompt.style.visibility = 'hidden';

// holdPrompt0.style.visibility = 'hidden';
// holdPrompt1.style.visibility = 'hidden';
// holdPrompt2.style.visibility = 'hidden';
// holdPrompt3.style.visibility = 'hidden';
// holdPrompt4.style.visibility = 'hidden';

// let holdPromptArray = [];
// holdPromptArray.push(holdPrompt0);
// holdPromptArray.push(holdPrompt1);
// holdPromptArray.push(holdPrompt2);
// holdPromptArray.push(holdPrompt3);
// holdPromptArray.push(holdPrompt4);

// instructionsPrompt.style.visibility = 'hidden';

let square0 = document.getElementById(0);
let square1 = document.getElementById(1);
let square2 = document.getElementById(2);
let square3 = document.getElementById(3);
let square4 = document.getElementById(4);

let payTable = document.getElementById('payTable');
let score = 100;
payTable.innerHTML = score;

// let card = document.querySelector('.card');
// card.classList.toggle('is-flipped');

// card.addEventListener( 'click', function() {
// card.classList.toggle('is-flipped');
// });

// let openModal = document.getElementById('openModal');
// let closeModal = document.getElementById('closeModal');
// let payTableModal = document.getElementById('payTableModal');
// openModal.addEventListener('hover', () => {
//   payTableModal.showModal();
// });
// closeModal.addEventListener('click', () => {
//   payTableModal.close();
// });

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
/* ============================== sound  ============================= */
/* ========================================================================== */
/* ========================================================================== */

let cardDealSound = new Audio('https://github.com/eileenssm90/bootcamp-videoPoker/blob/main/sound/cardPlace1.wav?raw=true');

let cardSelectSound = new Audio('https://github.com/eileenssm90/bootcamp-videoPoker/blob/main/sound/cardPlace2.wav?raw=true');

let cardShuffleSound = new Audio('https://github.com/eileenssm90/bootcamp-videoPoker/blob/main/sound/cardSlide1.wav?raw=true');

let chipLaySound = new Audio('https://github.com/eileenssm90/bootcamp-videoPoker/blob/main/sound/chipLay1.wav?raw=true');

let winningSound = new Audio('https://github.com/eileenssm90/bootcamp-videoPoker/blob/main/sound/crowdApplause.mp3?raw=true');

let losingSound = new Audio('https://github.com/eileenssm90/bootcamp-videoPoker/blob/main/sound/chipsHandle6.wav?raw=true');

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
let newShuffledDeck = [];
// let myOutputValue = '';
let cardIdArray = [0, 0, 0, 0, 0];
// let gameMode = 'draw';
// let squareArrayInNumbers = [];

// Create deck, repeat 13 * 4
const createDeck = function () {
  let localDeck = [];
  const suitArray = ['clubs', 'diamonds', 'hearts', 'spades'];

  // Create 4 suits

  for (let i = 0; i < 4; i += 1) {
  // Create 13 cards

    for (let j = 1; j <= 13; j += 1) {
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

      let cardSuit = suitArray[i];

      const card = {
        rank: cardRank,
        name: cardName,
        suit: cardSuit,
        order: cardOrder,
      };

      if (cardSuit === 'diamonds') {
        card.order += 13;
      }
      if (cardSuit === 'hearts') {
        card.order += 26;
      }
      if (cardSuit === 'spades') {
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
// const shuffleDeck = function (localDeck2) {
//   for (let i = 0; i < localDeck2.length; i += 1) {
//     const currentCard = localDeck2[i];
//     const randomCard = localDeck2[Math.floor((Math.random() * localDeck2.length))];
//     localDeck2[i] = randomCard;
//     localDeck2[Math.floor((Math.random() * localDeck2.length))] = currentCard;
//   }
//   return localDeck2;
// };

let getRandomIndex = (max) => Math.floor(Math.random() * max);

const shuffleDeck = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

// Create a shuffled deck
newShuffledDeck = shuffleDeck(newDeck);
console.log(newShuffledDeck);

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
  const image = `<img src="https://raw.githubusercontent.com/Ardeeter/Blackjack-exercise/main/images/${
    card.rank
  }_of_${
    card.suit
  }.png"/>`;
  output += image;

  return output;
}

const convertToImage = function (array) {
  let output = '';
  for (let index = 0; index < array.length; index += 1) {
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

function drawCard() {
  for (let i = 0; i < 5; i += 1) {
    playerHand.push(newShuffledDeck.pop());

    cardDealSound.play();

    // Convert to image; loop 5 times

    sortDeck(playerHand, 'rank');
    // myOutputValue = convertArrayToImageLink(playerHand);
    // outputBox.innerHTML = myOutputValue;
    //   // return myOutputValue;
    console.log(playerHand);
  }
// console.log(playerHand);
}

// const cardNameTally = {};
// for (let i = 0; i < playerHand.length; i += 1) {
//   const cardName = playerHand[i].name;
//   if (cardName in cardNameTally) {
//     cardNameTally[cardName] += 1;
//   }
//   else {
//     cardNameTally[cardName] = 1;
//   }
// }
// // for (cardName in cardNameTally) {
// //   // console.log(`There are ${cardNameTally[cardName]} ${cardName}s in the hand`);
// // }
// // // console.log(cardNameTally);
// return cardNameTally;

const squareArray = [];

function createSquares() {
  // let squares = document.getElementsByClassName('square');

  square0.innerHTML = convertArrayToImageLink(playerHand[0]);
  square1.innerHTML = convertArrayToImageLink(playerHand[1]);
  square2.innerHTML = convertArrayToImageLink(playerHand[2]);
  square3.innerHTML = convertArrayToImageLink(playerHand[3]);
  square4.innerHTML = convertArrayToImageLink(playerHand[4]);

  grid.appendChild(square0);
  grid.appendChild(square1);
  grid.appendChild(square2);
  grid.appendChild(square3);
  grid.appendChild(square4);

  // console.log(square0.innerHTML);
  // note that square array has to be here to hold correctly
  // cardDealSound.play();

  squareArray.push(square0);
  squareArray.push(square1);
  squareArray.push(square2);
  squareArray.push(square3);
  squareArray.push(square4);

  squareArray.forEach((square) => {
    square.addEventListener('click', (event) => {
      chosenId = event.currentTarget.getAttribute('id');
      // use currentTarget instead of Target to make img clickable
      console.log(`chosenId: ${chosenId}`);

      if (squareArray.includes(chosenId) === true) {
        cardDealSound.play();
        squareArray.splice(squareArray.indexOf(chosenId, 1));
        square.style.height = '150px';
        cardIdArray[chosenId] = 0;
      }

      else if (squareArray.includes(chosenId) === false) {
        cardDealSound.play();
        squareArray.push(chosenId);

        square.style.height = '200px';
        // square.style.width = auto;
        cardIdArray[chosenId] = 1;
      }
    });
  });
}

//   console.log(squareArray);

//   for (let i = 0; i < playerHand.length; i += 1) {
//     let square = [];
//     let chosenId;

//     square = document.createElement('div');
//     square.setAttribute('class', 'square');
//     square.setAttribute('id', i);
//     square.setAttribute('name', `square${i}`);

//     square.innerHTML = convertArrayToImageLink(playerHand[i]);

//     grid.appendChild(square);
//     square.addEventListener('click', (event) => {
//       chosenId = event.currentTarget.getAttribute('id');
//       // use currentTarget instead of Target to make img clickable
//       console.log(`chosenId: ${chosenId}`);

//       if (squareArray.includes(chosenId) === true) {
//         cardDealSound.play();
//         squareArray.splice(squareArray.indexOf(chosenId, 1));
//         square.style.height = '100px';
//         cardIdArray[chosenId] = 0;
//       }
//       else if (squareArray.includes(chosenId) === false) {
//         cardDealSound.play();
//         squareArray.push(chosenId);

//         square.style.height = '150px';
//         // square.style.width = auto;
//         cardIdArray[chosenId] = 1;
//       }
//       // if (clickMode === 'hold') {
//       //   squareArray.push(chosenId);
//       //   square.style.height = '100px';
//       //   clickMode = 'unhold';
//       // }
//       // else if (clickMode === 'unhold') {
//       //   squareArray.splice(squareArray.indexOf(chosenId));
//       //   square.style.height = '50px';
//       //   clickMode = 'hold';
//       // }
//       squareArrayInNumbers = squareArray.map((element) => Number(element));

//       console.log(`squareArrayInNumbers: ${squareArrayInNumbers}`);
//       console.log(cardIdArray);
//       // Added this in to see if I can animate card.
//       square1 = document.getElementById(i);
//       console.log(square1);
//       // cardDealSound.play();
//     });
//   }
// }
// backup
// function createSquares() {
//   // note that square array has to be here to hold correctly
//   // cardDealSound.play();
//   const squareArray = [];
//   for (let i = 0; i < playerHand.length; i += 1) {
//     let square = [];
//     let chosenId;

//     square = document.createElement('div');
//     square.setAttribute('class', 'square');
//     square.setAttribute('id', i);
//     square.setAttribute('name', `square${i}`);

//     square.innerHTML = convertArrayToImageLink(playerHand[i]);

//     grid.appendChild(square);
//     square.addEventListener('click', (event) => {
//       chosenId = event.currentTarget.getAttribute('id');
//       // use currentTarget instead of Target to make img clickable
//       console.log(`chosenId: ${chosenId}`);

//       if (squareArray.includes(chosenId) === true) {
//         cardDealSound.play();
//         squareArray.splice(squareArray.indexOf(chosenId, 1));
//         square.style.height = '100px';
//         cardIdArray[chosenId] = 0;
//       }
//       else if (squareArray.includes(chosenId) === false) {
//         cardDealSound.play();
//         squareArray.push(chosenId);

//         square.style.height = '150px';
//         // square.style.width = auto;
//         cardIdArray[chosenId] = 1;
//       }
//       // if (clickMode === 'hold') {
//       //   squareArray.push(chosenId);
//       //   square.style.height = '100px';
//       //   clickMode = 'unhold';
//       // }
//       // else if (clickMode === 'unhold') {
//       //   squareArray.splice(squareArray.indexOf(chosenId));
//       //   square.style.height = '50px';
//       //   clickMode = 'hold';
//       // }
//       squareArrayInNumbers = squareArray.map((element) => Number(element));

//       console.log(`squareArrayInNumbers: ${squareArrayInNumbers}`);
//       console.log(cardIdArray);
//       // Added this in to see if I can animate card.
//       square1 = document.getElementById(i);
//       console.log(square1);
//       // cardDealSound.play();
//     });
//   }
// }

function shuffleHand() {
  cardShuffleSound.play();
  square0.style.height = '150px';
  square1.style.height = '150px';
  square2.style.height = '150px';
  square3.style.height = '150px';
  square4.style.height = '150px';

  for (let i = 0; i < cardIdArray.length; i += 1) {
    if (cardIdArray[i] === 0) {
      // squareArray[i].classList.add('is-flipped');
      // card.classList.add('is-flipped');
      playerHand[i] = newShuffledDeck.pop();
    }
  }
  console.log(playerHand);
  sortDeck(playerHand, 'rank');

  return convertToImage(playerHand);
}
// function resetGame() {
//   grid.innerHTML = null;
//   totalBetAmount.innerHTML = null;
//   rewardsContainer.innerHTML = null;
//   outputBoxWords.innerHTML = "That was a great game! Let's play again. Start by drawing your cards";
// }

// back-up shuffle hand
// function shuffleHand() {
//   for (let i = 0; i < cardIdArray.length; i += 1) {
//     if (cardIdArray[i] === 0) {
//       playerHand[i] = newDeck.pop();
//       // square1.classList.add('slide-out-top');
//     }
//   }
//   console.log(playerHand);
//   return convertToImage(playerHand);
// }

// square1.style.visibility = 'hidden';

// function startCountdown() {
// let showSquare1 = setTimeout(() => {
//   square1.style.visibility = 'show'; }, 1000);

// var set = setTimeout(() => {
//   outputBox.innerHTML = "set"}, 1000);

// var go = setTimeout(() => {
//   outputBox.innerHTML = "go"}, 2000);

// var loading = setTimeout(() => {
//   outputBox.innerHTML = "..."}, 3000);

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
  // for (cardName in cardNameTally) {
  //   // console.log(`There are ${cardNameTally[cardName]} ${cardName}s in the hand`);
  // }
  // // console.log(cardNameTally);
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
    if (talliedHandName.ace === 1 && talliedHandName.ten === 1 && talliedHandName.jack === 1 && talliedHandName.queen === 1 && talliedHandName.king === 1) {
      // console.log('Royal flush');
      winningSound.play();
      return 'Royal flush';
    }
    if (checkIfIncreasingRank(arrayOfRankKeysInNumbers) === true) {
      winningSound.play();
      return 'Straight flush';
    }
    winningSound.play();
    return 'Flush';
  }
  // Two denomination only - Full house, Four of a kind
  if (arrayOfRankKeysInNumbers.length === 2) {
    if (doesArrayMatch(arrayOfRankValueInNumbers, [2, 3]) === true) {
      winningSound.play();

      return 'Full house';
    }
    if (doesArrayMatch(arrayOfRankValueInNumbers, [1, 4]) === true) {
      winningSound.play();

      return 'Four of a kind';
    }
  }
  // Three denomination only - Three of a kind, two pairs
  if (arrayOfRankKeysInNumbers.length === 3) {
    if (doesArrayMatch(arrayOfRankValueInNumbers, [1, 1, 3]) === true) {
      winningSound.play();

      return 'Three of a kind';
    }
    if (doesArrayMatch(arrayOfRankValueInNumbers, [1, 2, 2]) === true) {
      winningSound.play();

      return 'Two pairs';
    }
  }
  if (talliedHandName.jack === 2) {
    winningSound.play();

    return 'Jacks or Better';
  }
  // Generic lose
  losingSound.play();
  return 'You lose';
}

// console.log(calcHandScore());
// console.log(`prize: ${multiplier[calcHandScore()] * bet}`);

/* ========================================================================== */
/* ============================== Buttons ============================= */
/* ========================================================================== */
/* ========================================================================== */

buttonDeal.addEventListener('click', () => {
  // reset
  // grid.innerHTML = null;
  betAmount1.style.visibility = 'hidden';
  betAmount2.style.visibility = 'hidden';
  betAmount3.style.visibility = 'hidden';
  betAmount4.style.visibility = 'hidden';
  betAmount5.style.visibility = 'hidden';

  swapPrompt.style.visibility = 'visible';
  dealPrompt.style.visibility = 'hidden';
  betPrompt.style.visibility = 'hidden';

  playerHand = [];

  drawCard();
  createSquares();

  sortDeck(playerHand, 'rank');
  if (calcHandScore() !== 'You lose') {
    outputBoxWords.innerHTML = `You've already got a ${calcHandScore()}. Pick wisely and you may win even bigger.`;
  }
  else {
    outputBoxWords.innerHTML = "You haven't won anything yet. Pick the cards you want to hold. Then, click DISCARD to shuffle the rest of your hand.";
  }
});

// let carder = document.getElementById('flip-card-inner');

buttonShuffle.addEventListener('click', () => {
  shuffleHand();
  // cardIdArray = [0, 0, 0, 0, 0];

  betPrompt.style.visibility = 'visible';
  swapPrompt.style.visibility = 'hidden';
  dealPrompt.style.visibility = 'hidden';
  // royal suit
  // playerHand = [
  //   { rank: 1, suit: 'hearts', name: 'ace' },
  //   { rank: 10, suit: 'hearts', name: 'ten' },
  //   { rank: 11, suit: 'hearts', name: 'jack' },
  //   { rank: 12, suit: 'hearts', name: 'queen' },
  //   { rank: 13, suit: 'hearts', name: 'king' },
  // ];
  // straight flush
  // playerHand = [
  //   { rank: 1, suit: 'hearts', name: 'ace' },
  //   { rank: 2, suit: 'hearts', name: 'two' },
  //   { rank: 3, suit: 'hearts', name: 'three' },
  //   { rank: 4, suit: 'hearts', name: 'four' },
  //   { rank: 5, suit: 'hearts', name: 'five' },
  // ];
  square0.innerHTML = convertArrayToImageLink(playerHand[0]);
  square1.innerHTML = convertArrayToImageLink(playerHand[1]);
  square2.innerHTML = convertArrayToImageLink(playerHand[2]);
  square3.innerHTML = convertArrayToImageLink(playerHand[3]);
  square4.innerHTML = convertArrayToImageLink(playerHand[4]);

  grid.appendChild(square0);
  grid.appendChild(square1);
  grid.appendChild(square2);
  grid.appendChild(square3);
  grid.appendChild(square4);

  // console.log(square0.innerHTML);
  // note that square array has to be here to hold correctly
  // cardDealSound.play();

  squareArray.push(square0);
  squareArray.push(square1);
  squareArray.push(square2);
  squareArray.push(square3);
  squareArray.push(square4);

  // createSquares();
  // calcHandScore();
  if (calcHandScore() !== 'You lose') {
    winningPrompt.style.visibility = 'visible';

    outputBoxWords.innerHTML = `You won $${multiplier[calcHandScore()] * bet} with ${calcHandScore()}. Let's play another round. Start by placing a bet.`;
    score += multiplier[calcHandScore()] * bet;
    payTable.innerHTML = score;
    let prizeMoney = multiplier[calcHandScore()] * bet;
    for (let i = 0; i < prizeMoney; i += 1) {
      let img = document.createElement('img');
      img.src = 'https://raw.githubusercontent.com/eileenssm90/bootcamp-videoPoker/main/images/chip.png';
      img.setAttribute('class', 'winningChips');
      rewardsContainer.appendChild(img);
      bet = 0;
      // cardIdArray = [0, 0, 0, 0, 0];
    }
  }
  else {
    outputBoxWords.innerHTML = 'You did not win anything. Play again. Start by placing a bet.';
    // score -= bet;
    payTable.innerHTML = score;
    // setTimeout(resetGame(), 3000);
    bet = 0;
  }
});

//   let numberOfCoins = document.createElement('div');
//   rewardsContainer.appendChild(numberOfCoins);
// }
// rewardsContainer.container

// let bounce = document.getElementById('bounce');

buttonBet.addEventListener('click', () => {
  // cardIdArray = [0, 0, 0, 0, 0];

  grid.innerHTML = null;
  // totalBetAmount.innerHTML = null;
  rewardsContainer.innerHTML = null;
  outputBoxWords.innerHTML = 'Start by drawing your cards';
  // console.log(square1);
  betPrompt.style.visibility = 'visible';
  swapPrompt.style.visibility = 'hidden';
  dealPrompt.style.visibility = 'visible';
  winningPrompt.style.visibility = 'hidden';
  // square1.classList.toggle('is-flipped');

  // square1.classList.add('slide-out-top');
  // buttonBet.classList.add('slide-out-top');
  // buttonBet.classList.add(bounce);
  // buttonBet.addEventListener('animationend', () => {
  //   buttonBet.classList.remove('rotate-scale-up');
  // }, { once: true });
  if (bet < 5) {
    bet += 1;
    // betTable.innerHTML = bet;
    chipLaySound.play();

    if (bet === 1) {
      betAmount1.style.visibility = 'visible';
      score -= 1;
      payTable.innerHTML = score;
    }
    if (bet === 2) {
      betAmount2.style.visibility = 'visible';
      score -= 1;
      payTable.innerHTML = score;
    }
    if (bet === 3) {
      betAmount3.style.visibility = 'visible';
      score -= 1;
      payTable.innerHTML = score;
    }
    if (bet === 4) {
      betAmount4.style.visibility = 'visible';
      score -= 1;
      payTable.innerHTML = score;
    }
    if (bet === 5) {
      betAmount5.style.visibility = 'visible';
      score -= 1;
      payTable.innerHTML = score;
    }
  }
  // if (gameMode = 'reset') {
  //   grid.innerHTML = null;
  //   totalBetAmount.innerHTML = null;
  //   rewardsContainer.innerHTML = null;
  //   outputBoxWords.innerHTML = null;
  //   gameMode = 'game';
  // }
  // else {
});
//   buttonBet.removeEventListener('click');
// }
