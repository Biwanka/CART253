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
        x: 500,
        y: 648,
        fill: "red",
        width: 30,
        height: 45,
        active: true,
        velocity: {
            x: 0,
            y: 2
        }
    },
];

const active = true;


const ball = {
    x: 500,
    y: 100,
    fill: "white",
    width: 12,
    height: 12,
    velocity: {
        x: 3,
        y: 3
    }
};

// Our paddle
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

const gravity = 0.1;

//
function setup() {
    createCanvas(1000, 680);
}


//
function draw() {
    background("grey");

    moveLaunchPaddle(launchPaddle);
    moveSpring(launchPaddle);
    moveBall(ball);

    drawLaunchPaddle(launchPaddle);
    drawBall(ball);

    for (let brick of bricks) {
        if (brick.active === true) {
            moveBrick(brick);
            handleBrickDestroy(brick, ball);
            handleBrickLaunch(brick);
            drawBrick(brick);
        }
    };
}

/**
 * Moves the paddle
 */
function moveLaunchPaddle(launchPaddle) {
    launchPaddle.top.x = constrain(mouseX, 30, 970);
    launchPaddle.base.x = constrain(mouseX, 30, 970);
}

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
    if (ball.y > 300 || ball.y < 0) {
        ball.velocity.y *= -1;
    }
}

function moveBrick(brick) {
    brick.velocity.y = brick.velocity.y + gravity;

    brick.y = brick.y + brick.velocity.y;

    brick.x = launchPaddle.top.x;
}

function handleBrickLaunch(brick) {
    const overlap = centredRectanglesOverlap(brick, launchPaddle.top);

    if (overlap) {

        brick.y = launchPaddle.top.y - launchPaddle.top.height / 2 - brick.height / 2;
        brick.velocity.y *= -1;
    }
}

function drawLaunchPaddle(launchPaddle) {

    push();
    rectMode(CENTER);
    noStroke();
    fill(launchPaddle.top.fill);
    rect(launchPaddle.top.x, launchPaddle.top.y, launchPaddle.top.width, launchPaddle.top.height);
    pop();

    push();
    rectMode(CENTER);
    noStroke();
    fill(launchPaddle.base.fill);
    rect(launchPaddle.base.x, launchPaddle.base.y, launchPaddle.base.width, launchPaddle.base.height);
    pop();

    push();
    stroke(launchPaddle.spring.fill);
    strokeWeight(launchPaddle.spring.size);
    line(launchPaddle.spring.x, launchPaddle.spring.y, launchPaddle.base.width);
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


function handleBrickDestroy(brick, ball) {
    const overlap = centredRectanglesOverlap(brick, ball);

    if (overlap) {
        brick.active = false;
        ball.velocity.y *= -1;
    }
    if (brick.active === false) {

    }
}

function mousePressed() {

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

