let boxes = document.getElementsByClassName("boxes");
let ting = new Audio("./ting.mp3");
let body = document.querySelector("body");
let startBtn = document.querySelector(".play-btn");
let introBox = document.querySelector(".intro");
let gameTable = document.querySelector(".game-table");
let turn = "X";
let circle, cross;

// Animation for what happens when PLAY GAME button is clicked.
startBtn.addEventListener("click", () => {
  introBox.classList.add("animated");
  setTimeout(() => {
    gameTable.style.display = "grid";
    introBox.style.display = "none";
    setTimeout(() => {
      gameTable.classList.add("fading_game_table");
    }, 50);
  }, 1000);
});
// (Start)Animation in the background.
for (let i = 0; i < 120; i++) {
  circle = document.createElement("div");
  cross = document.createElement("div");
  circle.setAttribute("class", "circle");
  cross.setAttribute("class", "cross");
  circle.innerText = "O";
  cross.innerText = "X";
  body.appendChild(circle);
  body.appendChild(cross);
}
let circleClass = document.getElementsByClassName("circle");
let crossClass = document.getElementsByClassName("cross");

for (let i = 0; i < 120; i++) {
  let min = 1,
    max = 80;
  let rNum = Math.round(min + (max - min) * Math.random());
  circleClass[i].style.left = `${rNum}%`;
  circleClass[i].style.animationDelay = `${rNum}s`;

  crossClass[i].style.right = `${rNum}%`;
  crossClass[i].style.animationDelay = `${rNum}s`;
}
// (End)Animation in the background.

// Removing the non-required border sides of the boxes.
for (let index = 0; index < 3; index++) {
  boxes[index].style.borderTop = "none";
}
for (let index = 0; index < boxes.length; index += 3) {
  boxes[index].style.borderLeft = "none";
}
for (let index = 2; index < boxes.length; index += 3) {
  boxes[index].style.borderRight = "none";
}
for (let index = boxes.length - 3; index < boxes.length; index++) {
  const element = boxes[index];
  element.style.borderBottom = "none";
}

// Function for changing the turn of the players.
const changeTurn = () => {
  if (turn == "X") {
    turn = "O";
  } else {
    turn = "X";
  }
};

// Code for checking that you win or loose.
const checkWinArr = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const checkWin = () => {
  Array.from(checkWinArr).forEach((i) => {
    if (
      boxes[i[0]].innerText === boxes[i[1]].innerText &&
      boxes[i[0]].innerText === boxes[i[2]].innerText &&
      boxes[i[0]].innerText !== ""
    ) {
      win = true;
      setTimeout(reset, 2000);
      alert("Congrats Mr. " + turn + " You Won The Game");
    }
  });
};

// Code For reseting it when someone wins it
function reset() {
  Array.from(boxes).forEach((item) => {
    item.innerText = "";
  });
  introBox.classList.remove("animated");

  setTimeout(() => {
    gameTable.style.display = "none";
    introBox.style.display = "flex";
    setTimeout(() => {
      gameTable.classList.add("fading_game_table");
    }, 50);
  }, 100);
}

// Code for calling the turn changing function and placing the Turn Text in the boxes.
Array.from(boxes).forEach((e, index) => {
  e.addEventListener("click", () => {
    if (e.innerText == "") {
      e.innerText = turn;
      checkWin();
      changeTurn();
      ting.play();
      filledBoxes.push(index);
      setTimeout(aiPossibilities, 1000);
      setTimeout(filteringPos, 1050);
      setTimeout(aiTurn, 1100);
    } else {
      return;
    }
  });
});
let filledBoxes = [];
let aiWinPos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
function aiPossibilities() {
  let elem = filledBoxes[0];
  Array.from(aiWinPos).forEach((aiPos, index) => {
    let indexOfElem = aiPos.indexOf(elem);
    if (indexOfElem != -1) {
      aiPos.splice(indexOfElem, 1);

      filledBoxes.pop();
    } else {
      return;
    }
  });
}

function filteringPos() {
  let filteredAiWinPos = aiWinPos.filter(function (item) {
    return item.length != 3;
  });
  console.log("This is filtered", filteredAiWinPos);
  aiWinPos.filter(function (delItem) {
    if (delItem.length < 3) {
      return filteredAiWinPos.indexOf(delItem) < 0;
    }
  });
  console.log("aiWinPos after : ", aiWinPos);
}
function aiTurn() {
  let minRow = aiWinPos.length - aiWinPos.length,
    maxRow = aiWinPos.length;
  let minCol, maxCol;
  let rNumRow = minRow + (maxRow - minRow) * Math.random();
  let rNumCol = minCol + (maxCol - minCol) * Math.random();
}
// The "AI" must have two main points in this game.
// 1: Winning the game from player.
// 2: Stopping the player from winning.
