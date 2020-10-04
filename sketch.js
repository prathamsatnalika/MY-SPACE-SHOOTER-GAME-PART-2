
function preload() {
  
    spaceshipimg1 = loadImage('spaceship1.png');
    spaceshipimg2 = loadImage('spaceship2.png');
    spaceshipimg3 = loadImage('spaceship3.png');
    spaceshipimg4 = loadImage('spaceship4.png');

    playerspaceshipimg = loadImage('player.jpg');

    rightbuttonimg = loadImage('buttonright.jpg');
    leftbuttonimg = loadImage('buttonleft.jpg');

    asteroidsimg = loadImage('asteroid.png');
    rock_img = loadImage('spacerock.png')
    
    blastimg = loadImage('blast.png');

    backgroundimg = loadImage('spacebackground.png');

    fireupimg = loadImage('spacefiredown.png');
    firedownimg = loadImage('spacefireup.png');

    home_backgroundimg = loadImage('splash.png');

    logoimg = loadImage('bg.png');

    INSTRUCTION_BACKGROUND = loadImage('bg.jpg');

    livesimg = loadImage('lives.png');

    buttonimg = loadImage('Picture1.png');

    planetimg = loadImage('Picture2.png');

    gameoversound = loadSound('gameover.mp3');

    INSTRUCTION_IMG = loadImage('unnamed.png');
    

}

function setup() {
  createCanvas(windowWidth,windowHeight);

  bg = createSprite(width/2,height/2,20,20);
  bg.visible = false;
  bg.addImage(backgroundimg);
  bg.scale = 2;
  bg.velocityY = 20;

  enemyGroup = new Group();
  playerBulletGroup = new Group();
  planetGroup = new Group();
  
  asteroidsGrp = new Group();

  player = createSprite(width-100,height-100,50,50);
  player.addImage(playerspaceshipimg);
  player.scale = 0.2;

  player_Lifes = 10;
  player_Friend_Life = 10;

  computerplayer = createSprite(width-1400,height-100,50,50);
  computerplayer.addImage(playerspaceshipimg);
  computerplayer.scale = 0.2;

  PLAY_BUTTON = createSprite(width/1.7,height-300,130,70);
  PLAY_BUTTON.addImage(buttonimg);
  PLAY_BUTTON.scale = 0.7;

  INSTRUCTION = createSprite(width/2.3,height-300,50,50);
  INSTRUCTION.addImage(buttonimg);
  INSTRUCTION.scale = 0.7;

  INSTRUCTION_WORD = createSprite(width/2,height-height/1.3,20,20);
  INSTRUCTION_WORD.addImage(INSTRUCTION_IMG);
  INSTRUCTION_WORD.visible = false;

  computerplayer.visible = false;
  player.visible = false;

  GAMESTATE = 0;
  HOME = 0;
  PLAY = 2;
  RESTART = 3;
  play_INSTRUCTION = 4;

  logo = createSprite(width/2,height-500,20,20);
  logo.addImage(logoimg);
  logo.scale = 0.8;
  logo.visible = false;

}

