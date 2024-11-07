/**
 * Frogfrogfrog
 * Bianca Gauthier
 * 
 * A game where a frog catches flies and is trying to catch the rarest one to be fully full and win the game. he eats a 
 * variety of flies but be carefull not all are delicious and harmless. Only after reaching 30 points will the winning fly appear
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * - Avoid the dangerous evil flies and cath the good flies
 * 
 * Made with p5
 * https://p5js.org/
 * 
 * 
 * Plan:
 * -everytime you catch a fly a number goes up by one
 * 
 * 
 * Show the score somewhere on the screen as a number (top corner)
 * -(other idea: you could lose points fors escaped flies.if you miss a fly you loose points )
 * 
 * (other idea: movement, missing,.....)
 * 
 * pseudocode:
 * 
 * 
 * 
 */


"use strict";

//this array will be for the commonFly were they are different black circles (4 of them)
//has a position, size and buzziness
let flies = [
    {
        x: 0,
        y: 125,
        size: 10,
        buzziness: 6
    },
    {
        x: 0,
        y: 170,
        size: 11,
        buzziness: 5
    },
    {
        x: 0,
        y: 50,
        size: 12,
        buzziness: 7
    },
    {
        x: 0,
        y: 50,
        size: 13,
        buzziness: 4
    },
];
//This array contains the evilFly that are red circle that will make the player loose points (3 of them) 
//has a position, size and speed
let evilFlies = [
    {
        x: -10,
        y: 100,
        fill: "#800000",
        size: 17,
        speed: 5
    },
    {
        x: -10,
        y: 100,
        fill: "#B22222",
        size: 16,
        speed: 6
    },
    {
        x: -10,
        y: 100,
        fill: "#dc143c",
        size: 15,
        speed: 4
    },


];
// this will be the Title Screen at the begging of the game that will have the title and instruction on the types of flies (uses and image)
//has position and image
let titleScreen = {
    x: 640,
    y: 480,
    image: undefined
};

//this will be the You Win background screen that will appear when you cath the winning fly. (uses and image)
//has position and image
let winningBackground = {
    x: 640,
    y: 480,
    image: undefined
};

//this will be the Game Over background screen that will appear when you run out of lives. (uses and image)
//has position and image
let gameOverBackground = {
    x: 640,
    y: 480,
    image: undefined
};

//this is the background screen when we are in "game" state. this is just a visual thing (uses and image)
//has position and image
let backgroundScreen = {
    x: 0,
    y: 300,
    image: undefined
};

//this array is for the lilyPads that will be falling from the top of the screen to block the frog tongue (uses an image)
//has a position, size , velocity position and an image
let lilyPads = [
    {
        x: 400,
        y: 40,
        size: 70,
        image: undefined,
        velocity: {
            x: 0,
            y: 1,
        }
    },
    {
        x: 400,
        y: 40,
        size: 70,
        image: undefined,
        velocity: {
            x: 0,
            y: 1,
        }
    },
];

// Our frog
const frog = {
    // The frog's body has a position and size
    body: {
        x: 320,
        y: 520,
        size: 150
    },
    // The frog's tongue has a position, size, speed, and state
    tongue: {
        x: undefined,
        y: 480,
        fill: "red",
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle", // State can be: idle, outbound, inbound
    }
};

// Has a position, size, and speed of horizontal movement and velocity position
const buzzyFly = {
    x: -10,
    y: 200, // Will be random
    size: 13,
    speed: 3,
    velocity: {
        x: 2,
        y: 3,
    }
};

//is a special fly that makes players gain more points. has a position, size and speed of a wiggle up and down 
const specialFly = {
    x: -10,
    y: 100,
    size: 20,
    speed: 2,
    wiggleAngle: 0
};

//the winning Fly will make players win the game if it is cought . has a position, size and speed of a wiggle up and down
const winningFly = {
    x: 0,
    y: 200,
    size: 12,
    speed: 3,
    wiggleAngle: 0
};

// will be the heart image next to the lives score. (uses and image)
let heart = {
    x: 0,
    y: 0,
    image: undefined,
};

//the current score
let score = 0;

//the lives of the player
let lives = 5;

//the current state 
let state = "title"; //can be "title" or "game" or "WIN" "GameOver"


