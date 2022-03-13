var towerImg, tower;
var doorImg, doorsGroup;
var climberImg, climbersGroup;
var ghost, ghostImg;
var gameState = "end";
var invisGroup;



function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 1;


  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale=0.35
  
  //spookySound.loop();

  invisGroup=new Group();

  climbersGroup=new Group();

  doorsGroup=new Group();

  //ghost.debug=true

  ghost.setCollider("circle",0,0,135)
}

function draw() {
  background(200);

  
  
 
  if(gameState==="play"){


    //Controls of the ghost
    if(keyDown(RIGHT_ARROW)){
      ghost.x+=7
    }
    if(keyDown(LEFT_ARROW)){
      ghost.x-=7
    }
    if(keyDown("space")){
      ghost.velocityY=-4

    }

    //Gravity
    ghost.velocityY=ghost.velocityY+0.3


    //Infinite world
    if(tower.y > 400){
        tower.y = 300
    }
    if(frameCount%240==0){
      var door = createSprite(random(110,width-110),-50)
      door.addImage(doorImg);
      door.scale=0.8;
      door.velocityY=1;
      doorsGroup.add(door);
      
      var climber= createSprite(door.x,0);
      climber.velocityY=1;
      climber.addImage(climberImg);
      climber.scale=0.5;

      climbersGroup.add(climber);
      
      door.depth=ghost.depth
      ghost.depth+=1;
      
      var invis= createSprite(climber.x,5,climber.width/2,5)
      invis.velocityY=1;
      
      invisGroup.add(invis);
      
      //climber.debug=true
      invis.visible=false;
    }
    if(ghost.isTouching(invisGroup)){
      gameState="end"

    }
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY=0


    }

  }

  else{

    ghost.visible=false;
    tower.visible=false;
    //door.visible=false;
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    background("black");
    stroke("red")
    
    fill("white")
    textSize(50);
    text("Game Over",150,300);

    

  }
    drawSprites();
}



