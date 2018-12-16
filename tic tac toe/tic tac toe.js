var origBoard;
const huPlayer = '0';
const aiPlayer = 'X';
const winCombos = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
const cells = document.querySelectorAll(".cell");

//loading audio files
var playing = new Audio();
var tie = new Audio();
var win = new Audio();
var lose = new Audio();

playing.src = "sounds/play.mp3";
tie.src = "sounds/tiegame.mp3";
win.src = "sounds/you win.mp3";
lose.src = "sounds/you lose.mp3";

start();
function start() {
    document.querySelector(".endgame").style.display = "none";
    origBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    for (i = 0; i < cells.length; i++) {
            cells[i].innerText = '';
            cells[i].style.removeProperty('background-color');
            cells[i].addEventListener("click", turnClick);
        }
}

function turnClick(block) {
    if (typeof origBoard[block.target.id] ==  'number') {
        turn(block.target.id, huPlayer);
    if (emptySquares().length !=  0 )
        turn(bestSpot(origBoard, huPlayer), aiPlayer);
     else
         checkTie();
    }
}

function turn(blockId, player) {
    origBoard[blockId] = player;
    document.getElementById(blockId).innerText = player;
    playing.play();
    let gameWon = checkWon(origBoard, player);
    if (gameWon)
            gameOver(gameWon);
}

function playsMade(board, player) {
    var play = [];
    for (i = 0; i < board.length; i++) {
            if (board[i] === player)
                    play.push(i);
        }
    return play;
}

function checkWon(board, player) {
    gameWon = null;
    plays = playsMade(board, player);
    for (i = 0; i < winCombos.length; i++) {   
        var count = 0;
            for (j = 0; j < winCombos[i].length; j++) {   
                    if (plays.includes(winCombos[i][j]))
                         count +=  1;   
                }
         if (count ==  3) {
                 gameWon = {index: i, player: player};
                 break;
             }
        }
    return gameWon;
}

function gameOver(gameWon) {
    for (i = 0; i < winCombos.length; i++ ) {
            if (i ==  gameWon.index) {   
                    status = 1;
                    for (j = 0; j < winCombos[i].length; j++)
                           document.getElementById(winCombos[i][j]).style.backgroundColor = gameWon.player ==  huPlayer ? "deeppink" : "orangered";  
                }
            else 
                status = 0;
            
            if (status ==  1)
                break;
        }
    
    for (j = 0; j<cells.length; j++)
            cells[j].removeEventListener("click", turnClick);
    declareWinner(gameWon.player ==  huPlayer ? "You Win!" : "You Lose!");
}

function emptySquares() {   
    var result = [];
    for (i = 0; i < origBoard.length; i++) {
            if (typeof origBoard[i] ==  'number')
                result.push(origBoard[i])
        }
    return result;
}

function checkTie() {   
    g1 = checkWon(origBoard, huPlayer);
    g2 = checkWon(origBoard, aiPlayer);
    if (g1 ==  null && g2 ==  null) {
            for (i = 0; i < cells.length; i++) {
                    cells[i].style.backgroundColor = 'lawngreen';
                    cells[i].removeEventListener('click', turnClick);
                }
            declareWinner("Tie game!");
        }  
}

function declareWinner(who) {
    document.querySelector(".endgame").style.display = "block";
    document.querySelector(".endgame .text").innerText = who;
    if(who == "Tie game!")
    tie.play();
    else if (who == "You Win!")
        win.play();
    else if (who == "You Lose!")
        lose.play();
}

function decide(board, arr)
{
   for (i = 0; i < winCombos.length; i++) {   
            var count = 0;
            for (j = 0; j < winCombos[i].length; j++ ) {   
                    if (arr.includes(winCombos[i][j]))
                         count +=  1; 
                    else if (typeof board[winCombos[i][j]] ==  "number")
                        s = winCombos[i][j];
                    else if (typeof board[winCombos[i][j]] ==  "string")
                        s = null; 
                }
         if (count ==  2 && s != null) {   
                 status = false;
                 return s;
             }
         else 
         status = true;
}
    if (status)
        return true;
}

function bestSpot(board, player) {
    plays = playsMade(board, huPlayer);
    plays2 = playsMade(board, aiPlayer);
    if (typeof decide(board, plays2) == "number") 
        return decide(board, plays2);
    else if (typeof decide(board, plays) == "number")
            return decide(board, plays);
    else  
        return emptySquares()[0];
}
   