// All of the images that are used in the game if in the comment you see -> (uses and image) than this is where the image is called
function preload() {
    lilyPads.image = loadImage("assets/images/block_lilyPad_big.png");
    backgroundScreen.image = loadImage("assets/images/Game_Background.jpg");
    titleScreen.image = loadImage("assets/images/Title_Screen.jpg");
    gameOverBackground.image = loadImage("assets/images/GameOver_Screen.jpg");
    winningBackground.image = loadImage("assets/images/Winning_Screen.jpg");
    heart.image = loadImage("assets/images/Heart.png");
}

/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the flies its first random position and makes the flies reset if they are eaten
    resetBuzzyFly();
    resetSpecialFly();
    resetWinningFly();
}

// display the state of the game
function draw() {
    if (state === "title") {
        title();
    }

    else if (state === "game") {
        game();
    }

    else if (state === "gameOver") {
        gameOver();
    }

    else if (state === "winning") {
        winning();
    }
}

//the title screen, this is where its image is called to be displayed
function title() {
    background(titleScreen.image);
    score = 0;
    lives = 5;
}

// this is what is present in the game state
function game() {

    //calls the background image 
    background(backgroundScreen.image);

    moveBuzzyFly();
    moveSpecialFly();
    moveWinningFly();
    moveFrog();
    moveTongue();


    checkTongueBuzzyFlyOverlap();
    checkTongueWinningFlyOverlap();
    checkTongueSpecialFlyOverlap();

    gameOverScreen();

    drawFrog();
    drawScore();
    drawLives();
    drawHeart();
    drawBuzzyFly();
    drawSpecialFly();
    drawWinningFly();

    //array for the common flies
    for (let commonFly of flies) {
        moveCommonFly(commonFly);
        drawCommonFly(commonFly);
        checkTongueCommonFlyOverlap(commonFly)
        // resetCommonFly(commonFly);

    };
    //array for the evil flies
    for (let evilFly of evilFlies) {
        moveEvilFly(evilFly);
        drawEvilFly(evilFly);
        checkTongueEvilFlyOverlap(evilFly);
    };

    //array for the lilyPad
    for (let lilyPad of lilyPads) {
        moveLilyPad(lilyPad);
        drawLilyPad(lilyPad);
        checkTongueLilyPadOverlap(lilyPad);
    };

}
/**This is both of the end screen options 
 * 
 * 
 */
// This displayes the image that shows the GameOver screen that tell player they lost the game
function gameOver() {
    background(gameOverBackground.image);
}
//this dsiplayes the image tthat show the Win screen that tell player they won the game
function winning() {
    background(winningBackground.image);
}

/**
 * This is the drawing and the the movement of the lily Pads 
 * 
 * 
 * 
 * 
 */
//This draws the lilypad that will fall down from the sky and block the frog tongue. it uses an image
function drawLilyPad(lilyPad) {
    push();
    imageMode(CENTER);
    image(lilyPads.image, lilyPad.x, lilyPad.y);
    pop();
}

//this makes the lilypads move downwards from the top of the screen to the bottom
function moveLilyPad(lilyPad) {
    lilyPad.x = lilyPad.x + lilyPad.velocity.x;
    lilyPad.y = lilyPad.y + lilyPad.velocity.y;
    // check if it reaches the bottom and then resets it 
    if (lilyPad.y > 900) {
        resetLilyPad(lilyPad);
    }
}

/**
 * This Will be all the functions that will be moving each of the types of Flies 
 * 
 * there should be the 
 * -commonFly
 * -buzzyFly
 * -evilFly
 * -specialFly 
 * -winningFly
 * 
 * 
 * 
 * 
 * 
 * 
 */

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */

// this will move the Common flies which are the black circles. they move in a stright line from left to right
function moveCommonFly(commonFly) {
    commonFly.x += commonFly.buzziness
    // Handle the fly going off the canvas if it goes beyond the canvas it resets the flies
    if (commonFly.x > width) {
        resetCommonFly(commonFly);
    }
}

