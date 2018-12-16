
var player1color = "rgb(81, 134, 219)";

var player2color = "rgb(219, 63, 79)"



var cols = [];
cols.push($(".circle.1"));
cols.push($(".circle.2"));
cols.push($(".circle.3"));
cols.push($(".circle.4"));
cols.push($(".circle.5"));
cols.push($(".circle.6"));
cols.push($(".circle.7"));
cols.push($(".circle.8"));
var players = [];

$('.start').click(function(){
    var player1 = $(".player1");
    var player2 = $(".player2");
    players.push(player1.val());
    players.push(player2.val());
    $('form').css('display','none');
    
    $('h4').text(players[0]+" your turn,Enter your chip.");
    
var toprow = $(".circle.top");
toprow.click(function(){
             if($('h4').text() == players[1]+" your turn,Enter your chip.")
                $('h4').text(players[0]+" your turn,Enter your chip.");
                
            else if($('h4').text() == players[0]+" your turn,Enter your chip.")
                $('h4').text(players[1]+" your turn,Enter your chip.");
             })

function setColor(){
    var color = "";
    if($('h4').text() == players[0]+" your turn,Enter your chip.")
        color = player2color;
    else if($('h4').text() == players[1]+" your turn,Enter your chip.")
        color = player1color;
    return color;
}

function play(a){
    col = setColor();
    
    for(i = (cols[a].length-1); i >= 0; i--){
        if(cols[a].eq(i).css('background-color') == "rgb(169, 169, 169)"){
            cols[a].eq(i).css('background-color',col);
            if (vertical() || horizontal() || diagonal()){                 
                for(m = 0; m < cols.length; m++)                    
                    cols[m].eq(0).prop('disabled',true);                 
                                 
                if(col == player1color)
                   $('h1').text(players[0]+" you have won!") 
                else if(col == player2color)
                   $('h1').text(players[1]+" you have won!") 
                
                $('h4').fadeOut('fast');
                $('h3').fadeOut('fast');
                $('.over').css('display','block');
                $('.reload').css('display','block');
                $(".reload").click(function(){
                    location.reload();
                })
                $(".close").click(function(){
                   $('.endgame').css('display','none'); 
                })  
            }
            break;
        }
    }
}

cols[0].eq(0).click(function(){
    play(0);
})
cols[1].eq(0).click(function(){
    play(1);
})
cols[2].eq(0).click(function(){
    play(2);
})
cols[3].eq(0).click(function(){
    play(3);
})
cols[4].eq(0).click(function(){
    play(4);
})
cols[5].eq(0).click(function(){
    play(5);
})
cols[6].eq(0).click(function(){
    play(6);
})
cols[7].eq(0).click(function(){
    play(7);
})

function reportColor(row,colm){
    return cols[colm].eq(row).css('background-color');}

function vertical(){
   for (i = 0; i < cols.length; i++){
       for(j = 0; j < 3; j++){
           if((reportColor(j,i) == reportColor(j+1,i)) &&(reportColor(j,i) == reportColor(j+2,i)) &&(reportColor(j,i) == reportColor(j+3,i)) && reportColor(j,i) != "rgb(169, 169, 169)"){
               console.log("Verical win!");
               return true;
           }
           else
               continue;
       }
   } 
}

function horizontal(){
    for(i = 0; i < 6; i++){
        for(j = 0; j < 5; j++){
            if((reportColor(i,j) == reportColor(i,j+1)) && (reportColor(i,j) == reportColor(i,j+2)) && (reportColor(i,j) == reportColor(i,j+3)) && reportColor(i,j) != "rgb(169, 169, 169)"){
                console.log("horizontal win!");
                return true;
            }
            else
                continue;
        }
    }
}

function diagonal(){
    for(n = 0; n < 3; n++){
        for(k = 0; k < 5; k++){
            if((reportColor(n,k) == reportColor(n+1,k+1)) && (reportColor(n,k) == reportColor(n+2,k+2)) && (reportColor(n,k) == reportColor(n+3,k+3)) && (reportColor(n,k) != "rgb(169, 169, 169)")){
                console.log("Diagonal down win!");
                return true;
            }
            else if((reportColor(5-n,k) == reportColor(5-n-1,k+1)) && (reportColor(5-n,k) == reportColor(5-n-2,k+2)) && (reportColor(5-n,k) == reportColor(5-n-3,k+3)) && (reportColor(5-n,k) != "rgb(169, 169, 169)")){
                console.log("Diagonal up win!");
                return true;
            }
            else
                continue;
        }
    }
}
})

