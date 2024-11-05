/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tonguevc  
 * 
 * Instructions:
 * - Move the frog with your mouse
 * - Click to launch the tongue
 * - Catch flies
 * 
 * Made with p5
 * https://p5js.org/
 * 
 * Idea:
 * Add a score
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
 * score = O 
 * 
 * 
 * if (the frog cathes a fly)
 *     score= score + 1
 * 
 * 
 * drawScore()
 *  display the score in the top right corner 
 * 
 */


"use strict";
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
        size: 14,
        buzziness: 4
    },
    {
        x: 0,
        y: 50,
        size: 12,
        buzziness: 5
    },
    {
        x: 0,
        y: 50,
        size: 13,
        buzziness: 3
    },
];
//the bad flies that makes player lose points
let evilFlies = [
    {
        x: -10,
        y: 100,
        fill: "#800000",
        size: 14,
        speed: 4
    },
    {
        x: -10,
        y: 100,
        fill: "#B22222",
        size: 16,
        speed: 4
    },
    {
        x: -10,
        y: 100,
        fill: "#B22222",
        size: 15,
        speed: 4
    },


];
let lilyPad = {
    x: 400,
    y: 40,
    size: 50,

    velocity: {
        x: 0,
        y: 1,
    },

    image: undefined

};
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
        fill: "#dc143c",//crimson
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle", // State can be: idle, outbound, inbound
        fills: {
            special: "",
            injured: "#00ff00" //lime
        },
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const buzzyFly = {
    x: 0,
    y: 200, // Will be random
    size: 12,
    speed: 2,
    velocity: {
        x: 2,
        y: 3,
    }
};


//draws a golden fly
const goldPoint = {
    x: -10,
    y: 100,
    size: 20,
    speed: 2,
    wiggleAngle: 0
};

//the Special fly is rare and makes player gain 5 points if caught  /[]
const specialFly = {
    x: 0,
    y: 200,
    size: 10,
    speed: 6
};


//the current score 
let score = 0;
let lives = 3;

//the current state
let state = "title"; //can be "title" or "game" or "WIN" "GameOver"
/**
 * Creates the canvas and initializes the fly
 */

function preload() {
    lilyPad.image = loadImage("assets/images/block_lilyPad.png");
}
function createCommonFly() {
    //generate a random fly
    let commonFly = {
        x: 0,
        y: random(0, height),
        size: flies.size,
        buziness: random(2, 8)
    };
    return commonFly;
}
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetBuzzyFly();
    resetSpecialFly();
    resetGoldPoint();
    resetLilyPad();


}

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

}

function title() {
    background("pink");

    text("Frog Frog Frog", 100, 100);
}

function game() {
    background("#87ceeb");

    moveLilyPad();
    moveBuzzyFly();
    moveSpecialFly();
    moveFrog();
    moveTongue();
    moveGoldPoint();


    checkTongueBuzzyFlyOverlap();
    checkTongueLilyPadOverlap();
    checkTongueSpecialFlyOverlap();


    gameOverScreen();

    drawLilyPad();
    drawFrog();
    drawScore();
    drawLives();
    drawBuzzyFly();
    drawSpecialFly();
    drawGoldPoint();

    for (let commonFly of flies) {
        moveCommonFly(commonFly);
        drawCommonFly(commonFly);
        checkTongueCommonFlyOverlap(commonFly)
        // resetCommonFly(commonFly);

    };

    for (let evilFly of evilFlies) {
        drawEvilFly(evilFly);
        moveEvilFly(evilFly);
        checkTongueEvilFlyOverlap(evilFly);
    }
}
function drawLilyPad() {
    push();
    imageMode(CENTER);
    image(lilyPad.image, lilyPad.x, lilyPad.y);
    pop();
}
function gameOver() {
    background("black");
    text("Game Over", 100, 100);
    fill("red");
    textSize(128);
    textAlign(CENTER);
}

function moveLilyPad() {
    lilyPad.x = lilyPad.x + lilyPad.velocity.x;
    lilyPad.y = lilyPad.y + lilyPad.velocity.y;
    // check if it reaches the bottom
    if (lilyPad.y > 900) {
        resetLilyPad();
    }
}
function moveCommonFly(commonFly) {
    commonFly.x += commonFly.buzziness
    // Handle the fly going off the canvas
    if (commonFly.x > width) {
        resetCommonFly(commonFly);
        // state ="title "  this would mean that once one fly leaves the screen we are brougt back to title screen
        //use it for a game over
    }

}

/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveBuzzyFly() {
    // Move the fly  
    // Move the evil fly
    buzzyFly.x += buzzyFly.velocity.x;
    buzzyFly.y += buzzyFly.velocity.y;
    let flyChange = random(1, 2);
    if (flyChange >= 0.1) {
        buzzyFly.velocity.y = random(-2, 2)
    }

    buzzyFly.x += buzzyFly.speed;
    // Handle the fly going off the canvas
    if (buzzyFly.x > width) {
        resetBuzzyFly();
        // state ="title "  this would mean that once one fly leaves the screen we are brougt back to title screen
        //use it for a game over
    }
}
function moveEvilFly(evilFly) {
    evilFly.x += evilFly.speed;
    // The evil fly does not appear if the score is bellow 10
    if (score < 10) {
        evilFly.speed === 0;

    }
    //if the score is higher then 10 than the evil fly will apear to make it harder
    else if (score > 10) {
        evilFly.x += evilFly.speed;
    }

    // Handle the evil fly going off the canvas
    if (evilFly.x > width) {
        resetEvilFly(evilFly);
    }

}

