var backgroundImg;
var bat_left,bat_right;
var leftBatGroup,rightBatGroup;
var leftZ2Group,leftZ3Group;
var rightZ2Group,rightZ3Group;
var LZ2,LZ3;
var RZ2,RZ3;
var leftZ2,leftZ3;
var rightZ2,rightZ3;
var bullet_LImg,bullet_RImg;
var shooter,shooterImg;
var start,startImg;
var WAIT = 0;
var PLAY = 1;
var END = 2;
var gameState = WAIT;
var gun1;
var gun1Img,gun1Img2;
var score=0;
var lives = 3;
var gameOverSound,shootSound,WinSound,zombieSoundp;
var gameOverImg,restartImg,tryAgainImg,winImg;
var gameOver,restart,tryAgain,Win;

function preload(){
backgroundImg = loadImage("backGround.png");

bat_left = loadAnimation("BatFlying/left_bat(1).png","BatFlying/left_bat(2).png");
bat_right = loadAnimation("BatFlying/right_bat(1).png","BatFlying/right_bat(2).png");
startImg = loadImage("start.png");
shooterImg = loadImage("player.png");
bullet_LImg = loadImage("bulletLeft.png");
bullet_RImg = loadImage("bulletRight.png");

LZ2 = loadAnimation("LZombie/L_zombie2.png","LZombie/L_zombie2.1.png");
LZ3 = loadAnimation("LZombie/L_zombie3.png","LZombie/L_zombie3.1.png","LZombie/L_zombie3.2.png");

RZ2 = loadAnimation("RZombie/R_zombie2.png","RZombie/R_zombie2.1.png");
RZ3 = loadAnimation("RZombie/R_zombie3.png","RZombie/R_zombie3.1.png","RZombie/R_zombie3.2.png");

gun1Img = loadImage("guns/gun image 1 (2).png");
gun1Img2 = loadImage("guns/gun image 1.png");

gameOverSound = loadSound("sounds/GameOver.wav");
shootSound = loadSound("sounds/Shooting.mp3");
WinSound = loadSound("sounds/YouWin.mp3");
zombieSound = loadSound("sounds/Zombie.mp3");


gameOverImg = loadImage("Images/GameOver.png");
winImg = loadImage("Images/YouWin.jpg");
restartImg = loadImage("Images/Restart.png");
tryAgainImg = loadImage("Images/tryAgain.png");
}

function setup(){
createCanvas(windowWidth,windowHeight);

shooter = createSprite(width/2,height -250,75,150);
shooter.addImage(shooterImg);
shooter.scale=0.05;
shooter.visible =false;

start = createSprite(width/2,height/2,40,10);
start.addImage(startImg);

gun1 = createSprite(width/2 + 50,height -290, 50,20);
gun1.addImage("rightside1", gun1Img);
gun1.addImage("leftside1", gun1Img2);
gun1.scale = 0.3;
gun1.visible = false;

gameOver = createSprite(width/2,height/2-150,50,50);
gameOver.addImage(gameOverImg);
gameOver.visible=false;

restart = createSprite(width/2,height/2);
restart.addImage(restartImg);
restart.visible=false;

Win = createSprite(width/2,height/2+220,50,50);
Win.addImage(winImg);
Win.visible=false;
Win.scale=2;

tryAgain = createSprite(width/2,height/2+220,50,50);
tryAgain.addImage(tryAgainImg);
tryAgain.visible=false;
tryAgain.scale=2;

leftBatGroup=new Group();
rightBatGroup = new Group();

leftZ2Group = new Group();
leftZ3Group = new Group();

rightZ2Group = new Group();
rightZ3Group = new Group();

rightBGroup = new Group();
leftBGroup = new Group();
}

