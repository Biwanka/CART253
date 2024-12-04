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
//this is our ball a white circle
const ball = {
    x: 500,
    y: 400,
    fill: "white",
    width: 12,
    height: 12,
    velocity: {
        x: 3,
        y: 3
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

//draws the canvas that the game is displayed on.
function setup() {
    createCanvas(1000, 680);
    createAllBricks(bricks); //creates all the bricks using the variables ontop 
}

//where all elements are called 
function draw() {

    background("grey");

    movePaddle(paddle);
    moveBall(ball);

    handleBallBounce(ball, paddle);

    drawPaddle(paddle);
    drawBall(ball);
    drawLives();

    for (let brick of bricks) {
        //this is where if the brick does not come in contact with a brick (brick.state = true) then it will be drawn. 
        if (brick.active === true) {
            drawBrick(brick);
            handleBrickFall(brick, ball);
            handleBrickCaught(brick, paddle);
            handlePaddleBlock(brick, paddle);
            handleBrickLand(brick);
        }
    };
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
    // makes the ball bounce off the right and left side of the canvas
    if (ball.x > width || ball.x < 0) {
        ball.velocity.x *= -1;
    }
    //makes the ball bounce off the top of the canvas
    if (ball.y < 0) {
        ball.velocity.y *= -1;
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
        ball.y = paddle.y - paddle.height / 2 - ball.height / 2;
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
    if (brick.velocity.y === 0 && overlap) {
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
    }
    /**   if (brick.velocity.y === 0 && overlap) {
          ball.velocity.y *= -1;
          brick.velocity.y = 2;
      }*/
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
        //check if the paddle comes in contact with a brick on the left if the paddle then this is the furthest that the paddle can now reach
        else if (brick.x < paddle.x) {
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
    if (brick.velocity.y === 3 && overlap) {

        brick.active = false;
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

    if (brick.y === 665) {
        brick.velocity.y = 0;
    }

    for (let otherBrick of bricks) {
        if (brick === otherBrick) {
            continue;
        }
        // Otherwise check if they overlap
        const overlap = centredRectanglesOverlap(brick, otherBrick);

        if (brick.y === 665 && overlap) {
            brick.velocity.y = 0;
            otherBrick.velocity.y = 0;
        }
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