//this makes the buzzy fly which is the purple circle move this fly move horizontally in a shaky movement
function moveBuzzyFly() {
    // Move the buzzy fly  in a buzzy eratic movement 
    buzzyFly.x += buzzyFly.velocity.x;
    buzzyFly.y += buzzyFly.velocity.y;
    let flyChange = random(1, 2);

    if (flyChange >= 0.1) {
        buzzyFly.velocity.y = random(-2, 2)
    }

    buzzyFly.x += buzzyFly.speed;

    //if the score is lower or equal to 5 the buzzy fly will not appear
    if (score <= 5) {
        buzzyFly.speed === 0;
        buzzyFly.x = -10;
    }

    //if the score is higher then 5 than the buzzy fly will appear. 
    else if (score > 5) {
        buzzyFly.x += buzzyFly.speed;
    }

    //this will reset the buzzy fly. it isnt exctly at the end of the canvas as the fly needs to appear less regularly
    //makes it that it takes longer for the fly to reset
    if (buzzyFly.x > 3000) {
        resetBuzzyFly();
    }

}

// this will make the Evil flies which are the red cirlces move. The fly will be moving in a straight horizontal line
function moveEvilFly(evilFly) {
    // The evil fly does not appear if the score is bellow or equal to 10
    if (score <= 10) {
        evilFly.speed === 0;
        evilFly.x = -10;
    }
    //if the score is higher then 10 than the evil fly will apear to make it harder
    else if (score > 10) {
        evilFly.x += evilFly.speed;
    }

    // Handle the evil fly going off the canvas and reset it so it comes back
    if (evilFly.x > 1500 && score <= 15) {
        resetEvilFly(evilFly);
    }

    else if (evilFly.x > width && score > 15) {
        resetEvilFly(evilFly);
    }
}
//this will make the special fly move which is a gold circle. This fly moves horizontally in a wave up and down motion
function moveSpecialFly() {
    // Move on x
    specialFly.x += specialFly.speed;
    // Increase the wiggle angle (for sine)
    specialFly.wiggleAngle += 0.09;
    // Calculate the number between -1 and 1 for the amount of wiggle
    const wiggleAmount = sin(specialFly.wiggleAngle);
    // Convert from -1..1 to an actual distance between 0..100
    specialFly.y = map(wiggleAmount, -1, 0, 0, 100);

    // if the score is lower than 15 than the fly will not appear 
    if (score < 15) {
        specialFly.speed = 0;
        specialFly.x = -10;
    }

    // if the score is equal or higher than 15 the fly will appear
    else if (score >= 15) {
        specialFly.x += specialFly.speed = 2;
    }

    // this helps rest the fly. the amount is wider than the canvas, to make the fly take longuer to reappear on screen
    if (specialFly.x > 2000) {
        resetSpecialFly();
    }
}

//this will make the winnign fly move which is the pink circle. this fly should move in a up and down wave
function moveWinningFly() {
    //this makes the fly move
    winningFly.x += winningFly.speed;
    // Increase the wiggle angle (for sine)
    winningFly.wiggleAngle += 0.05;
    // Calculate the number between -1 and 1 for the amount of wiggle
    const wiggleAmount = sin(winningFly.wiggleAngle);
    // Convert from -1..1 to an actual distance between 0..100
    winningFly.y = map(wiggleAmount, -1, 0, 0, 100);

    // if the score is lower than 30, the fly will not appear
    if (score < 30) {
        winningFly.speed === 0;
        winningFly.x = -10;
    }

    //if the score is 30 or higher the fly will appear
    else if (score >= 30) {
        winningFly.x += winningFly.speed;
    }

    // Handle the special fly going off the canvas
    if (winningFly.x > width) {
        resetWinningFly();
    }
}


/**
 *
 *  Draws the fly parameter to canvas
 * all the flies that will be drawn are 
 * 
 * -commonFly
 * -buzzyFly
 * -evilFly
 * -specialFly
 * -winningFly
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

// this draws the CommonFly that are in the array. there should be 4 black circles of different sizes that should be drawn.
function drawCommonFly(commonFly) {
    push();
    noStroke();
    fill(0); // black
    ellipse(commonFly.x, commonFly.y, commonFly.size);
    pop();
}

// Draws a purple small circle 
function drawBuzzyFly() {
    push();
    noStroke();
    fill("#663399"); // purple
    ellipse(buzzyFly.x, buzzyFly.y, buzzyFly.size);
    pop();
}

//draws the evil flies. This contains the array. it should draw 3 circle of different shades of red and different sizes.
function drawEvilFly(evilFly) {
    push();
    noStroke();
    fill(evilFly.fill);
    ellipse(evilFly.x, evilFly.y, evilFly.size);
    pop();
}

//Draws the special fly. It should look like a gold circle
function drawSpecialFly() {
    push();
    fill("gold");
    noStroke();
    ellipse(specialFly.x, specialFly.y, specialFly.size);
    pop();
}

// Draws the winning fly. it should look like a small deep pink circle
function drawWinningFly() {
    push();
    noStroke();
    fill("#FF1493"); //deepPink
    ellipse(winningFly.x, winningFly.y, winningFly.size);
    pop();
}

/**
 * This will draw the different points
 * this contains all of the scores 
 * and heart images that demonstraits the point systems to the player
 * 
 * 
 * -score
 * -lives
 * -heart
 * 
 * 
 * 
 * 
 * 
 * 
 */

