var PLAY = 1
var END = 0
var gameState = PLAY

var runner, runner_collided
var ground, invisibleGround, groundImage

var obstaclesGroup, obstacle, obstacle2

var score = 0
var gameOver, restart



function preload(){
runner_running = loadImage("th.png")
runner_collided = loadImage("falling.jpeg")
obstacle = loadImage("rock.jpeg")
obstacle1 = loadImage("stump.jpeg")
gameOver = loadImage("game_over.jpg")
restart = loadImage("reset.jpg")
ground = loadImage("ground.jpg")
}

function setup() {
 createCanvas(windowWidth, windowHeight)
 
 runner = createSprite(50,180,20,50)
 runner.addImage("running", runner_running)
 runner.addImage("collided", runner_collided)
 runner.scale = 1

 ground = createSprite(200,180,400,20)
 ground.addImage("ground", ground)
 ground.x = ground.width /2
 ground.velocitX = -(6+3*score/150)

 gameOver = createSprite(300,100)
 gameOver.addImage("game_over", GameOver)
 gameOver.scale = 0.5
 gameOver.visible = false

 restart = createSprite(300,140)
 restart.addImage("restart", restart)
 restart.scale = 0.5
 restart.visible = false

 invisibleGround = createSprite(200,190,400,10)
 invisibleGrounds.visible = false

 obstaclesGroup = createGroup()

 score = 0
}

function draw() {
 background(255)
 text("Score: "+ score, 500,50)

 if (gameState==PLAY){
     score = score+Math.round(getFrameRate()/60)
     ground.velocityX = -(6+3*score/150)

     if(keyDown("space")&& runner.y>=159){
         trex.velocityY = -12
     }
     trex.velocityY = trex.velocityY+0.8

     if (ground.x<0){
         ground.x = ground.width/2
     }
     trex.collide(invisibleGround)
     spawnObstacles()

     if (trex.isTouching(obstaclesGroup)){gameState=END}

     if(gameState === END){
         
        trex.velocityY=0
        ground.velocityX=0
     }
     drawSprites()
 }
}

function spawnObstacles(){
    if(frameCount % 60 ==0){
        var obstacle = createSprite(600,165,10,40)
        obstacle.velocityX=-6

        var rand=Math.round(random(1,2))
        switch(rand){
            case 1:obstacle.addImage(obstacle)
                   break
            case 2:obstacle.addImage(obstacle1)  
                   break             
        }
        obstacle.scale = 0.5
        obstacle.lifetime = 300
        obstaclesGroup.add(obstacle, obstacle1)
    }
}
function reset(){
    gameState = PLAY
    gameOver.visible = false
    restart.visible = false
    obstaclesGroup.destroyEach()

    score = 0
}