//loading canvas and its data
var c = document.getElementById("canvas");
var cdata = c.getContext("2d");

//loading images
var bird = new Image();
var bg = new Image(288, 512);
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();
//setting path for the image objects
bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/p1.png";
pipeSouth.src = "images/p2.png";

//loading audios
var fly = new Audio();
var scoreIncrease = new Audio();
//setting path for audio objects
fly.src = "sounds/fly.mp3";
scoreIncrease.src = "sounds/score.mp3";

//declaring few required variables for this program
var bx = 10;
var by = 220;
var score = 0;
var check = true;

//pipe data for creating pipes
var pipe = [];
pipe[0] = {
    x : c.width,
    y : 0
}

//function to run the game 
function draw() 
{    
    cdata.drawImage(bg, 0, 0);
    for (var i = 0; i < pipe.length; i++)
        {
            cdata.drawImage(pipeNorth, pipe[i].x, pipe[i].y);
            cdata.drawImage(pipeSouth, pipe[i].x, pipe[i].y+320);  
            pipe[i].x--;
            if (pipe[i].x == 100)
                {
                    pipe.push(
                    {
                        x : c.width,
                        y : Math.floor(Math.random()*pipeNorth.height)-pipeNorth.height
                    });           
                }
            //detecting collision
            if (bx + bird.width >= pipe[i].x && bx <= pipe[i].x + pipeNorth.width 
               && (by <= pipe[i].y + pipeNorth.height || by + bird.height >= pipe[i].y+320) || by + bird.height >= c.height - fg.height 
               || by + bird.height < -5)
                {
                alert("Game over\nScore: "+score);
                    check = confirm("Do you want to play again?");
                    if (check)
                        {
                            location.reload();
                            return;
                        }
                    else
                        {
                            location.assign("index.html");
                            return;
                        }
                    
                }
            if (pipe[i].x == 5)
                {
                    score++;
                    scoreIncrease.play();
                }
            
        }
    
    //displaying score
    cdata.drawImage(fg, 0, c.height-fg.height);
    cdata.drawImage(bird,bx,by);
    by += 1.2;
    cdata.fillStyle = "#000";
    cdata.font = "20px Arial";
    cdata.fillText("Score : "+score,10,20);
    requestAnimationFrame(draw);
}

// for movement of bird on pressing key
document.addEventListener("keydown",moveUp);
c.addEventListener("click",moveUp);
function moveUp()
{   if (check)
    {
    by -= 20;
    fly.play();
    }
}

//calling function
draw();

