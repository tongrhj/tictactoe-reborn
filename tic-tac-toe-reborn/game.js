'use strict'

var currentPlayer = 1 // player 1 is X, player 0 is O
var winner = ''
var movesMade = []

var gameboard = document.querySelector('div#t3board')

function runGame (event) {
  console.log(event)
  var tile = event.target
  // if thing clicked is not t3 box, do nothing
  if (tile.classList[0] !== 't3box') { return }
  // if tile alrady has content, do nothing
  if (tile.textContent) { return }
  if (currentPlayer === 1) {
    tile.textContent = 'X'
    currentPlayer = 0
  } else {
    tile.textContent = 'O'
    currentPlayer = 1
  }
  checkWinner()
}

function checkWinner () {
  var winningMoves = [ [0, 1, 2], [3, 4, 5], [6, 7, 8],
                       [0, 3, 6], [1, 4, 7], [2, 5, 8],
                       [0, 4, 8], [2, 4, 6]]
  winningMoves.forEach(function (winTiles) {
    findWinMoveInMoves(winTiles[0], winTiles[1], winTiles[2])
  })
}

function findWinMoveInMoves (winTile1, winTile2, winTile3) {
  movesMade = (Array.from(document.getElementsByClassName('t3box'))
                    .map(getMoves))
  // if any of the winning move tiles are empty, stop function, because winningMove has not been played
  if (movesMade[winTile1] === '' ||
      movesMade[winTile2] === '' ||
      movesMade[winTile3] === '') {
    return
    // search movesMade; if the winTiles all have the same value declare a winner
  } else if (movesMade[winTile1] === movesMade[winTile2] &&
             movesMade[winTile1] === movesMade[winTile3]) {
    winner = currentPlayer ? currentPlayer - 1 : currentPlayer + 1
    console.log('Winner: ' + (winner ? 'X' : 'O'))
    promptNewGame()
  }
}

// function checkStalemate (movesMade) {
//   var gameOver
//   movesMade.forEach(function (move) {
//       if (move === '') { gameOver = false }
//   }
//   if (gameOver) { return true } else { return false }
// )
// }

function promptNewGame () {
  gameboard.removeEventListener('click', runGame)
  setTimeout(function () {
    var startNewGame = window.prompt('Start a New Game?', 'Type yes or no')
    if (startNewGame === 'yes') { resetGame(); console.log('starting new game') }
  }, 750)
}

function getMoves (tile) {
  var move = tile.textContent
  return move
}

function resetGame () {
  winner = ''
  currentPlayer = 1
  Array.from(document.getElementsByClassName('t3box')).forEach(function (tile) { tile.innerHTML = '' })
  gameboard.addEventListener('click', runGame)
}

gameboard.addEventListener('click', runGame)
