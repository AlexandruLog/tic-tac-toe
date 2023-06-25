const cell = document.querySelectorAll("td");
const infoTurn = document.querySelector(".turn-player p");
const gameSymbols = ["X", "O"];
let goPlayer = gameSymbols[Math.floor(Math.random() * gameSymbols.length)];

function createGame() {
  for (let index = 0; index < 9; ++index) {
    cell[index].setAttribute("onclick", `clickCell(${index})`);
  }
  infoTurn.textContent = "Player " + goPlayer + "'s Turn";
}

createGame();

let gameMoves = 0;
let gameOver = false;

function clickCell(indexCell) {
  cell[indexCell].textContent = goPlayer;
  cell[indexCell].removeAttribute("onclick", `clickCell(${indexCell})`);
  cell[indexCell].classList.add("disabled-cell");
  if (goPlayer == gameSymbols[0]) {
    goPlayer = gameSymbols[1];
  } else {
    goPlayer = gameSymbols[0];
  }
  infoTurn.textContent = "Player " + goPlayer + "'s Turn";
  ++gameMoves;
  checkWinner();
}

const winnerCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWinner() {
  for (let array of winnerCombos) {
    let foundO = 0;
    let foundX = 0;
    for (let index of array) {
      if (cell[index].textContent == gameSymbols[0]) {
        ++foundX;
      } else if (cell[index].textContent == gameSymbols[1]) {
        ++foundO;
      }
    }
    //Display Winner
    if (foundX == 3) {
      infoTurn.innerHTML = "Winner X &#128079";
    } else if (foundO == 3) {
      infoTurn.innerHTML = "Winner 0 &#128079";
    } else if (gameMoves == 9 && !gameOver) {
      infoTurn.innerHTML = "Draw &#127884";
    }
    //Show Winner
    if (foundX == 3 || foundO == 3 || gameMoves == 9) {
      for (let cellIndex of array) {
        cell[cellIndex].id = "winner";
      }
      stopGame();
    }
  }
}

function stopGame() {
  gameOver = true;
  for (let index = 0; index < 9; ++index) {
    cell[index].removeAttribute("onclick", `clickCell(${index})`);
    cell[index].classList.add("disabled-cell");
  }
}

let resetIndex = 0;

function resetGame() {
  if (resetIndex || gameOver) {
    location.reload();
  } else {
    ++resetIndex;
    document.querySelector(".btn").textContent = "Are you sure ?";
    document.querySelector(".btn").id = "reset-button";
    document.querySelector(".reset-game p").id = "visible-warning-para";
  }
}