function moveSpecialFly() {
    if (score <= 20) {
        specialFly.speed === 0;

    }

    else if (score > 20) {
        specialFly.x += specialFly.speed;
    }
    // Handle the special fly going off the canvas
    if (specialFly.x > width) {
        resetSpecialFly();
    }


}


function moveGoldPoint() {
    // Move on x
    goldPoint.x += goldPoint.speed;
    // Increase the wiggle angle (for sine)
    goldPoint.wiggleAngle += 0.09;
    // Calculate the number between -1 and 1 for the amount of wiggle
    const wiggleAmount = sin(goldPoint.wiggleAngle);
    // Convert from -1..1 to an actual distance between 0..100
    goldPoint.y = map(wiggleAmount, -1, 0, 0, 100);
    if (score < 15) {
        goldPoint.speed = 0;


    }

    else if (score > 15) {
        goldPoint.x += goldPoint.speed;
        goldPoint.speed = 2;

    }

    if (goldPoint.x > 3000) {
        resetGoldPoint();
    }
}

/**
 * Draws the fly parameter to canvas
 */
function drawCommonFly(commonFly) {
    push();
    noStroke();
    fill(0);
    ellipse(commonFly.x, commonFly.y, commonFly.size);
    pop();
}

/**
 * Draws the fly as a black circle
 */
function drawBuzzyFly() {
    push();
    noStroke();
    fill("#663399");
    ellipse(buzzyFly.x, buzzyFly.y, buzzyFly.size);
    pop();
}
//draws the evil fly
function drawEvilFly(evilFly) {
    push();
    noStroke();
    fill(evilFly.fill);
    ellipse(evilFly.x, evilFly.y, evilFly.size);
    pop();

}

function drawSpecialFly() {
    push();
    noStroke();
    fill("#ffd700");
    ellipse(specialFly.x, specialFly.y, specialFly.size);
    pop();
}
function drawGoldPoint() {

    push();
    fill("gold");
    noStroke();
    ellipse(goldPoint.x, goldPoint.y, goldPoint.size);
    pop();
}


//draws the players score
function drawScore() {
    push();
    textAlign(RIGHT, TOP);
    fill("pink");
    textStyle(BOLD);
    textSize(128);
    text(score, width, 0);
    pop();
}

function drawLives() {
    push();
    textAlign(LEFT, TOP);
    fill("red");
    textStyle(BOLD);
    textSize(128);
    text(lives, 0, 0);
    pop();

}


//for (let i = 0; i < 1; i++) {
//  let commonFly = createCommonFly();
// flies.push(commonFly);
//}

function resetCommonFly(commonFly) {
    commonFly.x = -10;
    commonFly.y = random(0, 300)

}

function resetEvilFly(evilFly) {
    evilFly.x = -10;
    evilFly.y = random(0, 400);
}

function resetBuzzyFly() {
    buzzyFly.x = 0;
    buzzyFly.y = random(0, 300);
}

function resetLilyPad() {
    lilyPad.x = random(10, 400)
    lilyPad.y = -10;
}

function resetSpecialFly() {
    specialFly.x = -10;
    specialFly.y = random(0, 400);
}

function resetGoldPoint() {
    goldPoint.x = -10;
    goldPoint.y = random(0, 500);
}

/**
 * Moves the frog to the mouse position on x
 */
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
            frog.tongue.fills = frog.tongue.fills.normal;
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill(frog.tongue.fills.normal);
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
    fill("#00ff00");
    noStroke();
    ellipse(frog.body.x, frog.body.y, frog.body.size);
    pop();
}
function checkTongueLilyPadOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, lilyPad.x, lilyPad.y);
    // Check if it's an overlap
    const block = (d < frog.tongue.size / 2 + lilyPad.size / 2);
    if (block) {

        frog.tongue.state = "inbound";
    }
}
function checkTongueCommonFlyOverlap(commonFly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, commonFly.x, commonFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + commonFly.size / 2);
    if (eaten) {
        // Decrease  the Score by 3
        score = score + 1; //score += 1; score++
        // Reset the fly
        resetCommonFly(commonFly);
        // Bring back the tongue
        frog.tongue.state = "inbound";


    }
}
function checkTongueEvilFlyOverlap(evilFly) {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, evilFly.x, evilFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + evilFly.size / 2);
    if (eaten) {
        // Decrease  the Score by 3
        score = score - 3; //score += 1; score++
        lives = lives - 1;
        frog.tongue.fills = frog.tongue.fills.injured;
        // Reset the fly
        resetEvilFly(evilFly);
        // Bring back the tongue
        frog.tongue.state = "inbound";

        //wanting ti make the tongue flicker to represent it being injured

    }
}
/**
 * Handles the tongue overlapping the fly
 */
function checkTongueBuzzyFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, buzzyFly.x, buzzyFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + buzzyFly.size / 2);
    if (eaten) {
        // Increase the Score
        score = score + 1; //score += 1; score++
        // Reset the fly
        resetBuzzyFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}
/**
 * Handles the tongue overlapping the fly
 */
function checkTongueSpecialFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, specialFly.x, specialFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + specialFly.size / 2);
    if (eaten) {
        // Increase the Score
        score = score + 2; //score += 1; score++
        // Reset the fly
        resetSpecialFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}

/**
 * Launch the tongue on click (if it's not launched yet)
 */
function gameOverScreen() {
    if (lives === 0) {
        state = "gameOver"

    }
}



function mousePressed() {
    if (state === "title") {
        state = "game";
    }
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

