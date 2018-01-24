var AM = new AssetManager();

function Animation(spriteSheet, frameWidth, frameHeight, sheetWidth, frameDuration, frames, loop, scale) {
    this.spriteSheet = spriteSheet;
    this.frameWidth = frameWidth;
    this.frameDuration = frameDuration;
    this.frameHeight = frameHeight;
    this.sheetWidth = sheetWidth;
    this.frames = frames;
    this.totalTime = frameDuration * frames;
    this.elapsedTime = 0;
    this.loop = loop;
    this.scale = scale;
}

Animation.prototype.drawFrame = function (tick, ctx, x, y) {
    this.elapsedTime += tick;
    if (this.isDone()) {
        if (this.loop) this.elapsedTime = 0;
    }
    var frame = this.currentFrame();
    var xindex = 0;
    var yindex = 0;
    xindex = frame % this.sheetWidth;
    yindex = Math.floor(frame / this.sheetWidth);

    ctx.drawImage(this.spriteSheet,
                 xindex * this.frameWidth, yindex * this.frameHeight,  // source from sheet
                 this.frameWidth, this.frameHeight,
                 x, y,
                 this.frameWidth * this.scale,
                 this.frameHeight * this.scale);
}

Animation.prototype.currentFrame = function () {
    return Math.floor(this.elapsedTime / this.frameDuration);
}

Animation.prototype.isDone = function () {
    return (this.elapsedTime >= this.totalTime);
}

// no inheritance
function Background(game, spritesheet) {
    this.x = 0;
    this.y = 0;
    this.spritesheet = spritesheet;
    this.game = game;
    this.ctx = game.ctx;
};

Background.prototype.draw = function () {
    this.ctx.drawImage(this.spritesheet,
                   this.x, this.y);
};

Background.prototype.update = function () {
};
/****************************************************************************** */
/****************************************************************************** */
// inheritance 
function PandaMove(game, spritesheet) {
    this.animation = new Animation(spritesheet, 50, 43, 3, 0.15, 3, true, 1);
    this.jumpAnimation = new Animation(spritesheet, 50, 38, 3, 0.15, 1, true, 1);
    //spriteSheet, frameWidth, frameHeight, sheetWidth,frameDuration, frames, loop, scale
    this.speed = 100;
    this.jumping = false;
    this.ctx = game.ctx;
    Entity.call(this, game, 0, 425);
}

PandaMove.prototype = new Entity();
PandaMove.prototype.constructor = PandaMove;

PandaMove.prototype.update = function () {
    if (this.game.space) this.jumping = true;
    if (this.jumping) {
        console.log("JUMP");
        if (this.jumpAnimation.isDone()) {
            this.jumpAnimation.elapsedTime = 0;
            this.jumping = false;
        }
        var jumpDistance = (this.jumpAnimation.elapsedTime / this.jumpAnimation.totalTime) * 1.12;
        var totalHeight = 100;

        if (jumpDistance > 0.5)
            jumpDistance = 1 - jumpDistance;

        //var height = jumpDistance * 2 * totalHeight;
        var height = totalHeight*(-4 * (jumpDistance * jumpDistance - jumpDistance));
        this.y = this.ground - height;
        //console.log("Y axis" + this.y);
    } else {
        this.x += this.game.clockTick * this.speed;
        if (this.x > 1000) this.x = -230;
    }
    Entity.prototype.update.call(this);
}

PandaMove.prototype.draw = function () {
    if(this.jumping){
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y - 34);
    } else {
        this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    }
    Entity.prototype.draw.call(this);
}
/****************************************************************************** */
/****************************************************************************** */
// inheritance 
function Dragon(game, spritesheet) {
    this.animation = new Animation(spritesheet, 72, 68, 10, 0.15, 10, true, 1);
    //spriteSheet, frameWidth, frameHeight, sheetWidth,frameDuration, frames, loop, scale
    this.speed = 300;
    this.ctx = game.ctx;
    Entity.call(this, game, 1000, 50);
}

Dragon.prototype = new Entity();
Dragon.prototype.constructor = Dragon;

Dragon.prototype.update = function () {
    this.x -= this.game.clockTick * this.speed;
    if (this.x < -100) this.x = 1100;
    Entity.prototype.update.call(this);
}

Dragon.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
/****************************************************************************** */
/****************************************************************************** */
// inheritance 
function PandaSleep(game, spritesheet) {
    this.animation = new Animation(spritesheet, 68.4, 50, 12, 0.15, 12, true, 1);
    this.speed = 100;
    this.ctx = game.ctx;
    Entity.call(this, game, 350, 350);
}

PandaSleep.prototype = new Entity();
PandaSleep.prototype.constructor = PandaSleep;


PandaSleep.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
/****************************************************************************** */
/****************************************************************************** */
// inheritance 
function PandaLove(game, spritesheet) {
    this.animation = new Animation(spritesheet, 47.7, 48, 7, 0.15, 7, true, 1);
    this.speed = 400;
    this.ctx = game.ctx;
    Entity.call(this, game, 587, 350);
}

PandaLove.prototype = new Entity();
PandaLove.prototype.constructor = PandaLove;


PandaLove.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}
/****************************************************************************** */
/****************************************************************************** */
// inheritance 
function WhiteDuck(game, spritesheet) {
    this.animation = new Animation(spritesheet, 43.7, 50, 8, 0.15, 8, true, 1);
    this.speed = 400;
    this.ctx = game.ctx;
    Entity.call(this, game, 700, 350);
}

WhiteDuck.prototype = new Entity();
WhiteDuck.prototype.constructor = PandaLove;


WhiteDuck.prototype.draw = function () {
    this.animation.drawFrame(this.game.clockTick, this.ctx, this.x, this.y);
    Entity.prototype.draw.call(this);
}


//AM.queueDownload("./img/RobotUnicorn.png");
AM.queueDownload("./img/panda_sleep.png");
AM.queueDownload("./img/panda_moveJump.png");
AM.queueDownload("./img/panda_love.png");
AM.queueDownload("./img/whiteDuck.png");
AM.queueDownload("./img/dragonFly.png");
AM.queueDownload("./img/maplestory_bg.png");

AM.downloadAll(function () {
    var canvas = document.getElementById("gameWorld");
    var ctx = canvas.getContext("2d");

    var gameEngine = new GameEngine();
    gameEngine.init(ctx);
    gameEngine.start();

    
    gameEngine.addEntity(new Background(gameEngine, AM.getAsset("./img/maplestory_bg.png")));
    gameEngine.addEntity(new PandaMove(gameEngine, AM.getAsset("./img/panda_moveJump.png")));
    gameEngine.addEntity(new PandaSleep(gameEngine, AM.getAsset("./img/panda_sleep.png")));
    gameEngine.addEntity(new WhiteDuck(gameEngine, AM.getAsset("./img/whiteDuck.png")));
    gameEngine.addEntity(new Dragon(gameEngine, AM.getAsset("./img/dragonFly.png")));
    gameEngine.addEntity(new PandaLove(gameEngine, AM.getAsset("./img/panda_love.png")));

    console.log("All Done!");
});