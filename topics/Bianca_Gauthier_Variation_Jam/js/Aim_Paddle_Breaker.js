/**
 * Brick Breaker : AIM PADDLE BREAKER
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
 * 
 * 2- 4 corners. the concept of the original game is that the paddle is only at the bottom.
 *but i decided to make it that we have a horizontal and vertical paddle, in addition i decided to give free aim to the paddle.
 as the plus sign fallows the mouse cursor alsmot like the aim of a gun.
 */

"use strict";

const ball = {
    x: 500,
    y: 400,
    fill: "white",
    width: 12,
    height: 12,
    velocity: {
        x: 0,
        y: 0
    }

};

// Our paddle
let paddles = [
    //bottom paddle 
    {
        x: 500,
        y: 665,
        fill: "black",
        width: 110,
        height: 10,
        orientation: "horizontal"
    },

    //Right paddle 
    {
        x: 980,
        y: 300,
        fill: "black",
        width: 10,
        height: 110,
        orientation: "vertical",
    }
];


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

/**I havent implemented this yet
 * let hardBricks = [
    {
        x: 750,
        y: 540,
        fill: "#8b0000",
        width: 40,
        height: 20,
        active: true
    }
];
*/


// the different variables that will be used to make the new bricks.   
const brickStartX = 170;    //where the first bricks will start
const brickStartY = 85;
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
    titleScreen.image = loadImage("assets/images/aim_Paddle_breaker.png");
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

    /** I havent implemented this yet. 
     *  for (let hardBrick of hardBricks) {
            if (hardBrick.active === true) {
                drawHardBrick(hardBrick);
                handleHardBrickDestroy(hardBrick, ball);
            }
        }*/
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
// Moves the paddle. the paddle is in a cross format and fallows the mouse cursor.
function movePaddle(paddle) {

    if (paddle.position = "horizontal") {
        paddle.x = constrain(mouseX, 30, 970);
    }

    if (paddle.position = "vertical") {
        paddle.y = constrain(mouseY, 30, 650);
    }
}


/**
 * move the ball. the ball will bounce off the paddle, the canvas wall and the brick
 */
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
 * This is where all the elements are drawn
 *
 * -ball
 *-paddle
 * -brick
 * -lives
 *
 *
 *
 */
//draws the paddle. tw0 thin black rectangle that end up being place in a plus sign
function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(paddle.fill);
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}

//draws the ball. a white small cricle
function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.width, ball.height);
    pop();
}
//draws the first brick. a bright red rectangle
function drawBrick(brick) {
    push();
    rectMode(CENTER);
    fill(brick.fill);
    noStroke(0);
    rect(brick.x, brick.y, brick.width, brick.height);
    pop();
}
//draws the first brick. a darker and smaller red rectangle
function drawHardBrick(hardBrick) {
    push();
    rectMode(CENTER);
    fill(hardBrick.fill);
    noStroke(0);
    rect(hardBrick.x, hardBrick.y, hardBrick.width, hardBrick.height);
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

//resets the ball in a random y and x position (however there is restrains so the ball dosent reset in the bricks)    
function resetBall(ball) {
    ball.y = random(400, 450);
    ball.x = random(100, 900);
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
            offset = brickWidth / 2;
        }

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

/**  
 * 
 *  Makes the Ball bounce when the ball comes in contact with the paddle
 * depending on which part of the paddle the ball touches it will bounce in the opposite derection.
*/
function handleBallBounce(ball, paddle) {
    const overlap = centredRectanglesOverlap(ball, paddle);
    if (overlap) {
        if (paddle.orientation === "horizontal") {
            if (ball.y > paddle.y) {
                ball.velocity.y *= -1;
            }
            else if (ball.y < paddle.y) {
                ball.velocity.y *= 1;
            }
            // ball.y = paddle.y - paddle.height / 2 - ball.height / 2;
            //  ball.velocity.y *= -1;
        }
        if (paddle.orientation === "vertical") {

            if (ball.x > paddle.x) {
                ball.velocity.x *= -1;
            }
            else if (ball.x < paddle.x) {
                ball.velocity.x *= 1;
            }
            //ball.x = paddle.x - paddle.width / 2 - ball.width / 2;
            //ball.velocity.x *= -1;
        }
    }
}

/**
 *  this is where the brick is effected if it touches the ball. if the brick touches the ball it will disapear.
 */
function handleBrickDestroy(brick, ball) {
    const overlap = centredRectanglesOverlap(brick, ball);

    if (overlap) {
        brick.active = false;
        ball.velocity.y *= -1;
        bricksLeft = bricksLeft - 1;
    }

    if (brick.active === false) {
    }
}

function handleHardBrickDestroy(hardBrick, ball) {
    const overlap = centredRectanglesOverlap(hardBrick, ball);

    if (overlap) {
        hardBrick.active = false;
        ball.velocity.y *= -1;
    }

    if (hardBrick.active === false) {

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

