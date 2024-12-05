/**
 * Brick Breaker
 * Bianca Gauthier
 * 
 * Im going to be using a game that is very nastalgic as I use to always play it on my dads phone when i was very young. 
 * The game is Brick Breakers specifically the one on the Blackberry. I waill create a couple different variations of the game. 
 * 
 * 
 * the concept of the original game : 
 * 
 * you have a paddle, a ball and there are bricks in the game. your paddle stays at the bottom of the game. 
 * the player can only move the paddle left and right. 
 * the ball will bounce of the paddle and will bounce in anny direction like a ball (it dosent curve but can go in diagonals).
 * if the player dosent catch the ball with teh paddle and the ball falls at the bottom the player looses a life.
 * the purpose of the game is for the ball to hit the bricks and break them until none are left to win the game. 
 * the ball can bouce of the side of the game and the top just not the bottom. 
 * in the game some brick that are darker needs to be hit 3 times before breaking will the paler are just once.
 * later in the game they alos have steel bricks that you cant break just bounce off. 
 * 
 * 
 * the ideas for variations:
 * 
 * 1- when the ball hits a brick, teh brick dosent break but starts to fall downwards.
 *  if the player dosent catch the falling bricks with the paddle the bricks will freeze at the bottom and sty there.
 * this will block the paddle. so if alot of bricks are not cought it could block the player from moving the paddle.
 * 
 * 
 * 2- 4 corners. the concept of the original game is that the paddle is only at the bottom.
 * but with this variation the paddle will be able to go on all the 4 size.
 * depending on the coding it will only be one paddle that can move to all 4 sides or if not its that there will be 4 paddle 
 * one on each side that can be move seperatly. the ball will now not be able to bounce of any of the sides. 
 * and the brick will be placed in the middle of the screen
 * 
 * 
 * 3- DvD logo. because the game i chose had to do with something from my past i decided to all add another aspect that touches on that.
 * I am going to use the boucing DVD logo. it was a common thing if you ever owned a DVD that when it was left on pause for long
 * the logo would appear and start bouching on the 4 sides of the screen. The main Hype was when the logo actually finally hit the 
 * corner of the screen it was the biggest satisfaction. Mainly i will use the top right corner. so i will change teh ball to be the 
 * DvD logo and the ball will be able to hit the side of the screen. there will be bricks blocking the top right corner.
 * Even if the player gets ride of all the bricks they will not win the game they need to continue until the DVD logo witht perfectly 
 * the top right corner.
 * 
 * 
 * 4- Reverse. I dedcide to make a version that will be the contrary of the cncept of the original game. 
 * instead of bouncing a ball on a paddle to break the bricks, instead the player will need to trow the bricks to hit the ball
 * that is moving in the top screen. the player will have a pile of bricks and need to trow them so it hits the ball and the brick breaks.
 * if the brick hits nothing gravity will do its thing and come back down in the hands of the player. im think maybe to add a timer 
 * where the palyer needs to break all the brick before the time. we will see. 
 */

"use strict";

//this is our ball ( a white circle)
const ball = {
    x: 500,
    y: 100,
    fill: "white",
    width: 16,
    height: 16,
    velocity: {
        x: 3,
        y: 3
    }
};

const brick = {
    x: undefined,
    y: 645,
    fill: "red",
    width: 30,
    height: 45,
    active: "true",
    state: "pre-launch",
    acceleration: {
        x: 0,
        y: 0,
    },
    velocity: {
        x: 0,
        y: 0,
    }
};

// Our paddle (a thin black rectangle) it contains 3 part. to make the baddle launch like a springed platform
const launchPaddle = {
    top: {
        x: 500,
        y: 665,
        fill: "black",
        width: 110,
        height: 10
    },

    base: {
        x: 500,
        y: 673,
        fill: "black",
        width: 120,
        height: 10
    },

    spring: {
        x: undefined,
        y: 665,
        fill: "black",
        size: 8,
        speed: 20,
        state: "idle"
    }
};

const gravity = 0.025;

//the lives of the player 
let lives = 3;

//this is the different screen for the game and what we will use to switch in between.
let state = "title" // "game" , "win" , "gameOver"

let bricksLeft = 0;

// this will be the Title Screen at the begging of the game that will have the title and instruction on the types of flies (uses and image)
//has position and image
let titleScreen = {
    x: 1000,
    y: 680,
    image: undefined
};
//this will be the You Win background screen that will appear when you get rid of alk the bricks. (uses and image)
//has position and image
let winScreen = {
    x: 1000,
    y: 680,
    image: undefined
};

//this will be the Game Over background screen that will appear when you run out of lives. (uses and image)
//has position and image
let gameOverScreen = {
    x: 1000,
    y: 680,
    image: undefined
};

function preload() {
    titleScreen.image = loadImage("assets/images/Brick_Breaker_Title.png");
    winScreen.image = loadImage("assets/images/YOU_WIN.png");
    gameOverScreen.image = loadImage("assets/images/Game_Over.jpg");
}


