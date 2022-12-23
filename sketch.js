var spaceImg, space;
var rockImg, rock, rockG
var ufo, ufoImg;
var gameState = "play"

function preload(){
  spaceImg = loadImage("atmosphere_infrunnergame.jpg");
  rockImg = loadImage("space_rock_infrunnergame-removebg-preview.png");
  ufoImg = loadImage("ufo_infrunnergame-removebg-preview.png");
}

function setup() {
  createCanvas(600, 600);
  space = createSprite(300,300);
  space.addImage("atmosphere_infrunnergame",spaceImg);
  space.velocityY = 1;

  ufo = createSprite(300,300);
  ufo.addImage("ufo_infrunnergame-removebg-preview",ufoImg);
  ufo.scale=0.4;

  edges=createEdgeSprites();
  
  rockG=createGroup();

  ufo.setCollider("circle", -13, 20, 120)
}

function draw() {
  background(200);
  


  if (gameState==="play") {
    if(space.y > 400){
      space.y = 300
    }
    
    if (keyDown("SPACE")) {
      ufo.velocityY = -6
    }

    ufo.velocityY = ufo.velocityY + 0.3
   
    ufo.velocityX = 0
    
    if (keyDown("left")) {
      ufo.velocityX = -3
    }
    
    if (keyDown("right")) {
      ufo.velocityX = 3
    }
    
    ufo.collide(edges[2]);
    ufo.collide(edges[0]);
    ufo.collide(edges[1]);
     
    if(space.x < 0 ){
        space.x = width/2;
      }

    rocks()


    if(ufo.isTouching(rock)){
        gameState = end;
  }

  if(gameState === "end") {
    space.destroy()
    ufo.destroy()
    rockG.destroyEach()
    textSize(30)
    fill("yellow")
    text("Game Over", 230, 280)
  }
  drawSprites();
}

function rocks() {
  
  if (frameCount%300===0){
    rock=createSprite(random(100, 500), -50)
    rock.addImage(doorImg);
    rock.velocityY = 1 
    rockG.add(rock)
  }
}