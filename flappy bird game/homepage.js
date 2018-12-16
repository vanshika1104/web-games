var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


//loading images

var bird = new Image();
var bg = new Image(288, 512);
var fg = new Image();
var pipeNorth = new Image();
var pipeSouth = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
pipeNorth.src = "images/p1.png";
pipeSouth.src = "images/p2.png";

function start()
{
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(bird, 130, 100);
	ctx.drawImage(pipeNorth, 15, 0);
	ctx.drawImage(pipeNorth, 200, -50);
	ctx.drawImage(pipeSouth, 15, 300);
	ctx.drawImage(pipeSouth, 200, 250);
	ctx.drawImage(fg, 0, cvs.height-fg.height);
	requestAnimationFrame(start);
	
}
function begin()
{
location.assign("game.html");
}
start();