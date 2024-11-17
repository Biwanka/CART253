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

// Our ball
const ball = {
    x: 500,
    y: 500,
    fill: "white",
    size: 20,
    // width: 15,
    // height: 15,
    velocity: {
        x: 0,
        y: 2
    }
};

const square = {
    x: 600,
    y: 300,
    fill: "white",
    width: 15,
    height: 15,
    velocity: {
        x: 0,
        y: 2
    }

};

// Our paddle
const paddle = {
    x: 500,
    y: 750,
    fill: "black",
    width: 110,
    height: 10
};

const gravity = 0.1;

//
function setup() {
    createCanvas(1000, 800);
}


//
function draw() {
    background("grey");

    movePaddle(paddle);
    // moveBall(ball);
    moveSquare(square);

    // handleBounce(ball, paddle);
    handleSquareBounce(square, paddle);

    drawPaddle(paddle);
    // drawBall(ball);
    drawSquare(square);
    drawBricks();

}

/**
 * Moves the paddle
 */
function movePaddle(paddle) {
    paddle.x = mouseX;

}

/**
 * Moves the ball

function moveBall(ball) {

    ball.velocity.y = ball.velocity.y + gravity;

    ball.x = ball.x + ball.velocity.x;
    ball.y = ball.y + ball.velocity.y;

}
 */
function moveSquare(square) {
    square.velocity.y = square.velocity.y + gravity;

    square.x = square.x + square.velocity.x;
    square.y = square.y + square.velocity.y;

}
/** 
function handleBounce(ball, paddle) {
    //const overlap = centredRectanglesOverlap(ball, paddle);
    const d = dist(ball.x, ball.y, paddle.x, paddle.y);
    // Check if it's an overlap
    const overlap = (d < ball.size / 2 + paddle.width / 2 + paddle.height / 2);
    if (overlap) {

        ball.y = paddle.y - paddle.height / 2 - ball.size / 2;
        ball.velocity.y *= -1;   //ball.velocity.y = -ball.velocity.y is another way to write it 

    }
}
*/
function handleSquareBounce(square, paddle) {
    const overlap = centredRectanglesOverlap(square, paddle);

    if (overlap) {

        square.y = paddle.y - paddle.height / 2 - square.height / 2;
        square.velocity.y *= -1;   //ball.velocity.y = -ball.velocity.y is another way to write it 

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
/**
function drawBall(ball) {
    push();
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.size);
    pop();
}
*/
function drawSquare(square) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(square.fill);
    rect(square.x, square.y, square.width, square.height);
    pop();
}

function drawBricks() {
    let brick = {
        x: 50,
        y: 100,
        width: 40,
        height: 25,
        fill: "red"
    };
    let x = 50;
    let y = 100;


    while (x <= width) {
        fill(brick.fill);
        noStroke();
        rect(brick.x, brick.y, brick.width, brick.height);

        x = x + 40;
        y = y + 25;




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

/**
 * Draws the paddle on the canvas
 
function drawElement(element) {
    push();
    rectMode(CENTER);
    noStroke();
    fill(element.fill);
    rect(element.x, element.y, element.width, element.height);
    pop();
}
*/

