/**
 * Brick Breaker : FALLING BREAKER
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
 */

"use strict";

//this is the array that creates the first brick (red rectangle)
let bricks = [
    {
        x: undefined,
        y: 100,
        fill: "red",
        width: 60,
        height: 35,
        active: true,
        velocity: {
            x: 0,
            y: 2,
        }
    }
];

//this is our ball a white circle
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

//this is our paddle a thin black rectangle
const paddle = {
    x: 500,
    y: 665,
    fill: "black",
    width: 110,
    height: 10,
    constraints: {
        min: 30,
        max: 970,
    }
};


// the different variables that will be used to make the new bricks.   
const brickStartX = 170;    //where the first bricks will start
const brickStartY = 85;
const brickGapX = 5;        //this will create the gaps in between the bricks 
const brickGapY = 5;        //this will create the gaps in between the bricks 
const brickWidth = 55;
const brickHeight = 30;
const active = true;
// variables that helps build the placement of all the bricks. 
let col = 0;                 // there are 0 columns so they will be called
let row = 0;                //there are 0 rows at the beggining they will be called 
let numberOfColumns = 11;   //number of brick columns wanted 
let numberOfRows = 6;       // number of brick rows wanted
let offset = brickWidth / 4;   // creates the offset where some rows start at 250 while other rows starts furter

//the lives of the player 
let lives = 2;

//this is the different screen for the game and what we will use to switch in between.
let state = "title" // "game" , "win" , "gameOver"

let bricksLeft = 0;

let brickCaught = 0;

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
    titleScreen.image = loadImage("assets/images/Falling_Breaker.png");
    winScreen.image = loadImage("assets/images/YOU_WIN.png");
    gameOverScreen.image = loadImage("assets/images/Game_Over.jpg");
}


//draws the canvas that the game is displayed on.
function setup() {
    createCanvas(1000, 680);
    createAllBricks(bricks); //creates all the bricks using the variables ontop 

}