function draw(){
   background("lightblue");

   gameOver.visible=false;
   restart.visible=false;
   Win.visible=false;
   tryAgain.visible=false;

   fill("red");
   textSize(30);
   text("CITY FIGHTER", width/2-100, 200);

   fill("green");
   textSize(32);
   text("Kill Yellow Zombie to earn '10' points",width/2-250,250);
   text("Kill Black & White Zombie to earn '15' points",width/2-310,300);

   fill("red");
   textSize(45);
   text("Instructions to play the game:",width/2-290,height/2+100);

   fill("blue");
   textSize(30);
   text("1. Press left arrow key to shift the gun to your left & shoot",width/2-365,height/2+150)
   text("2. Press right arrow key to shift the gun to your right & shoot",width/2-365,height/2+200)

  
   if(mousePressedOver(start)){
      gameState = PLAY;
   }


if(gameState === PLAY){
   background(backgroundImg);

   fill("yellow");
   text("SCORE: " + score, windowWidth-230,windowHeight-1000);

   fill("red");
   text("LIVES: " + lives, windowWidth - 1800, windowHeight - 1000);

   shooter.visible=true;
   start.visible=false;
   gun1.visible = true;

   if(keyDown("LEFT_ARROW")){
      gun1.x = width/2 - 50;
      gun1.changeImage("leftside1");
         shootleft();
         shootSound.play();
 }
   
   if(keyDown("RIGHT_ARROW")){
      gun1.x = width/2 + 50;
      gun1.changeImage("rightside1");
      shootright();
      shootSound.play();
   }

   spawnBats();
   spawnLeftZombie();
   spawnRightZombie();

   if(leftBGroup.isTouching(leftZ2Group)){
      score = score+10;
      leftBGroup.destroyEach();
      leftZ2Group.destroyEach();
      zombieSound.play();
   }
   
   if(rightBGroup.isTouching(rightZ2Group)){
      score = score+10;
      rightBGroup.destroyEach();
      rightZ2Group.destroyEach();
      zombieSound.play();
   }
   
   if(leftBGroup.isTouching(leftZ3Group)){
      score = score + 15;
      leftBGroup.destroyEach();
      leftZ3Group.destroyEach();
      zombieSound.play();
   }

   if(rightBGroup.isTouching(rightZ3Group)){
      score = score + 15;
      rightBGroup.destroyEach();
      rightZ3Group.destroyEach();
      zombieSound.play();
   }

   if(leftZ2Group.isTouching(shooter)){
         lives = lives - 1;
         leftZ2Group.destroyEach();
   }

   if(leftZ3Group.isTouching(shooter)){
      lives = lives - 1;
      leftZ3Group.destroyEach();
}

if(rightZ2Group.isTouching(shooter)){
   lives = lives - 1;
   rightZ2Group.destroyEach();
}

if(rightZ3Group.isTouching(shooter)){
   lives = lives - 1;
   rightZ3Group.destroyEach();
}

   if(lives === 0){
      gameState = END;
      gameOverSound.play();
   }

   if(score >= 150){
      gameState = END;
      WinSound.play();
   }

  }

if(gameState === END){
   background("blue");

   if(lives === 0){
      tryAgain.visible=true;
   }

   if(score >= 150){
      Win.visible=true;
   }

   if(mousePressedOver(restart)){
      reset();
   }

   leftZ2Group.destroyEach();
   leftZ3Group.destroyEach();
   rightZ2Group.destroyEach();
   rightZ3Group.destroyEach();
   leftBatGroup.destroyEach();
   rightBatGroup.destroyEach();
   leftBGroup.destroyEach();
   rightBGroup.destroyEach();
   shooter.visible=false;
   gun1.visible = false;
   restart.visible=true;
   gameOver.visible=true;
}
drawSprites();
}

function spawnBats(){
    if(frameCount%200 === 0){
       var leftBat = createSprite(0,height-200,30,10);
       leftBat.y=Math.round(random(50,250));
       leftBat.addAnimation("flying",bat_left);
       leftBat.velocityX=3;

       leftBat.scale=0.2
       leftBatGroup.add(leftBat);
    }

    if(frameCount%150 === 0){
        var rightBat = createSprite(width-50,height-200,30,10);
        rightBat.y=Math.round(random(50,250));
        rightBat.addAnimation("flyingRight",bat_right);
        rightBat.velocityX=-3;
 
        rightBat.scale=0.2
        rightBatGroup.add(rightBat);
     }
    
}

function spawnLeftZombie(){


   if(frameCount%250 === 0){
      var leftZ2= createSprite(-50,height-200,30,10);
      leftZ2.y=Math.round(random(height-220,height-300));
      leftZ2.addAnimation("moving2",LZ2);
      leftZ2.velocityX=1.8;

      leftZ2.scale=0.5
      leftZ2Group.add(leftZ2);
   }
   
   if(frameCount%350 === 0){
      var leftZ3= createSprite(-50,height-200,30,10);
      leftZ3.y=Math.round(random(height-220,height-300));
      leftZ3.addAnimation("moving3",LZ3);
      leftZ3.velocityX=1;
      
      leftZ3.scale=0.5
      leftZ3Group.add(leftZ3);
   }

}

function spawnRightZombie(){

   if(frameCount%200 === 0){
      var rightZ2= createSprite(width-50,height-200,30,10);
      rightZ2.y=Math.round(random(height-220,height-300));
      rightZ2.addAnimation("moving2",RZ2);
      rightZ2.velocityX=-1.3;
      
      rightZ2.scale=0.5
      rightZ2Group.add(rightZ2);
   }
   
   if(frameCount%300 === 0){
      var rightZ3= createSprite(width-50,height-200,30,10);
      rightZ3.y=Math.round(random(height-220,height-300));
      rightZ3.addAnimation("moving3",RZ3);
      rightZ3.velocityX=-3;
      
      rightZ3.scale=0.5
      rightZ3Group.add(rightZ3);
   }
}

function shootleft(){

   var bullet_Left= createSprite(width/2-90,height -290,10,10);
   bullet_Left.addImage("LeftBullet",bullet_LImg);
   bullet_Left.velocityX=-3;
   bullet_Left.scale=0.3
   bullet_Left.lifetime = -300;

   leftBGroup.add(bullet_Left);
}

function shootright(){

   var bullet_Right= createSprite(width/2+90,height-290,10,10);
   bullet_Right.addImage("RightBullet",bullet_RImg);
   bullet_Right.velocityX=+3;
   bullet_Right.scale=0.3
   bullet_Right.lifetime = 300;
   rightBGroup.add(bullet_Right);
}

function reset(){
   gameState = PLAY;
   score = 0;
   lives=3;
   rightBatGroup.destroyEach();
   leftBatGroup.destroyEach();
   rightBGroup.destroyEach();
   leftBGroup.destroyEach();
   leftZ2Group.destroyEach();
   rightZ2Group.destroyEach();
   leftZ3Group.destroyEach();
   rightZ3Group.destroyEach();
}
