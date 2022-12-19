//---------------------Constants-----------------------//
const winningCombos = [
  []
]


//---------------------Vairables-----------------------//

let board, turn, win, tie

//---------------Cached Element References-------------//

const circleEls = document.querySelectorAll(".cir")
const messageEl = document.getElementById("message")
const resetBtnlEl = document.getElementById("reset")

//------------------Event Listeners-------------------//

circleEls.forEach(circle =>circle.addEventListener("click", handleClick))
resetBtnlEl.addEventListener("click", init)

//---------------------Functions----------------------//

init()
function init() {
  board = [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = false
  tie= false
}

function handleClick(evt) {
  const crIdx = Number(evt.target.id.replace('cr',''))
  if (board[crIdx] !== null) {
    return
  } else if (winner === true){
    return
  }
  placeToken(crIdx)
  checkForTie()
  checkforWinner()
  switchPlayerTurn()
  //render()
}

function placeToken(i) {
  board[i] = turn
}

function checkForTie(){
  if (!board.includes(null)) {
    tie = true
  }
}

