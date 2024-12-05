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
 * 4- Reverse. I dedcide to make a version that will be the contrary of the concept of the original game. 
 * instead of bouncing a ball on a paddle to break the bricks, instead the player will need to bounce a brick to a ball. like a brick on a trampoline
 * that is moving in the top screen. the player will have a pile of bricks ( still need to implement these visual later). i 
 * Have other ideas with different balls or maybe certain bricks need to only hit the top of the ball but thats for later.
 * 
 * basic idea i thought it would be funny to have a brick on a trampoline.
 *  */


"use strict";

//this is our ball ( a white circle)
const ball = {
    //a white ball

    x: 500,
    y: 100,
    fill: "white",
    width: 12,
    height: 12,
    velocity: {
        x: 4,
        y: 4
    }
    /** this will be implemented in another time but i wanted to have different colour balls and that the palyer is told the color of ball
     * that they need to touch the brick with. if they touch the wrong colour they lose a life. and the colour would change with a timer or after 
     * everytime they break one of the brick.
        */
    //blue ball
    /**   {
          x: 400,
          y: 50,
          fill: "blue",
          width: 10,
          height: 10,
          velocity: {
              x: 4,
              y: 4
          }
      },
      // pink ball
      {
          x: 300,
          y: 150,
          fill: "pink",
          width: 15,
          height: 15,
          velocity: {
              x: 3,
              y: 3
          }
      },
  //yellow ball
      {
          x: 600,
          y: 120,
          fill: "yellow",
          width: 13,
          height: 13,
          velocity: {
              x: 4,
              y: 3
          }
      },*/

};

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

const active = true;
const gravity = 0.1;

//the lives of the player 
let lives = 3;

//this is the different screen for the game and what we will use to switch in between.
let state = "title" // "game" , "win" , "gameOver"


//this is the counter where if a player breakes a brick then it goes up by one. it is how the player can win the game.
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
    titleScreen.image = loadImage("assets/images/Bounce_Breaker_Only_Win.png");
    winScreen.image = loadImage("assets/images/YOU_WIN.png");
    gameOverScreen.image = loadImage("assets/images/Game_Over.jpg");
}


//draws the canvas that the game is displayed on.
function setup() {
    createCanvas(1000, 680);
    resetBrick(bricks);

}

// display the state of the game
function draw() {
    if (state === "title") {
        title();
        bricksLeft = 0;
        // lives = 3;
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
    bricksLeft = 0;
}

//where all elements are called 
function game() {
    background("grey");

    moveLaunchPaddle(launchPaddle);
    moveSpring(launchPaddle);
    moveBall(ball);

    drawLaunchPaddle(launchPaddle);
    drawBall(ball);
    drawBricksLeft();

    callYouWin();
    //callGameOver();


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

    if (keyIsDown('32') && launchPaddle.spring.state === "idle") {
        launchPaddle.spring.state = "launched";
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
 * when it is launched then it will go up an down like its bouncing
 */
function moveBrick(brick) {
    brick.velocity.y = brick.velocity.y + gravity;

    brick.y = brick.y + brick.velocity.y;
    brick.x = launchPaddle.top.x;
    if (brick.y > launchPaddle.top.y) {
        brick.velocity.y *= -1;
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

//Draws the bricks that the player need to break 
function drawBricksLeft() {
    push();
    textAlign(LEFT, TOP);
    fill("white");
    textStyle(BOLD);
    textSize(100);
    text(bricksLeft, 0, 0);
    pop();
}

//reset brick back to ontop of the paddle
function resetBrick(brick) {
    brick.x = mouseX;
    brick.y = 645;
    brick.active = true;
    brick.fill = "red";
}

/**
 * this launches the brick. if the brick touches the launch paddle that is activated the brick will go up. the brick 
 * is on a constance boucing movement as if on a trampoline. you click the paddle to make the brick go higher.
 */
function handleBrickLaunch(brick) {
    const overlap = centredRectanglesOverlap(brick, launchPaddle.top);

    if (overlap) {

        brick.y = launchPaddle.top.y - launchPaddle.top.height / 2 - brick.height / 2;
        brick.velocity.y *= -1;
    }
}

/**
 * this is where the brick is effected if it touches the ball. if the brick touches the ball it will disapear.
 */
function handleBrickDestroy(brick, ball) {
    const overlap = centredRectanglesOverlap(brick, ball);

    if (overlap) {
        brick.active = false;
        brick.fill = "grey";
        bricksLeft = bricksLeft + 1;
    }

    if (brick.active === false) {
        resetBrick(brick);
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
//if the player makes the brick come in contact 3 times they win 
function callYouWin() {
    if (bricksLeft === 3) {
        state = "win";
    }
}

/**  havent added the function yet still thinking over the effects and what could cause a game over
function callGameOver() {
    if (lives === 0) [
        state = "gameOver"
    ]
}
*/

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