// display the state of the game
function draw() {
    if (state === "title") {
        title()
        brickCaught = 0;
        lives = 2;
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

    movePaddle(paddle);
    moveBall(ball);

    handleBallBounce(ball, paddle);

    drawPaddle(paddle);
    drawBall(ball);
    drawLives();
    drawBrickCaught();

    callYouWin();
    callGameOver();

    for (let brick of bricks) {
        if (brick.active === true) {
            drawBrick(brick);
            handleBrickFall(brick, ball);
            handleBrickCaught(brick, paddle);
            handlePaddleBlock(brick, paddle);
            handleBrickLand(brick);
        }
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
// Moves the paddle. with the mouse. the paddle can only go left and right
function movePaddle(paddle) {
    paddle.x = constrain(mouseX, paddle.constraints.min, paddle.constraints.max);
}

/**
 * move the ball. the ball will bounce off the paddle, the canvas wall and the brick
 */
function moveBall(ball) {
    ball.velocity.y = ball.velocity.y;

    ball.x = ball.x + ball.velocity.x;
    ball.y = ball.y + ball.velocity.y;
    if (keyIsDown('32') && ball.velocity.x === 0) {
        ball.velocity.y = 3;
        ball.velocity.x = 3;
    }
    // makes the ball bounce off the right and left side of the canvas
    if (ball.x > width || ball.x < 0) {
        ball.velocity.x *= -1;
    }
    //makes the ball bounce off the top of the canvas
    if (ball.y < 0) {
        ball.velocity.y *= -1;
    }

    if (ball.y > height) {
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
//draws the paddle . a thin black rectangle 
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
function drawBrickCaught() {
    push();
    textAlign(RIGHT, TOP);
    fill("black");
    textStyle(BOLD);
    textSize(100);
    text(brickCaught, width, 0);
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
                active: true,
                velocity: {
                    x: 0,
                    y: 0,
                }
            }
            //this creates the bricks
            bricks.push(newBrick);
        }
    }
}



/**  
 * 
 *  Makes the Ball bounce when the ball comes in contact with the paddle
 * 
*/
function handleBallBounce(ball, paddle) {
    const overlap = centredRectanglesOverlap(ball, paddle);

    if (overlap) {
        ball.y = paddle.y - ball.height / 2 - ball.height / 2;
        ball.velocity.y *= -1;
    }
}

/**
 * 
 * this is where if the ball comes in contact with a brick. the brick will start falling down 
 * and the ball wil bounce off the brick depneding on where did it hit the brick.
 * 
 */
function handleBrickFall(brick, ball) {
    const overlap = centredRectanglesOverlap(brick, ball);
    brick.y = brick.y + brick.velocity.y;
    //  ball.x = ball.x + ball.velocity.x;
    /**   if (brick.velocity.y === 0 && overlap) {
          //if the ball touches the top of the brick
          if (ball.y < brick.y) {
              // ball.y = brick.y - brick.width / 2 - ball.width / 2;
              ball.velocity.y *= -1;
              brick.velocity.y = 3;
          }
          // if the ball touches the bottom of the brick
          else if (ball.y > brick.y) {
  
              //   ball.y = brick.y + brick.height / 2 + ball.height / 2;
              ball.velocity.y *= -1;
              brick.velocity.y = 3;
          }
          // if it hits the left side of the brick
          if (ball.x < brick.x) {
              //  ball.x = brick.x + brick.width / 2 + ball.width / 2;
              ball.velocity.x *= 1;
              brick.velocity.y = 3;
          }
          //if it hits the right side of the brick
          else if (ball.x > brick.x) {
              //  ball.x = brick.x - brick.width / 2 - ball.width / 2;
              ball.velocity.x *= -1;
              brick.velocity.y = 3;
          }
      }*/ //the top one made some of the brick not freeze at the bottom and I couldnt 
    //figure out the problem so i stayed witht the vary basic only velocity change at y.
    if (brick.velocity.y === 0 && overlap) {
        ball.velocity.y *= -1;
        brick.velocity.y = 4;
    }
}

/**
 * when the brick falls. if the brick is not caught by the paddle but reaches the bottom of the canves.
 * the brick will land on the bottom of the canvas and stop moving. if the brick is stuck at the bottom
 * it will block the paddle from moving further then the bricks around the paddle
 * 
 */

function handlePaddleBlock(brick, paddle) {
    const overlap = centredRectanglesOverlap(brick, paddle);

    if (brick.velocity.y === 0 && overlap) {
        //check if the paddle comes in contact with a brick on the right of the paddle then this is the furthest that the paddle can now reach
        if (brick.x > paddle.x) {
            paddle.constraints.max = brick.x + brick.width / 2 - paddle.width / 2;
        }
        else if (brick.x < paddle.x) {
            //check if the paddle comes in contact with a brick on the left if the paddle then this is the furthest that the paddle can now reach
            paddle.constraints.min = brick.x + brick.width / 2 + paddle.width / 2;
        }
    }
}

/**
 * 
 * if the brick lands on top of the paddle when it is falling down. then the brick will disappear.
 * 
 * 
 */

function handleBrickCaught(brick, paddle) {
    const overlap = centredRectanglesOverlap(brick, paddle);
    brick.active = true;
    if (brick.velocity.y === 4 && overlap) {

        brick.active = false;
        brickCaught = brickCaught + 1;
    }

    if (brick.active === false) {

    }

    else if (brick.y === 665) {

        brick.active = true;
        brick.velocity.y = 0;
    }
}

/**
 * this makes it that if a brick isnt caught by the paddle but reaches the bottom of the canvas it will make the brick 
 * stop moving. and if a brick lands on another brick then they will stack.
 */
function handleBrickLand(brick) {

    if (brick.y === 660) {
        brick.velocity.y = 0;
    }

    for (let otherBrick of bricks) {
        if (brick === otherBrick) {
            continue;
        }
        // Otherwise check if they overlap
        const overlap = centredRectanglesOverlap(brick, otherBrick);

        if (brick.y === 660 && overlap) {
            brick.velocity.y = 0;
            otherBrick.velocity.y = 0;
        }
    }
}

//resets the ball in a random y position    
function resetBall(ball) {
    ball.y = random(400, 450);
    ball.x = random(100, 900);
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
    if (brickCaught === 55) {
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

