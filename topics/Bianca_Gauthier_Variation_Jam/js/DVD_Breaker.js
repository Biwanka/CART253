/**
 * Brick Breaker: DVD BREAKER
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
 * 3- DvD logo. because the game i chose had to do with something from my past i decided to all add another aspect that touches on that.
 * I am going to use the boucing DVD logo. it was a common thing if you ever owned a DVD that when it was left on pause for long
 * the logo would appear and start bouching on the 4 sides of the screen. The main Hype was when the logo actually finally hit the 
 * corner of the screen it was the biggest satisfaction. Mainly i will use the top right corner (changed because it was very long to get specifically
 * that corner so all corner ). so i will change teh ball to be the 
 * DvD logo and the ball will be able to hit the side of the screen. there will be bricks blocking the top right corner.
 * Even if the player gets ride of all the bricks they will not win the game they need to continue until the DVD logo hits one of the corners
 * I have tested and it is possible 
 * 
 
 */

"use strict";
//our DVD LOGO
let ball = {
    x: 100,
    y: 300,
    fill: "grey",
    width: 30,
    height: 30,
    velocity: {
        x: 3,
        y: 3
    },
    image: undefined
};

// Our paddle
const paddle = {
    x: 500,
    y: 665,
    fill: "black",
    width: 150,
    height: 10
};

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

const brickStartX = 550;
const brickStartY = 100;
const brickGapX = 15;
const brickGapY = 25;
const brickWidth = 50;
const brickHeight = 25;
const active = true;

let col = 0;
let row = 0;
let numberOfColumns = 5;
let numberOfRows = 6;
let offset = brickWidth / 4;


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

function preload() {
    titleScreen.image = loadImage("assets/images/DVD_Breaker_Title.png");
    winScreen.image = loadImage("assets/images/YOU_WIN.png");
    ball.image = loadImage("assets/images/DVD.png");
}


//draws the canvas that the game is displayed on.
function setup() {
    createCanvas(1000, 680);
    createAllBricks(bricks); //creates all the bricks using the variables ontop 
}

// display the state of the game
function draw() {
    if (state === "title") {
        title();
    }

    else if (state === "game") {
        game();
    }

    else if (state === "win") {
        win();
    }
}

function title() {
    background(titleScreen.image);

}

//where all elements are called 
function game() {
    background("grey");

    movePaddle(paddle);
    moveBall(ball);

    handleBallBounce(ball, paddle);

    drawPaddle(paddle);
    drawBall(ball);

    callYouWin();

    for (let brick of bricks) {
        if (brick.active === true) {
            drawBrick(brick);
            handleBrickDestroy(brick, ball);
        }
    };
}

//This is the end screen options 
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
 * the ball(dvd logo)
 * the paddle
 *
 *
 *
 *
 *
 */
// Moves the paddle. with the mouse. the paddle can only go left and right
function movePaddle(paddle) {
    paddle.x = constrain(mouseX, 30, 970);
}

/**
 * move the ball. the ball will bounce off the paddle, the canvas wall and the bricks. (dvd logo)
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
    if (ball.y > height || ball.y < 0) {
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

//uses an image of the dvd logo
function drawBall(ball) {
    push();
    rectMode(CENTER);
    imageMode(CENTER);
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.width, ball.height);
    image(ball.image, ball.x, ball.y,);
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
    ball.y = random(400, 450);
    ball.x = random(100, 900);
}

/**  
 * 
 *  Makes the Ball bounce when the ball comes in contact with the paddle. the dvd logo can bounce on all 4 corner but you can use the 
 * paddle to try and see if you cna get a better direction
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
 *  this is where the brick is effected if it touches the ball. if the brick touches the ball it will disapear.
 * i didnt change much this effect . as players may think they win if they rid of all the bricks
 */
function handleBrickDestroy(brick, ball) {
    const overlap = centredRectanglesOverlap(brick, ball);

    if (overlap) {

        brick.active = false;
        ball.velocity.y *= -1;
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
//if the DVD logo lands in any of the corners they will win. at first i did if perfectly but because the logo was maybe to big, it
//never counted as a win so i left it as the image is bigger then the ball istself. 
//i have tried and it does work and it is possible to hit one of the corner, the time it takes varied but just as satisfying !!!!
function callYouWin() {
    if (ball.x <= 2 && ball.y <= 2) {
        state = "win";
    }

    else if (ball.x >= 998 && ball.y <= 2) {
        state = "win";
    }

    else if (ball.x <= 2 && ball.y >= 678) {
        state = "win";
    }

    else if (ball.x >= 998 && ball.y >= 678) {
        state = "win";
    }
}

function mousePressed(brick) {

    //to get players from the title screen to the game play
    //starts at the title if we click the mouse when we are at the title screen, this will then bring the player to the game screen 
    if (state === "title") {
        state = "game";
    }
    // if the player won the game and are at the winning screen they can click the mouse to bring them back to the title screen.
    //if they want to replay the game
    else if (state === "win") {
        state = "title";
        brick.active = true;
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

