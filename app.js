
const canvas = document.querySelector('canvas');
let p = canvas.getContext('2d');
let id = 0;
canvas.height=360;
canvas.width=1000;
p.strokeStyle = 'grey';
let gravity = 0.08;
let cactus = [{},{},{},{}];
let gameOn = false;

let gameSpeed = 14;



function rnd(max, min){
return Math.round((Math.random() * (max - min) + min));
}



function loadCactus(cactus, index) {


if (index%2 !== 0) {cactus.exists = rnd(1,0); } else { cactus.exists = 1; }
cactus.x = 1000 + rnd(250 + index*250, index*250);
cactus.y = 290;
cactus.type = rnd(3,1);
cactus.height = 70;
cactus.width = 40;
if(cactus.type === 1) { cactus.y = 325; cactus.height = 35; } 
if(cactus.type === 3) {cactus.width = 65; cactus.height = 60; cactus.y = 300; }


}


function drawCactus() {


for (let i=0; i <=3; i++) {
cactus[i].x-= gameSpeed;
if(cactus[i].x + cactus[i].width < 0) { loadCactus(cactus[i],i); }
if (cactus[i].exists === 1) {
p.fillStyle = 'green';
p.fillRect(cactus[i].x,cactus[i].y,cactus[i].width,cactus[i].height);
}

}



}

function drawDino() {
p.fillStyle = 'red';
calculateDinoY();
p.fillRect(dino.x,dino.y,dino.width,dino.height);
}

function calculateDinoY() {


if (dino.y <= dino.jumpMax) {dino.jumping = false; dino.falling = true}
if (dino.jumping === false && dino.falling === false) {return;}
if (dino.jumping === true && dino.falling === false) {dino.y-= dino.speed + dino.y*gravity;}
else {dino.y+= dino.y*gravity;}
if (dino.y >= 310) {dino.y = 310; dino.jumping = false; dino.falling = false} 


}

let dino = {

x: 150,
y: 310,
height: 50,
width: 20,
jumping: false,
falling: false,
speed: 0.5,
jumpMax: 0

}
let score = 0;
let hiScore = 0;
p.font = "30px sans-serif";
p.fillText("press anything",200,200);
function gameLoop() {
score++;
p.clearRect(0,0,1000,400);
p.font = "30px sans-serif";
p.fillText(score,800,40);
p.font = "15px sans-serif";
p.fillText(hiScore,800,65); 
drawDino();
drawCactus();
if (score%401 === 0) {  if(gameSpeed < 24) {gameSpeed+=1;}  }


id = window.requestAnimationFrame(gameLoop);
if(collision()) {cancelAnimationFrame(id); gameOn = false;}
}


function collision() {

for (let i=0; i <=3; i++) {

let test = (cactus[i].exists === 1) &&  (dino.x + dino.width  > cactus[i].x) && (dino.x  < cactus[i].x + cactus[i].width) && (dino.y + dino.height > cactus[i].y + 2) ;  

if (test) {return true;}


}

return false;

}


function start() { 

for (let i=0; i <=3; i++) {

loadCactus(cactus[i],i);

}

dino.x = 150;
dino.y = 310;
dino.jumping = false;
dino.falling = false;
if (score >= hiScore) {hiScore = score;}
score = 0;
gameOn = true;
gameSpeed = 14;
id = 0;
id = window.requestAnimationFrame(gameLoop);
}


document.addEventListener('keydown', controller);
document.addEventListener('keyup', controller);


function controller(e) {

if( e.type ==='keydown' && gameOn === false) {start();} else {


if (e.type ==='keydown' && dino.jumping === false && dino.falling === false) {

dino.jumpMax = 95;
dino.jumping = true;

} 




if (e.type ==='keyup') {

if(dino.y >= 180) { dino.jumpMax = 180; }
}


}


} 