function draw() {
  
   createEdgeSprites()

  if(mousePressedOver(INSTRUCTION)) {
    GAMESTATE = 4
  }

  if(GAMESTATE === play_INSTRUCTION) {
    background(INSTRUCTION_BACKGROUND);
    logo.visible = false;
    PLAY_BUTTON.visible = false;
    INSTRUCTION.visible = false;
    INSTRUCTION_WORD.visible = true;

    INSTRUCTION_WORD.scale = 1.3;

    textSize(25)
    textStyle(BOLDITALIC);
    fill("yellow")
    text("THANK U FOR INSTALLING SPACE HARRIER. TO PLAY THIS GAME TWO ARROW KEYS ARE PROVIDED",width/8.7,height-height/1.5);
    text("AS SHOWN OVER HERE AND IF U ARE PLAYING IN PC YOU CAN JUST USE YOUR ARROW KEYS",width/5.3,height-height/1.7);

     var DEMO_LEFTARROWKEY = createSprite(width/8.4,height-height/1.7)
     DEMO_LEFTARROWKEY.addImage(leftbuttonimg);
     DEMO_LEFTARROWKEY.scale = 0.2;

     var demo_rightARRWOKEY = createSprite(width/6,height-height/1.7);
     demo_rightARRWOKEY.addImage(rightbuttonimg);
     demo_rightARRWOKEY.scale =0.2

  }

  if(mousePressedOver(PLAY_BUTTON)) {
    GAMESTATE = PLAY;
    PLAY_BUTTON.visible = false;
  }

  if(mouseIsOver(INSTRUCTION)) {
    INSTRUCTION.scale = 0.8
  } else{
    INSTRUCTION.scale = 0.7
  }

  if(GAMESTATE === HOME) {
    background(home_backgroundimg);
  

    logo.visible = true;

 

    if(mouseIsOver(PLAY_BUTTON)) {
         PLAY_BUTTON.scale = 0.8
    } else{
      PLAY_BUTTON.scale = 0.7
    }
  }

  if(GAMESTATE === PLAY) {
    background(backgroundimg); 

    spawnSpaceShip();
    spawnBullet();
    spawnPlanets();
    spawnAsteroids();

    INSTRUCTION.visible = false;

    //if()

    bg.visible = true;
    
    /*player.depth > bg.depth;
    computerplayer.depth > bg.depth;*/

    player.visible = true;
    computerplayer.visible = true;

    logo.visible = false;

    //console.log(bg.y)

    if(bg.y > 1600) {
      bg.y = -10;
    }

  if(keyDown(RIGHT_ARROW)) {
     player.x = player.x + 25;
  }

  if(player_Lifes === 10) {
    for (var i = 50; i < 550; i=i+50) 
       {
            var lives = createSprite(i, 50, 20, 20);
            lives.addImage(livesimg);
            lives.scale = 0.1;
            lives.depth > enemyGroup.depth;
       }
  }else if(player_Lifes === 9) {
    for (var i = 50; i < 500; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }

  }else if(player_Lifes === 8) {
    for (var i = 50; i < 450; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }
  }else if(player_Lifes === 7) {
    for (var i = 50; i < 400; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }   
  }else if(player_Lifes === 6) {
    for (var i = 50; i < 350; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }
  }else if(player_Lifes === 5) {
    for (var i = 50; i < 300; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }
  }else if(player_Lifes === 4) {
    for (var i = 50; i < 250; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }  
  }else if(player_Lifes === 3) {
    for (var i = 50; i < 200; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }
  }else if(player_Lifes === 2) {
    for (var i = 50; i < 150; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }
  } else {
    for (var i = 50; i < 100; i=i+50) 
    {
         var lives = createSprite(i, 50, 20, 20);
         lives.addImage(livesimg);
         lives.scale = 0.1;
         lives.depth > enemyGroup.depth;
    }
  }

  if(keyDown(LEFT_ARROW)) {
    player.x = player.x - 25
  }

  if(keyDown(ENTER) && frameCount % 5 === 0) {
    spawnPlayerBullet()
  }

  if(playerBulletGroup.isTouching(enemyGroup)) {
     enemyGroup.destroyEach();
  }

 }

drawSprites();

      if(GAMESTATE === HOME) {
        fill(" dark blue");
        textSize(28);
        textFont('Georgia');
        text("PLAY",PLAY_BUTTON.x-27,PLAY_BUTTON.y+7);
        textSize(20)
        text("INSTRUCTIONS",INSTRUCTION.x-72,INSTRUCTION.y+4);
      }

}


 function spawnSpaceShip() {
    if(frameCount % 100 === 0) {
      var enemy = createSprite(width/2,height-height,10,40);
          enemy.x = Math.round(random(width/0.5,3.3))

      var rand = Math.round(random(1,4));
      switch(rand) {
        case 1: enemy.addImage(spaceshipimg1);
                enemy.scale = 0.3
                break;
        case 2: enemy.addImage(spaceshipimg2);
                enemy.scale = 0.150
                break;
        case 3: enemy.addImage(spaceshipimg3);
                enemy.scale = 0.5
                break;
        case 4: enemy.addImage(spaceshipimg4);
                enemy.scale = 0.450
                break;
        default: break;
      }
      enemy.velocityY = 20;
      enemy.lifetime = 30;
      enemyGroup.add(enemy);

    }
    }

    function spawnBullet() {
      if(frameCount % 80 === 0) {
        var bullet = createSprite(Math.round(random(width/0.5,3.3)),height-height-30,20,20);
        bullet.addImage(firedownimg);
        bullet.velocityY = 20;
        bullet.scale = 0.050
        bullet.lifetime = 50;
      }
    }

    function spawnPlanets() {
      if(frameCount % 370 === 0) {
        var planet = createSprite(width/6,-300,20,20);
        planet.addImage(planetimg);
        planet.velocityY = 15;
        planet.scale = 3;
        planet.depth = player.depth;
        player.depth = player.depth+1;
        player.depth = computerplayer.depth;
        planet.lifetime = 300;
        planetGroup.add(planet);
      }
    }

    function spawnPlayerBullet() {
      var playerbullet = createSprite(player.x,player.y,10,10);
      playerbullet.addImage(firedownimg);
      playerbullet.scale = 0.050;
      playerbullet.depth < player.depth;
      playerbullet.velocityY = -15;
      playerbullet.lifetime = 80;
      playerBulletGroup.add(playerbullet);
    }

    function spawnAsteroids() {
      if(frameCount % 100 === 0) {
         var asteroid = createSprite(Math.round(random(width/0.3,width/3.2)),-10,20,20);
         asteroid.addImage(asteroidsimg);
         asteroid.velocityY = 20;
         asteroid.lifetime = 110;
         asteroid.scale = 0.4;
         asteroidsGrp.add(asteroid)
      }
    }

    

    