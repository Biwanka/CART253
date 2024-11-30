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

    },

];

const brickStartX = 170;
const brickStartY = 85;
const brickGapX = 5;
const brickGapY = 5;
const brickWidth = 55;
const brickHeight = 30;

const active = true;


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


// Our paddle
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

//const gravity = 0.6;


let col = 0;
let row = 0;
let numberOfColumns = 11;
let numberOfRows = 6;
let offset = brickWidth / 4;
//let newBrick = createAllBrick(col * bricks.width, row * bricks.height);



//
function setup() {
    createCanvas(1000, 680);
    createAllBricks(bricks);
}


//
function draw() {
    background("grey");

    movePaddle(paddle);


    moveBall(ball);

    handleBallBounce(ball, paddle);



    drawPaddle(paddle);
    drawBall(ball);

    for (let brick of bricks) {
        if (brick.active === true) {
            drawBrick(brick);
            handleBrickFall(brick, ball);
            // handleBrickCaught(brick, paddle);
            // handlePaddleBlock(brick, paddle);
            handleBrickLand(brick);
        }
    };



}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
    paddle.x = constrain(mouseX, paddle.constraints.min, paddle.constraints.max);

}


/** Moves the ball*/

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



function handleBallBounce(ball, paddle) {
    const overlap = centredRectanglesOverlap(ball, paddle);

    if (overlap) {

        ball.y = paddle.y - ball.height / 2 - ball.height / 2;
        ball.velocity.y *= -1;
    }
}

function drawPaddle(paddle) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(paddle.fill);
    rect(paddle.x, paddle.y, paddle.width, paddle.height);
    pop();
}


function drawBall(ball) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.width, ball.height);
    pop();
}

function drawBrick(brick) {

    push();
    rectMode(CENTER);
    fill(brick.fill);
    noStroke(0);
    rect(brick.x, brick.y, brick.width, brick.height);
    pop();


}

function createAllBricks() {
    for (let row = 0; row < numberOfRows; row++) {
        if (row % 2 === 0) {
            col = 12;
            offset = brickWidth / 4;
        }
        else {
            col = 11;
            offset = 0;
        }
        for (let col = 0; col < numberOfColumns; col++) {

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
            bricks.push(newBrick);
        }


    }
}

function handleBrickFall(brick, ball) {
    const overlap = centredRectanglesOverlap(brick, ball);
    brick.y = brick.y + brick.velocity.y;


    if (brick.velocity.y === 0 && overlap) {

        //square.y = brick.y - brick.height / 2 - square.height / 2;
        ball.velocity.y *= -1;
        brick.velocity.y = 2;
    }


}

function handlePaddleBlock(brick, paddle) {
    //const overlap = centredRectanglesOverlap(brick, paddle);
    const d = dist(paddle.x, paddle.y, brick.x, brick.y);
    // Check if it's an overlap
    const block = (d < paddle.width / 2 + brick.width / 2);

    // to figure out if it is the right try paddle.x + paddle.width / 2;
    // to figure out if it is on the left try paddle.x - paddle.width / 2; 

    if (block) {

        paddle.constraints.max = brick.x + brick.width / 2;
        paddle.constraints.min = brick.x + brick.width / 2;
        paddle.x = constrain(mouseX, paddle.constraints.min, paddle.constraints.max);
    }
}


/** /
function handleBrickCaught(brick, paddle) {
    const overlap = centredRectanglesOverlap(brick, paddle);


    if (brick.velocity.y === 0 && overlap) {

        if ("paddle overlaps a brick to the right") {
            paddle.constraints.max = brick.x + brick.width / 2;
        }

        else if ("paddle overlaps a brick to the left") {
            paddle.constraints.min = brick.x + brick.width / 2;
        }

    }



}
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