//draws the canvas that the game is displayed on.
function setup() {
    createCanvas(1000, 680);
    createAllBricks(bricks); //creates all the bricks using the variables ontop 
    resetBall(ball);
}

// display the state of the game
function draw() {
    if (state === "title") {
        title();
    }

    else if (state === "game") {
        game();
    }

    else if (state === "gameOver") {
        gameOver();
    }

    else if (state === "win") {
        win();
    }
}

function title() {
    background(titleScreen.image);
    lives = 3;
}

//where all elements are called 
function game() {
    background("grey");

    moveLaunchPaddle(launchPaddle);
    moveSpring(launchPaddle);
    moveBall(ball);
    moveBrick(brick);

    handleBrickDestroy(brick, ball);
    handleBrickLaunch(brick, launchPaddle);

    drawLaunchPaddle(launchPaddle);
    drawBall(ball);
    drawBrick(brick);
    drawLives();

    callGameOver();
}
/**This is both of the end screen options 
 * 
 * 
 */
// This displayes the image that shows the GameOver screen that tell player they lost the game
function gameOver() {
    background(gameOverScreen.image);
}
//this dsiplayes the image tthat show the Win screen that tell player they won the game
function win() {
    background(winScreen.image);
}

/**
 * Moves the paddle at the bottom of the screen with the mouse. only moves left and right
 */
function moveLaunchPaddle(launchPaddle) {
    launchPaddle.top.x = constrain(mouseX, 30, 970);
    launchPaddle.base.x = constrain(mouseX, 30, 970);
}

/**
 * move the spring therefore, when mouse is pressed the state of the platform will become launch, therefore you should
 * see the top a the platform go up and come back down
 */
function moveSpring(launchPaddle) {

    launchPaddle.spring.x = launchPaddle.base.x;
    launchPaddle.top.y = launchPaddle.spring.y + launchPaddle.spring.size;

    if (launchPaddle.spring.state === "idle") {

    }

    else if (launchPaddle.spring.state === "launched") {
        launchPaddle.spring.y += -launchPaddle.spring.speed;


        if (launchPaddle.spring.y <= 640) {
            launchPaddle.spring.state = "retract";
        }
    }

    else if (launchPaddle.spring.state === "retract") {
        launchPaddle.spring.y += launchPaddle.spring.speed;

        if (launchPaddle.spring.y >= height) {
            launchPaddle.spring.state = "idle";
        }
    }
}


/** 
 * Moves the ball. the ball is restricted at the top of the canvas and will bounce of the top and the left and right of the canvas
 * it will also bounce off an invisible restiction so the ball cannot go at the bottom of the canvas
*/
function moveBall(ball) {
    ball.velocity.y = ball.velocity.y;

    ball.x = ball.x + ball.velocity.x;
    ball.y = ball.y + ball.velocity.y;

    // makes the ball bounce off the right and left side of the canvas
    if (ball.x > width || ball.x < 0) {
        ball.velocity.x *= -1;
    }
    //makes the ball bounce off the top of the canvas
    if (ball.y > 300 || ball.y < 0) {
        ball.velocity.y *= -1;
    }
}

/**
 * this makes the brick move, the brick will appear ontop of the launch paddle and will fallow the same left and right movement 
 * when it is launched then it will go up an down
 */
function moveBrick(brick) {

    if (brick.state === "pre-launch") {
        brick.x = mouseX;
    }
}

/**
 *
 * This is where all the elements are drawn
 *
 * -ball
 * -launch paddle ( 3 parts)
 * -brick
 * -lives
 *
 *
 *
 */


//draws the launch paddle two thin black rectangle on top of one another
function drawLaunchPaddle(launchPaddle) {
    //draws the top of the paddle a thin black rectangle
    push();
    rectMode(CENTER);
    noStroke();
    fill(launchPaddle.top.fill);
    rect(launchPaddle.top.x, launchPaddle.top.y, launchPaddle.top.width, launchPaddle.top.height);
    pop();
    //drwas the base of the paddle. a thin black rectangle a little longer than the top and it is at the bottom
    push();
    rectMode(CENTER);
    noStroke();
    fill(launchPaddle.base.fill);
    rect(launchPaddle.base.x, launchPaddle.base.y, launchPaddle.base.width, launchPaddle.base.height);
    pop();
    //draws the spring it is inbetween the two paddles (i cant see it ) but its there aas the mechanism to make the paddle launch
    push();
    stroke(launchPaddle.spring.fill);
    strokeWeight(launchPaddle.spring.size);
    line(launchPaddle.spring.x, launchPaddle.spring.y, launchPaddle.base.width);
    pop();
}

//draws the ball. a white small circle
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.width, ball.height);
    pop();
}

