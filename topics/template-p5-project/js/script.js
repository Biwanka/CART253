/**
 * Bouncy Ball Ball Bonanza
 * Pippin Barr
 * 
 * The starting point for a ball-bouncing experience of
 * epic proportions!
 */

"use strict";

// Our ball
const ball = {
    x: 300,
    y: 20,
    width: 10,
    height: 10,
    velocity: {
        x: 0,
        y: 2
    }
};

// Our paddle
const paddle = {
    x: 300,
    y: 280,
    width: 80,
    height: 10
};

const gravity = 0.1;

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 300);
}


/**
 * Move and display the ball and paddle
*/
function draw() {
    background("#87ceeb");

    movePaddle(paddle);
    moveBall(ball);

    handleBounce(ball, paddle);

    drawElement(paddle);
    drawElement(ball);
}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
    paddle.x = mouseX;

}

/**
 * Moves the ball
 */
function moveBall(ball) {

    ball.velocity.y = ball.velocity.y + gravity;

    ball.x = ball.x + ball.velocity.x;
    ball.y = ball.y + ball.velocity.y;

}

function handleBounce(ball, paddle) {
    const overlap = centredRectanglesOverlap(ball, paddle);
    if (overlap) {

        ball.y = paddle.y - padlle.height / 2 - ball.height / 2;
        ball.velocity.y *= -1;   //ball.velocity.y = -ball.velocity.y is another way to write it 

    }
}
/**
* Returns true if a and b overlap, and false otherwise
* Assumes a and b have properties x, y, width and height to describe
* their rectangles, and that a and b are displayed centred on their
* x,y coordinates.
*/
function centredRectanglesOverlap(a, b) {
    return (a.x + a.width / 2 > b.x - b.width / 2 &&
        a.x - a.width / 2 < b.x + b.width / 2 &&
        a.y + a.height / 2 > b.y - b.height / 2 &&
        a.y - a.height / 2 < b.y + b.height / 2);
}

/**
 * Draws the paddle on the canvas
 */
function drawElement(element) {
    push();
    rectMode(CENTER);
    noStroke();
    fill("pink");
    rect(element.x, element.y, element.width, element.height);
    pop();
}
