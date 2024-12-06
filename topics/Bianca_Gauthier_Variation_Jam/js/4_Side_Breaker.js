/**
 * Brick Breaker : FOUR SIDE BREAKER
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
 * 2- 4 corners. the concept of the original game is that the paddle is only at the bottom.
 * but with this variation the paddle will be able to go on all the 4 size.
 * depending on the coding it will only be one paddle that can move to all 4 sides or if not its that there will be 4 paddle 
 * one on each side that can be move seperatly. the ball will now not be able to bounce of any of the sides. 
 * and the brick will be placed in the middle of the screen
 * 
 */

"use strict";

//this is our ball ( a white circle)
const ball = {
    x: 700,
    y: 500,
    fill: "white",
    width: 12,
    height: 12,
    velocity: {
        x: 0,
        y: 0
    }
};

// the array that contians all the four paddle (black thin rectangles)
let paddles = [
    //bottom paddle 
    {
        x: 500,
        y: 665,
        fill: "black",
        width: 110,
        height: 10,
        orientation: "horizontal",
        placement: "bottom"
    },
    //Top Paddle 
    {
        x: 500,
        y: 20,
        fill: "black",
        width: 110,
        height: 10,
        orientation: "horizontal",
        placement: "top"
    },
    //Left Paddle
    {
        x: 20,
        y: 300,
        fill: "black",
        width: 10,
        height: 110,
        orientation: "vertical",
        placement: "left"
    },
    //Right paddle 
    {
        x: 980,
        y: 300,
        fill: "black",
        width: 10,
        height: 110,
        orientation: "vertical",
        placement: "right"
    }
];

//this is the array that creates the first brick (red rectangle)
let bricks = [
    {
        x: undefined,
        y: undefined,
        fill: "red",
        width: 60,
        height: 35,
        active: true
    },
];

// the different variables that will be used to make the new bricks.   
const brickStartX = 250;    //where the first bricks will start
const brickStartY = 250;
const brickGapX = 5;        //this will create the gaps in between the bricks 
const brickGapY = 5;        //this will create the gaps in between the bricks 
const brickWidth = 50;
const brickHeight = 25;
const active = true;
// variables that helps build the placement of all the bricks. 
let col = 0;                 // there are 0 columns so they will be called
let row = 0;                //there are 0 rows at the beggining they will be called 
let numberOfColumns = 10;   //number of brick columns wanted 
let numberOfRows = 6;       // number of brick rows wanted
let offset = brickWidth / 4;   // creates the offset where some rows start at 250 while other rows starts furter

//the lives of the player 
let lives = 3;

//how many bricks there are on screen 
let bricksLeft = 60;

//this is the different screen for the game and what we will use to switch in between.
let state = "title" // "game" , "win" , "gameOver"


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
    titleScreen.image = loadImage("assets/images/Four_Side_Breaker.png");
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
        lives = 3;
        bricksLeft = 60;
        bricks.active = true;
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

    moveBall(ball);

    drawBall(ball);
    drawLives();
    drawBricksLeft();

    callGameOver();
    callYouWin();

    for (let brick of bricks) {
        //this is where if the brick does not come in contact with a brick (brick.state = true) then it will be drawn. 
        if (brick.active === true) {
            drawBrick(brick);
            handleBrickDestroy(brick, ball);
        }
    };

    for (let paddle of paddles) {
        movePaddle(paddle);
        drawPaddle(paddle);
        handleBallBounce(ball, paddle);
    };
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
 * 
 * 
 * 
 * 
 * makes all the elements that need to move, move.
 * 
 * the ball 
 * the paddle
 * 
 * 
 * 
 * 
 * 
 */
// Moves the paddle. the are four paddle on each side of the canvas 
function movePaddle(paddle) {
    //moves the paddle on the top and bottom with the mouse, left and right. the paddle cannot go beyond the canvas
    if (paddle.orientation === "horizontal") {
        paddle.x = constrain(mouseX, 30, 970);
    };
    //moves the left and right paddle with the mouse up and down. the paddle cannot go beyond the canvas
    if (paddle.orientation === "vertical") {
        paddle.y = constrain(mouseY, 30, 650);
    }
}

