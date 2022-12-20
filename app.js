//---------------------Constants-----------------------//
const winningCombos = [
  
  //Vertically
  [0, 1, 2, 3],
  [1, 2, 3, 4],
  [2, 3, 4, 5],
  [6, 7, 8 ,9],
  [7, 8, 9, 10],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  [13, 14, 15, 16],
  [14, 15, 16, 17],
  [18, 19, 20, 21],
  [19, 20, 21, 22],
  [20, 21, 22, 23],
  [24, 25, 26, 27],
  [25, 26, 27, 28],
  [26, 28, 29, 30],
  [30, 31, 32, 33],
  [31, 32, 33, 34],
  [32, 33, 34, 35],
  [36, 37, 38, 39],
  [37, 38, 39, 40],
  [38, 39, 40, 41],

  //Horizontally
  [0, 6, 12, 18],
  [1, 7, 13, 19],
  [2, 8, 14, 20],
  [3, 9, 15, 21],
  [4, 10, 16, 22],
  [5, 11, 17, 23],
  [6, 12, 18, 24],
  [7, 13, 19, 25],
  [8, 14, 20, 26],
  [9, 15, 21, 27],
  [10, 16, 22, 28],
  [11, 17, 23, 29],
  [12, 18, 24, 30],
  [13, 19, 25, 31],
  [14, 20, 26, 32],
  [15, 21, 27, 33],
  [16, 22, 28, 34],
  [17, 23, 29, 35],
  [18, 24, 30, 36],
  [19, 25, 31, 37],
  [20, 26, 32, 38],
  [21, 27, 33, 39],
  [22, 28, 34, 40],
  [23, 29, 35, 41],

  //Diagonally
  [0, 7, 14, 21],
  [1, 8, 15, 22],
  [2, 9, 16, 23],
  [5, 10, 15, 20],
  [4, 9, 14, 19],
  [3, 8, 13, 18],
  [6, 13, 20, 27],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 14, 19, 24],
  [10, 15, 20, 25],
  [11, 16, 21, 26],
  [12, 19, 26, 33],
  [13, 20, 17, 34],
  [14, 21, 28, 35],
  [15, 20, 25, 30],
  [16, 21, 26, 31],
  [17, 22, 27, 32],
  [18, 25, 32, 39],
  [19, 26, 33, 40],
  [20, 27, 34, 41],
  [21, 26, 31, 36],
  [22, 27, 32, 37],
  [23, 28, 33, 38]
]


//---------------------Vairables-----------------------//

let board, turn, win, tie

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
  tie= false
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
  placeToken(turn)
  switchPlayerTurn()
  render()
}

function checkForTie(){
  if (!board.includes(null)) {
    tie = true
  }
}

function checkForWinner(){
  for(let i= 0; i <winningCombos.length; i++){
    if(Math.abs(
      board[winningCombos[i][0]]+
      board[winningCombos[i][1]]+
      board[winningCombos[i][2]]+
      board[winningCombos[i][3]]
    ) === 4) {
      winner = true
    }
  }
}

function render() {
  updateBoard()
  updateMessage()
  console.log(board);
}