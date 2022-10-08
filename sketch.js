var trex, trexRunning, trexCollided;
var ground, groundImage;
var invisibleGround;
var cloud, cloudImage, cloudsGroup;
var obstacle, obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;
var score = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload() {
  //you have load images, animations, sound  
  groundImage = loadImage("ground2.png");

  trexRunning = loadAnimation("trex1.png", "trex3.png", "trex4.png");

  cloudImage = loadImage("cloud.png");

  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
}

function setup() {
  createCanvas(600, 200);

  //create the sprite, apply the animations, scale, velocity

  ground = createSprite(300, 180, 600, 20); //1
  ground.addImage(groundImage);
  ground.velocityX = -9;
  ground.x = ground.width / 2;

  trex = createSprite(50, 160, 7, 7); //2
  trex.addAnimation("running", trexRunning);
  trex.scale = 0.5;
  trex.debug=true;
  //trex.setCollider("circle",0,0,50);

  invisibleGround = createSprite(300, 190, 600, 10); //3
  invisibleGround.visible = false;

  obstaclesGroup = new Group();

  cloudsGroup = new Group();
}

function draw() {
  background(150, 150, 150);

  textSize(20);
  fill("white");
  text("Score: " + score, 450, 50);

  if (gameState == PLAY) {
    score = score + Math.round(frameCount / 60);

    ground.velocityX = -9

    if (ground.x < 100) {
      ground.x = ground.width / 2;
    }

    //jump the trex when space pressed
    if (keyDown("space") && trex.y >= 150) {
      trex.velocityY = -12;
    }

    trex.velocityY = trex.velocityY + 0.9;

    spawnClouds();

    spawnObstacle();

    if (obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  } else if (gameState == END) {
    ground.velocityX = 0
    cloudsGroup.setVelocityXEach(0);
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setLifetimeEach(-1);
    obstaclesGroup.setLifetimeEach(-1);
  }

  //console.log(Math.round(random(20,100)));

  trex.collide(invisibleGround);
  drawSprites();
}

function spawnClouds() {
  if (frameCount % 60 == 0) {
    cloud = createSprite(600, 30, 5, 5);
    cloud.y = Math.round(random(10, 70));
    cloud.addImage(cloudImage);
    cloud.velocityX = -5;

    trex.depth = cloud.depth;
    trex.depth += 1;
    cloud.scale = 0.5;
    cloud.lifetime = 200;

    cloudsGroup.add(cloud);
    
  }
}

function spawnObstacle() {
  if (frameCount % 60 == 0) {
    obstacle = createSprite(600, 170, 5, 5);
    obstacle.velocityX = -9;

    var rand = Math.round(random(1, 6));
    switch (rand) {
      case 1:
        obstacle.addImage(obstacle1);
        break;
      case 2:
        obstacle.addImage(obstacle2);
        break;
      case 3:
        obstacle.addImage(obstacle3);
        break
      case 4:
        obstacle.addImage(obstacle4);
        break;
      case 5:
        obstacle.addImage(obstacle5);
        break;
      case 6:
        obstacle.addImage(obstacle6);
        break;
      default:
        break;
    }
    obstacle.scale = 0.5;
    obstacle.lifetime = -1;

    obstaclesGroup.add(obstacle);
  }
}