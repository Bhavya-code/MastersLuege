var SERVE = 0;
var PLAY = 1;
var END = 2;
var gameState = SERVE;

var bird,backGround,o1,o2,invBlock,gameOver,restart,start,invG,ivBlock,level2,door,family;
var birdImg,birdImg2,gameOverImg,o1Img,o2Img,backgroundImg,restartImg,startImg,doorImg,level2Img;
var obsticalGroup,invGroup,ivGroup;

function preload() {
  backgroundImg = loadImage("images/backGround.jpg");
  birdImg = loadImage("images/bird.png");
  birdImg2 = loadImage("images/bird3.png");
  //o1Img = loadImage("images/pipe1.png");
  //o2Img = loadImage("images/pipe2.png");
  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");
  startImg = loadImage("images/start.png");
  doorImg = loadImage("images/door.png");
  //level2Img = loadImage("images/level2.png");
}

function setup() {
  createCanvas(1000,500);

  backGround = createSprite(500,250);
  backGround.addImage(backgroundImg);
  backGround.velocityX=1;
  backGround.scale=4;

  bird = createSprite(200,200,10,10);
  bird.addImage(birdImg);
  bird.setCollider("rectangle",0,0,-150,200);
  bird.debug= false;
  bird.scale=0.2;

  start = createSprite(500,150);
  start.addImage(startImg);
  start.visible=true;

  invG = createSprite(500,500,1000,10);
  invG.visible=false;

  obsticalGroup = new Group();
  familyGroups = new Group();
  invGroup = new Group();
  
}

function draw() { 
  background(0);

  if( gameState === SERVE){

    backGround.velocityX=0;
    
    if(mousePressedOver(start)){
      start.visible=false;
      backGround.velocityX=1;
      gameState = PLAY;
      bird.x = 200;
      bird.y = 200;
    }
  }

  if( gameState === PLAY){

    if(backGround.x>600){
      backGround.x=300;
    }

    if(keyDown("space")&& bird.y >= 50) {
      bird.velocityY= -7;
    }

    //door.velocityX = -(2 + 2* (getFrameRate/100))

    //given gravity to bird
     bird.velocityY = bird.velocityY + 0.8

    bird.collide(invG);
  }
  
  if( gameState === END) {
    backGround.velocityX=0;
  }

  if(obsticalGroup.isTouching(bird)){
    obsticalGroup.destroyEach();
    obsticalGroup.visiable = false;
    gameState = END;

    gameOver = createSprite(520,250);
    gameOver.addImage(gameOverImg);

    restart = createSprite(520,350);
    restart.addImage(restartImg);
    restart.scale=0.3

    bird.changeImage(birdImg2);
  }

  if(mousePressedOver(restart)) {
    reset();
  }

  if(bird.isTouching(familyGroups) && gameState === END) {
    gameState=END;
    stroke("black");
    fill("red");
    textSize(20);
    text("you win the game",500,250);
  }

  doors();
  familys();

  drawSprites();

  if(gameState === SERVE){
    stroke("black");
    fill("blue");
    textSize(20);
    text("Rule: 1)If you touch any of the obstacle you will lose the game.",200,240);
    text("Rule: 2)If the player finds his family the player will win the game.",200,265);
  }
}

function reset() {
  gameState=SERVE;
  gameState.visible=true;
  gameOver.visible=false;
  restart.visible=false;
  start.visible=true;
  bird.x=200;
  bird.y=200;
  bird.velocityY=0;
}

function doors(){
  if (frameCount % 100 === 0 && gameState === PLAY) {
    door = createSprite(1000,120,40,10);
    door.y = Math.round(random(40,400));
    door.velocityX=-2;
    door.setCollider("rectangle",0,0,100,220);
    door.debug = false;
    door.addImage(doorImg);
    door.scale = 0.5;
    
    //assign lifetime to the variable
    door.lifetime = 600;
    
    //add each obstical to the group
    obsticalGroup.add(door);
  }
}

function familys() {
  if (frameCount % 20000 === 0 && gameState === PLAY) {
    family = createSprite(1000,120,40,80);
    family.y = Math.round(random(40,400));
    family.velocityX=-2;
    family.setCollider("rectangle",0,0,40,80);
    family.debug = true;

    familyGroups.add(family)
  }
}
