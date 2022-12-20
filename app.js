//---------------------Constants-----------------------//
const winningCombos = [
  
  //Horizontally
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [3, 4, 5, 6],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [9, 10, 11, 12],
  [10, 11, 12, 13],
  [14, 15, 16, 17],
  [15, 16, 17, 18],
  [16, 17, 18, 19],
  [17, 18, 19, 20],
  [21, 22, 23, 24],
  [22, 23, 24, 25],
  [23, 24, 25, 26],
  [24, 25, 26, 27],
  [28, 29, 30, 31],
  [29, 30, 31, 32],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [35, 36, 37, 38],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],

  //Vertically
  [0, 7, 14, 21],
  [7, 14, 21, 28],
  [14, 21, 28, 35],
  [1, 8, 15, 22],
  [8, 15, 22, 29],
  [15, 22, 29, 36],
  [2, 9, 16, 23],
  [9, 16, 23, 30],
  [16, 23, 30, 37],
  [3, 10, 17, 24],
  [10, 17, 24, 31],
  [17, 24, 31, 38],
  [4, 11, 18, 25],
  [11, 18, 25, 32],
  [18, 25, 32, 39],
  [5, 12, 19, 26],
  [12, 19, 26, 33],
  [19, 26, 33, 40],
  [6, 13, 20, 27],
  [13, 20, 27, 34],
  [20, 27, 34, 41],

  //Diagonally
  [0, 8, 16, 24],
  [1, 9, 17, 25],
  [2, 10, 18, 26],
  [3, 11, 19, 27],
  [7, 15, 23, 31],
  [8, 16, 24, 32],
  [9, 17, 25, 33],
  [10, 18, 26, 34],
  [14, 22, 30, 38],
  [15, 23, 31, 39],
  [16, 24, 32, 40],
  [17, 25, 33, 41],
  [3, 9, 15, 21],
  [4, 10, 16, 22],
  [5, 11, 17, 23],
  [6, 12, 18, 24],
  [10, 16, 22, 28],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [13, 19, 25, 31],
  [17, 23, 29, 35],
  [18, 24, 30, 36],
  [19, 25, 31, 37],
  [20, 26, 32, 38]
]


//---------------------Vairables-----------------------//

let board, turn, winner, tie

//---------------Cached Element References-------------//

const circleEls = document.querySelectorAll(".circle")
const messageEl = document.getElementById("message")
const resetBtnEl = document.getElementById("reset")

//------------------Event Listeners-------------------//

circleEls.forEach(circle => circle.addEventListener("click", handleClick))
resetBtnEl.addEventListener("click", init)

//---------------------Functions----------------------//

init()
function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = false
  tie = false
  render()
}


function placeToken(i) {
  board[i] = turn
}


function switchPlayerTurn() {
  if (winner === true) {
    return
  }
  turn *= -1
}

function updateBoard() {
  board.forEach((circle, i) => {
    if (circle === 1) {
      circleEls[i].textContent = "🔴"
    }
    if (circle === -1) {
      circleEls[i].textContent = "🟡"
    }
    if (circle === null) {
      circleEls[i].textContent = " "
    }
  })
}

function updateMessage(){
  if (!winner && !tie) {
    if (turn > 0){
      messageEl.textContent = "It's 🔴's turn..."
    } else {
      messageEl.textContent = "It's 🟡's turn..."
    }
  } else if (!winner && tie) {
    messageEl.textContent = "Tie!"
  } else {
    if (turn > 0){
      messageEl.textContent = "🔴 wins!!!"
    } else {
      messageEl.textContent = "🟡 wins!!!"
    }
  }
}


function handleClick(evt) {
  const crIdx = Number(evt.target.id.replace('cr',''))
  console.log(crIdx);
  if (board[crIdx] !== null || winner === true) {
    return
  }
  checkForTie()
  checkForWinner()
  columnstart = 35
  while (board[crIdx + columnstart] !== null){
    columnstart -= 7
  }
  board[crIdx + columnstart] = turn
  placeToken()
  switchPlayerTurn()
  render()
}


function checkForTie(){
  if (!board.includes(null)) {
    tie = true
  }
}

function checkForWinner(){
  for(let i= 0; i < winningCombos.length; i++){
  // winningCombos.forEach(function()) {
    if(Math.abs(
      board[winningCombos[i][0]]+
      board[winningCombos[i][1]]+
      board[winningCombos[i][2]]+
      board[winningCombos[i][3]]
    ) === 4) {
      winner = true
    } else {
      if(Math.abs(
        board[winningCombos[i][0]]+
        board[winningCombos[i][1]]+
        board[winningCombos[i][2]]+
        board[winningCombos[i][3]]
      ) === -4) {
        winner = true
      }
    }
  }
}

function render() {
  updateBoard()
  updateMessage()
  console.log(board);
}