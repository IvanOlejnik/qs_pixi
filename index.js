var renderer = PIXI.autoDetectRenderer(800, 560);
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

PIXI.loader 
    .add("mario", "images/mario.png")
    .add("wall", "images/bgst.jpg")
    .add("land", "images/land.jpg")
    .add("rock", "images/rock.png")
    .add("marioClip", "images/marioClip.png")
    .load(setup);
var mario, wall, land, rock, rock1, rock2, rock3, marioMove, rect;
var moveR, moveL, moveT = false, moveD=false;

function setup() {
    
    mario = new PIXI.Sprite(
        PIXI.loader.resources["mario"].texture
    );
    wall = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["wall"].texture, 1024, 1024
    );
    land = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["land"].texture, 1024, 110
    ); 
    rock = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["rock"].texture, 64, 64
    );
    rock1  = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["rock"].texture, 64, 64
    );
    rock2  = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["rock"].texture, 64, 64
    );
    rock3  = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["rock"].texture, 64, 64
    );
    rect = new PIXI.Rectangle(0, 0, 40, 50);
    var textureMove = PIXI.loader.resources["marioClip"].texture;
    textureMove.frame = rect;
    marioMove = new PIXI.Sprite(textureMove);
    
    land.position = {x: 0,y: 450}
    wall.position = {x: 0,y: -200}
    //mario.position = {x: 150,y: renderer.height - 175}
    //mario.scale.set(1, 1);//размеры
    //mario.anchor.set(0.5, 0.5);//середина изображения
    marioMove.position = {x: 150,y: renderer.height - 135}
    marioMove.scale.set(1, 1);//размеры
    marioMove.anchor.set(0.5, 0.5);//середина изображения
    
    rock.anchor.set(0.5, 0.5);
    rock1.anchor.set(0.5, 0.5);
    rock2.anchor.set(0.5, 0.5);
    rock3.anchor.set(0.5, 0.5);
    //rock.scale.set(0.3, 0.3);
    
    rock.position = {x: 300,y: 418}
    rock1.position = {x: 450,y: 418}
    rock2.position = {x: 600,y: 320}
    rock3.position = {x: 660,y: 320}

    stage.addChild(wall);
    stage.addChild(land);
    stage.addChild(rock);
    stage.addChild(rock1);
    stage.addChild(rock2);
    stage.addChild(rock3);
    stage.addChild(marioMove);
    
    animationLoop();
}

Mousetrap.bind('d', function() {
    moveR = true;
}, 'keydown');
Mousetrap.bind('d', function() {
    moveR = false;
}, 'keyup');

Mousetrap.bind('a', function() {
    moveL = true;
}, 'keydown');
Mousetrap.bind('a', function() {
    moveL = false;
}, 'keyup');

Mousetrap.bind('w', function() {
    if(moveD == false && moveT == false){
        moveT = true;
    }
}, 'keydown');

var run = 0;

function animationLoop() {
    requestAnimationFrame(animationLoop);
    
    wall.tilePosition.x +=1;
    
    if(moveR){
        marioMove.x +=6;
    }
    if(moveL){
        marioMove.x -=6;
    }
    if(moveT){
        marioMove.y -=6;
        if(marioMove.y <= 270){
            moveT=false;
            moveD=true;
        }
        
    }
    if(moveD){
         marioMove.y +=6;
         if(marioMove.y >= 420){
            moveD=false;
        }
    }

   if(moveL || moveR || moveT || moveD){
       run++; 
       if(run == 5){
           run = 0;
           if(rect.x >=45*4) {
               rect.x = 0;
           }
           marioMove.texture.frame = rect;
           rect.x += 45; 
       }
   }
    
    renderer.render(stage);  
}


 


