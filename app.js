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

circleEls.forEach(circle =>circle.addEventListener("click", handleclick))
resetBtnlEl.addEventListener("click", init)

//---------------------Functions----------------------//