/** Moves the ball*/
function moveBall(ball) {
    ball.velocity.y = ball.velocity.y;

    ball.x = ball.x + ball.velocity.x;
    ball.y = ball.y + ball.velocity.y;

    //the ball at the complete beginning is not moving and after pressing space Bar will the ball velocity be 
    //activated therefore start moving
    if (keyIsDown('32') && ball.velocity.x === 0) {
        ball.velocity.y = 4;
        ball.velocity.x = 4;
    }
    // makes the ball bounce off the right and left side of the canvas
    if (ball.x > width || ball.x < 0) {
        resetBall(ball)
        lives = lives - 1;
    }
    //makes the ball bounce off the top of the canvas
    if (ball.y > height || ball.y < 0) {
        resetBall(ball);
        lives = lives - 1;
    }
}

/**
 * 
 * 
 * 
 * Draws all of the elements in the game 
 * 
 * -the paddle
 * -the ball
 * - the first brick before the other functions helps duplicate them.
 * -the lives
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// draws a black thin rectangle which is the paddle. there a four of them on each side.
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(paddle.fill);
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

//Draws a white circle which will be the ball
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.width, ball.height);
    pop();
}

//Draws a red rectangle which will be the bricks.
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
function drawBricksLeft() {
    push();
    textAlign(RIGHT, TOP);
    fill("grey");
    textStyle(BOLD);
    textSize(100);
    text(bricksLeft, 0, 0);
    pop();
}

/**
 * 
 * 
 * 
 * this creates all of the bricks. saying that if the rows and collums are not the number mentioned at the top then
 * it eill continue creating rows and collums of red bricks.creates all of the bricks and places them
 * 
 */
function createAllBricks() {
    //this checks if the rows that are a pair number, 
    //the number of bricks will be 12 it adds the offset so the bricks start at a different x position.
    for (let row = 0; row < numberOfRows; row++) {
        if (row % 2 === 0) {
            col = 12;
            offset = brickWidth / 4;
        }
        //else the impair ones will have 11 brick 
        else {
            col = 11;
            offset = 0;
        }
        for (let col = 0; col < numberOfColumns; col++) {
            //this is where it creates the brick in how it will look
            // We can work out each brick's x and y by its position in the rows and columns
            let newBrick = {
                x: brickStartX + offset + col * (brickWidth + brickGapX),
                y: brickStartY + row * (brickHeight + brickGapY),
                width: brickWidth,
                height: brickHeight,
                fill: "red",
                active: true
            }
            //this creates the bricks
            bricks.push(newBrick);
        }
    }
}


//resets the ball in a random y position    
function resetBall(ball) {
    ball.y = random(200, 800);
    ball.x = random(100, 900);
}

/**  
 * 
 *  Makes the Ball bounce when the ball comes in contact with the paddle
 * 
*/
function handleBallBounce(ball, paddle) {
    const overlap = centredRectanglesOverlap(ball, paddle);

    if (overlap) {
        //if the ball hits the top paddle it will bounce off
        if (paddle.placement === "top") {

            ball.x = paddle.x - paddle.height / 2 - ball.height / 2;
            ball.velocity.y *= -1;
        }
        //if the ball hits the bottom paddle it will bounce off
        if (paddle.placement === "bottom") {
            ball.y = paddle.y - paddle.height / 2 - ball.height / 2;
            ball.velocity.y *= -1;
        }
        //if the ball hits the left paddle it will bounce off
        if (paddle.placement === "left") {
            ball.y = paddle.y - paddle.height / 2 - ball.height / 2;
            ball.velocity.x *= -1;
        }
        //if the ball hits the right paddle it will bounce off.
        if (paddle.placement === "right") {
            ball.x = paddle.x - paddle.height / 2 - ball.height / 2;
            ball.velocity.x *= -1;
        }
    }
}
/**
 * This makes that if the white ball comes in contact with a brick. any brick then the brick will disappear.
 * when the ball hits the brick from the y so top or bottom the brick will bounce of. if its from the side it 
 * dosent completely bounce off
 */
function handleBrickDestroy(brick, ball) {
    const overlap = centredRectanglesOverlap(brick, ball);

    if (overlap) {
        ball.y = brick.y - brick.height / 2 - ball.height / 2;

        brick.active = false;
        ball.velocity.y *= -1;
        bricksLeft = bricksLeft - 1;
    }
    if (brick.active === false) {

    }
    else {

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

function callYouWin() {
    if (bricksLeft === 0) {
        state = "win";
    }
}

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