//draws the players score. It starts at 0 and will go up. shows a big black number at the top right corner of the canvas
function drawScore() {
    push();
    textAlign(RIGHT, TOP);
    fill("black");
    textStyle(BOLD);
    textSize(128);
    text(score, width, 0);
    pop();
}

//Draws the lives of the player. It starts at 5 and goes down to -1. shows a big pink number at the top left corner of the canvas
function drawLives() {
    push();
    textAlign(LEFT, TOP);
    fill("pink");
    textStyle(BOLD);
    textSize(128);
    text(lives, 0, 0);
    pop();
}

// this will display the image of a pink heart that is at the right of the lives number at the top left.
function drawHeart() {
    push();
    imageMode(TOP);
    image(heart.image, 90, 0);
    pop();
}

/**
 * this will contain all of the functions that will resets the flies
 * will also reset the lilypads 
 * 
 * -commonFly
 * -buzzyFly
 * -evilFly
 * -specialFly
 * -winningFly
 * -lilyPad
 * 
 * 
 * 
 * 
 * 
 * 
 */
// resets the lilyPads back to the top of the screen when it goes past the bottom of the canvas
function resetLilyPad(lilyPad) {
    //the lilypads will reappear at a random x position
    lilyPad.x = random(10, 400);
    lilyPad.y = -10;
}

//resets the black circles back to the left of the canvas when it goes past the right side of the canvas.
function resetCommonFly(commonFly) {
    commonFly.x = -10;
    //the fly will appear in a random y position
    commonFly.y = random(0, 300);
}

//resets the purple circle back to the left of the canvas when it goes past the right side of the canvas.
function resetBuzzyFly() {
    buzzyFly.x = -50;
    //the fly will appear in a random y position
    buzzyFly.y = random(0, 300);
}

//resets the red circles back to the left of the canvas when it goes past the right side of the canvas.
function resetEvilFly(evilFly) {
    evilFly.x = -20;
    //the fly will appear in a random y position
    evilFly.y = random(0, 400);
}

//resets the gold circle back to the left of the canvas when it goes past the right side of the canvas.
function resetSpecialFly() {
    specialFly.x = -50;
    //the fly will appear in a random y position
    specialFly.y = random(0, 500);
}

//resets the pink circle back to the left of the canvas when it goes past the right side of the canvas.
function resetWinningFly() {
    winningFly.x = -10;
    //the fly will appear in a random y position
    winningFly.y = random(0, 400);
}

/**
 * 
 * this contains the aspects of the frog
 * 
 * it will draw teh frog body, tongue seperatly 
 * 
 * it will also move the frog body 
 * 
 * it will also move the tongue 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */

//Moves the frog to the mouse position on x
function moveFrog() {
    frog.body.x = mouseX;
}

/**
 * Handles moving the tongue based on its state
 */
