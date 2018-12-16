var player1 = prompt("Player one: enter your name you will be blue.");
var player1color = "rgb(81, 134, 219)";

var player2 = prompt("Player two: enter your name you will be red");
var player2color = "rgb(219, 63, 79)"

var game_on = true;
var table = $('table tr');

function reportWin(rowNum,colNum){
    console.log(rowNum);
    console.log(colNum);
}

function changeColor(rowIndex, colIndex, color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('backgroud-color',color);
}

function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('backgroud-color');
}

function checkBottom(colIndex){
    var colorReport = returnColor(5,colIndex);
    
    for (row = 5; row > -1; row--){
        colorReport = returnColor(row,colIndex);
        if(colorReport === "rgb(169, 169, 169)"){
            return row;
        }
    }
}

function colorMatch(one, two, three, four){
    return(one === two && one === three && one === four && one !== "rgb(169, 169, 169)" && one !== undefined);
}

function horizontalWinCheck(){
    for(row = 0; row < 6; row++){
        for(col = 0; col < 4; col++){
            if (colorMatch(returnColor(row,col),returnColor(row,col+1),returnColor(row,col+2),returnColor(row,col+3))){
                console.log("horizontal win");
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
            }
        }
    }

function verticalWinCheck(){
    for(col = 0; col < 7; col++){
        for(row = 0; row < 3; row++){
            if (colorMatch(returnColor(row,col),returnColor(row+1,col),returnColor(row+2,col),returnColor(row+3,col))){
                console.log("Vertical win");
                reportWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

function diagonalWinCheck(){
    for(col = 0; col < 5; col++){
        for(row = 0; row < 7; row++){
            if(colorMatch(returnColor(row,col),returnColor(row+1,col+1),returnColor(row+2,col+2),returnColor(row+3,col+3))){
                console.log("Diagonal down win!");
                reportWin(row,col);
                return true;
            }
            else if(colorMatch(returnColor(row,col),returnColor(row-1,col+1),returnColor(row-2,col+2),returnColor(row-3,col+3))){
                console.log("Diagonal up win!");
                reportWin(row,col);
                return true;
            }
            else {
                continue;
            }
        }
    }
}

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1color;

$('h4').text(player1+" your turn!");

$('.board button').on('click',function(){
    
    var coloumn = $(this).closest('td').index();
    
    var emptySpace = checkBottom(coloumn);
    
    changeColor(emptySpace,coloumn,currentColor);
    
    if(horizontalWinCheck || verticalWinCheck || diagonalWinCheck){
        $('h1').text(currentName+" You have won!");
    
        $('h2').fadeOut('fast');
        $('h4').fadeOut('fast');
        $('.over').css('display','block');
        $('.reload').css('display','block');
    }
    
    currentPlayer = currentPlayer*-1;
    
    if(currentPlayer === 1){
        currentName = player1;
        $('h4').text(currentName + " it is your turn!");
        currentColor = player1color;
    }
    else{
        currentName = player2;
        $('h4').text(currentName + " it is your turn!");
        currentColor = player2color;
    }
})