//draws the brick. a bright red rectangle
function drawBrick(brick) {

    push();
    rectMode(CENTER);
    fill(brick.fill);
    noStroke(0);
    rect(brick.x, brick.y, brick.width, brick.height);
    pop();
}
//Draws the lives of the player. It starts at 3 and goes down to 0. if the balls misses the paddle and fall off the canvas player 
//lose a life. it is a white number on the top of the canvas.
function drawLives() {
    push();
    textAlign(LEFT, TOP);
    fill("white");
    textStyle(BOLD);
    textSize(100);
    text(lives, 0, 0);
    pop();
}


function resetBrick(brick) {
    brick.y = 645;
    brick.x = mouseX;
    brick.velocity.y = 0;
    brick.acceleration.y = 0;
    brick.fill = "grey";
}


/**
 * this launches the brick. if the brick touches the launch paddle that is activated the brick will go up. if it dosent 
 * touch the ball then when it reaches the top it will start to fall. if the brick is caught by the paddle then you
 * can restart the launching process. if you dont catch the brick and it goes beyond the bottom canvas then the brick will reset.
 */
function handleBrickLaunch(brick, launchPaddle) {
    const overlap = centredRectanglesOverlap(brick, launchPaddle.top);

    if (brick.state === "pre-launch") {
        brick.x = mouseX;
        brick.fill = "red";
    }

    else if (brick.state === "launch") {

        brick.acceleration.y += gravity;

        brick.velocity.x += brick.acceleration.x;
        brick.velocity.y += -brick.acceleration.y;

        brick.x += brick.velocity.x;
        brick.y += brick.velocity.y;

        if (brick.y < 50) {
            brick.state = "falling"
        }
    }

    else if (brick.state === "falling") {

        brick.velocity.y = 5;
        brick.y += brick.velocity.y;

        if (brick.y > 640 && overlap) {
            brick.state = "pre-launch";
            brick.y = 643;
            brick.x = mouseX;
        }

        else if (brick.y > 750) {
            resetBrick(brick);
            brick.state = "pre-launch";
        }
    }
}

/**
 * this is where the brick is effected if it touches the ball. if the brick touches the ball it will disapear.
 */
function handleBrickDestroy(brick, ball) {
    const overlap = centredRectanglesOverlap(brick, ball);

    if (overlap) {
        resetBrick(brick);
        ball.velocity.y *= -1;
        brick.fill = "grey";
    }
}


/**
 * 
 * 
 * this is how the state of teh screen. what is displayed will chnage
 * 
 * 
 * the pathways to move change the screen 
 * if we are at the title,
 * if we are at the game 
 * if we are at the game over screen
 * 
 * 
 * 
 * 
 * 
 */

function callGameOver() {
    if (lives === 0) [
        state = "gameOver"
    ]
}

function mousePressed() {

    //to get players from the title screen to the game play
    //starts at the title if we click the mouse when we are at the title screen, this will then bring the player to the game screen 
    if (state === "title") {
        state = "game";
    }
    // if the player won the game and are at the winning screen they can click the mouse to bring them back to the title screen.
    //if they want to replay the game
    else if (state === "win") {
        state = "title";
        lives = 3;
    }

    //if the player lose the game and are at the game Over screen they can click the mouse to bring them back to the title screen 
    //if they want to replay the game
    else if (state === "gameOver") {
        state = "title";
        lives = 3;
    }
    // if the state of the game is on the game screen then we can start playing the game (the clicking dosent do anything anymore)
    else if (state === "game") {

    }
}
/**
 * the mouse pressed function. if the mouse is pressed then it will call the function to make the paddle launch.
 * basically the top rectangle goes up and back down.
 */
function mousePressed() {
    if (brick.state === "pre-launch") {
        brick.state = "launch";
    }

    if (launchPaddle.spring.state === "idle") {
        launchPaddle.spring.state = "launched";
    }


}



/**
* Returns true if a and b overlap, and false otherwise
* Assumes a and b have properties x, y, width and height to describe
* their rectangles, and that a and b are displayed centred on their
* x,y coordinates.*/
function centredRectanglesOverlap(a, b) {
    return (a.x + a.height / 2 > b.x - b.width / 2 &&
        a.x - a.height / 2 < b.x + b.width / 2 &&
        a.y + a.height / 2 > b.y - b.height / 2 &&
        a.y - a.height / 2 < b.y + b.height / 2);
}

















/**function handleBrickLaunch(brick, launchPaddle) {

    const overlap = centredRectanglesOverlap(brick, launchPaddle.top);

   

    if (overlap && brick.state === "launch") {

        brick.y = launchPaddle.top.y - launchPaddle.top.height / 2 - brick.height / 2;
        brick.x = mouseX;
    }

    else if (brick.y > launchPaddle.top.y) {
        brick.state = "pre-launch";
        brick.y = 640;
        brick.velocity.y = 0;
        brick.acceleration.y = 0;
        brick.x = mouseX;
    }

}*/