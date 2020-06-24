const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, dragon1,dragon3;
var backgroundImg,platform;
var prince, slingshot;

var gameState = "onSling";
var bg = "sprites/bg3.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Box(700,320,70,70);
    box2 = new Box(920,320,70,70);
    dragon1 = new dragon(810, 350);
    log1 = new Log(810,260,300, PI/2);

    box3 = new Box(700,240,70,70);
    box4 = new Box(920,240,70,70);
    dragon2 = new dragon(810, 220);
    log3 =  new Log(810,180,300, PI/2);

    box5 = new Box(700,160,70,70);
    box6 = new Box(920,160,70,70)
    dragon3 = new dragon(810,120);
    log4 = new Log(810,100,300, PI/2);

    prince = new Prince(200,50);

    slingshot = new SlingShot(prince.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    box1.display();
    box2.display();
    box3.display();
    box4.display();
    box5.display();
    box6.display();

    dragon1.display();
    dragon1.score();
    dragon2.display();
    dragon2.score();
    dragon3.display();
    dragon3.score();

    ground.display();

    log1.display();
    log3.display();
    log4.display();

    prince.display();
    platform.display();
    slingshot.display();
   ;    
}

function mouseDragged(){
        Matter.Body.setPosition(prince.body, {x: mouseX , y: mouseY});
    
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && prince.body.speed < 1  ){
       Matter.Body.setPosition(prince.body, {x: 200, y: 50});
       prince.trajectory = [];
       slingshot.attach(prince.body); 
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=0600 && hour<=1900){
        bg = "sprites/bg3.png";
    }
    else{
        bg = "sprites/bg3.png";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}