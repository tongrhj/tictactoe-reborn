(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var currentPlayer = 1; // player 1 is X, player 0 is O
var winner = '';
var movesMade = [];

var gameboard = document.querySelector('div#t3board');

function runGame(event) {
  console.log(event);
  var tile = event.target;
  // if thing clicked is not t3 box, do nothing
  if (tile.classList[0] !== 't3box') {
    return;
  }
  // if tile alrady has content, do nothing
  if (tile.textContent) {
    return;
  }
  if (currentPlayer === 1) {
    tile.textContent = 'X';
    currentPlayer = 0;
  } else {
    tile.textContent = 'O';
    currentPlayer = 1;
  }
  checkWinner();
}

function checkWinner() {
  //derived from Albert's solution
  var winningMoves = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  // Cbas in class: use '.some' function instead of forEach
  winningMoves.forEach(function (winTiles) {
    findWinMoveInMoves(winTiles[0], winTiles[1], winTiles[2]);
  });
  if (movesMade[1] !== '' && movesMade[2] !== '' && movesMade[3] !== '' && movesMade[4] !== '' && movesMade[5] !== '' && movesMade[6] !== '' && movesMade[7] !== '' && movesMade[8] !== '' && movesMade[0] !== '') {
    console.log('Stalemate');
    promptNewGame();
  }
}

function findWinMoveInMoves(winTile1, winTile2, winTile3) {
  movesMade = Array.from(document.getElementsByClassName('t3box')).map(function (tile) {
    return tile.textContent;
  });
  // if any of the winning move tiles are empty, stop function, because winningMove has not been played
  if (movesMade[winTile1] === '' || movesMade[winTile2] === '' || movesMade[winTile3] === '') {
    return;
    // search movesMade; if the winTiles all have the same value declare a winner
  } else if (movesMade[winTile1] === movesMade[winTile2] && movesMade[winTile1] === movesMade[winTile3]) {
      winner = currentPlayer ? currentPlayer - 1 : currentPlayer + 1;
      console.log('Winner: ' + (winner ? 'X' : 'O'));
      promptNewGame();
    }
}

function promptNewGame() {
  gameboard.removeEventListener('click', runGame);
  setTimeout(function () {
    var startNewGame = window.confirm('Start a New Game?');
    if (startNewGame) {
      resetGame();console.log('starting new game');
    } else {
      window.alert('Are you not entertained?!');
    }
  }, 750);
}

function resetGame() {
  winner = '';
  currentPlayer = 1;
  Array.from(document.getElementsByClassName('t3box')).forEach(function (tile) {
    tile.innerHTML = '';
  });
  gameboard.addEventListener('click', runGame);
}

gameboard.addEventListener('click', runGame);

},{}]},{},[1]);