function moveTongue() {
    // Tongue matches the frog's x
    frog.tongue.x = frog.body.x;

    // If the tongue is idle, it doesn't do anything
    if (frog.tongue.state === "idle") {
        // Do nothing
    }

    // If the tongue is outbound, it moves up
    else if (frog.tongue.state === "outbound") {
        frog.tongue.y += -frog.tongue.speed;
        // The tongue bounces back if it hits the top
        if (frog.tongue.y <= 0) {
            frog.tongue.state = "inbound";
        }
    }

    // If the tongue is inbound, it moves down
    else if (frog.tongue.state === "inbound") {
        frog.tongue.y += frog.tongue.speed;

        // The tongue stops if it hits the bottom
        if (frog.tongue.y >= height) {
            frog.tongue.state = "idle";
            frog.tongue.fill = "red";
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill(frog.tongue.fill);
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue

    push();
    stroke(frog.tongue.fill);
    strokeWeight(frog.tongue.size);
    line(frog.tongue.x, frog.tongue.y, frog.body.x, frog.body.y);
    pop();

    // Draw the frog's body
    push();
    fill("green");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}

/**
 * 
 * this contains all of the overlaps
 * it checks to see if the tongue of the frog comes in contact with a fly or the lilypad
 * 
 * it also adds the aspects of if the tongue does come in contact what happens
 * 
 * elements that will check for overlap:
 * 
 * -lilyPad
 * -commonFly
 * -buzzyFly
 * -evilFly
 * -specialFly
 * -winningFly
 * 
 * 
 * 
 * 
 * 
 * 
 */

//checks if the frog tongue come in contact with the lilypad, if it does the tongue will be blocked and go back down
function checkTongueLilyPadOverlap(lilyPad) {
    // Get distance from tongue to the lilypad
    const d = dist(frog.tongue.x, frog.tongue.y, lilyPad.x, lilyPad.y);
    // Check if it's an overlap
    const block = (d < frog.tongue.size / 2 + lilyPad.size / 2);
    //if the tongue does come in contact then it is blocked and goes back down
    if (block) {
        frog.tongue.state = "inbound";
    }
}

//checks if the frog tongue comes in contact with the common fly(black circles), if it does then the fly is eaten and points go up
function checkTongueCommonFlyOverlap(commonFly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, commonFly.x, commonFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + commonFly.size / 2);

    if (eaten) {
        // Increase  the Score by 1
        score = score + 1;
        // Reset the fly
        resetCommonFly(commonFly);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

// checks if the frog tongue come in contact with the buzzy fly (purple circle), if it does the score will be effected
function checkTongueBuzzyFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, buzzyFly.x, buzzyFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + buzzyFly.size / 2);

    if (eaten) {
        // Increase the Score by 3
        score = score + 3;
        // Reset the fly
        resetBuzzyFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

//check if the frog tongue comes in contact with evil flies (red circle), if it does the tongue, score and lives are effected
function checkTongueEvilFlyOverlap(evilFly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, evilFly.x, evilFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + evilFly.size / 2);

    if (eaten) {
        // Decrease the Score by 3
        score = score - 3;
        // Decrease the lives by 1
        lives = lives - 1;
        //the tongue will become white to depict the frog being injured
        frog.tongue.fill = "white";
        // Reset the fly
        resetEvilFly(evilFly);
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

// checks if the frog tongue comes in contact with the special fly (yellow circle) if it does the score will be effected
function checkTongueSpecialFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, specialFly.x, specialFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + specialFly.size / 2);

    if (eaten) {
        // Increase the Score by 5
        score = score + 5;
        // Reset the fly
        resetSpecialFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

// check if the frog tongue come in contact with the winning fly, if it dies the state of the game will be effected
function checkTongueWinningFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, winningFly.x, winningFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + winningFly.size / 2);

    if (eaten) {
        //if it overlaps the game finishes and the player wins. therefore the You win screen will appear.
        state = "winning";
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

// if the lives end up at -2 the screen will show a game over screen. to show players ahve lost the game
function gameOverScreen() {
    if (lives === -2) {
        state = "gameOver"
    }
}

//to get players from the title screen to the game play
//starts at the title if we click the mouse when we are at the title screen, this will then bring the player to the game screen 
function mousePressed() {
    if (state === "title") {
        state = "game";

    }

    // if the player won the game and are at the winning screen they can click the mouse to bring them back to the title screen.
    //if they want to replay the game
    else if (state === "winning") {
        state = "title";
        score = 0;
        lives = 5;

    }

    //if the player lose the game and are at the game Over screen they can click the mouse to bring them back to the title screen 
    //if they want to replay the game
    else if (state === "gameOver") {
        state = "title";
        score = 0;
        lives = 5;

    }
    // if the state of the game is on the game screen then we can start playing the game (the clicking dosent do anything anymore)
    else if (state === "game") {
        if (frog.tongue.state === "idle") {
            frog.tongue.state = "outbound";
        }
    }


}




///I want to make a fly woble not be straight
////I want the frog tongue to flicker when he eats the red fly because they are dangerous, show the frog is hurt,  (maybe see if the fill can change)
////if eaten the evil fly more than 3 time its a game over
////I want a fly to be super zoomy like crazy. I want to act differently than the rest
//, if it is caught the player has to click a spefic key 10 time in a certain amount of time to win the game
//I want multiple of the same fly to appear more than once at the same time random.
//frog tobgue move angle

