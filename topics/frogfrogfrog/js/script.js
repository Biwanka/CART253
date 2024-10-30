/**
 * Frogfrogfrog
 * Pippin Barr
 * 
 * A game of catching flies with your frog-tongue
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

const lilyPad = {
    x: 400,
    y: 40,
    size: 50,

    velocity: {
        x: 0,
        y: 1,
    }

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
        size: 20,
        speed: 20,
        // Determines how the tongue moves each frame
        state: "idle" // State can be: idle, outbound, inbound
    }
};

// Our fly
// Has a position, size, and speed of horizontal movement
const fly = {
    x: 0,
    y: 200, // Will be random
    size: 12,
    speed: 3
};

//the bad flies that makes player lose points
const evilFly = {
    x: -10,
    y: 100,
    size: 14,
    speed: 4
};

const goldPoint = {
    x: -10,
    y: 80,
    size: 10,
    speed: 1
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

//the current state
let state = "title"; //can be "title" or "game" or "WIN" "GameOver"
/**
 * Creates the canvas and initializes the fly
 */
function setup() {
    createCanvas(640, 480);

    // Give the fly its first random position
    resetFly();
    resetEvilFly();
    resetSpecialFly();
    resetGoldPoint();
}

function draw() {
    if (state === "title") {
        title();
    }

    else if (state === "game") {
        game();
    }



}

function title() {
    background("pink");

    text("Frog Frog Frog", 100, 100);
}

function game() {
    background("#87ceeb");

    moveLilyPad();
    moveFly();
    moveEvilFly();
    moveSpecialFly();

    moveFrog();
    moveTongue();
    moveGoldPoint();


    checkTongueFlyOverlap();
    checkTongueEvilFlyOverlap();
    checkTongueLilyPadOverlap();

    drawLilyPad();
    drawFrog();
    drawScore();
    drawFly();
    drawEvilFly();
    drawSpecialFly();
    drawGoldPoint();


}


function moveLilyPad() {
    lilyPad.x = lilyPad.x + lilyPad.velocity.x;
    lilyPad.y = lilyPad.y + lilyPad.velocity.y;

}



/**
 * Moves the fly according to its speed
 * Resets the fly if it gets all the way to the right
 */
function moveFly() {
    // Move the fly
    fly.x += fly.speed;
    // Handle the fly going off the canvas
    if (fly.x > width) {
        resetFly();
        // state ="title "  this would mean that once one fly leaves the screen we are brougt back to title screen
        //use it for a game over
    }
}
function moveEvilFly() {
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
        resetEvilFly();
    }

}

function moveSpecialFly() {
    if (score < 20) {
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

    if (score > 5) {
        goldPoint.x = frameCount;
        goldPoint.y = 30 * sin(goldPoint.x * 0.1) + 50;

        // Handle the special fly going off the canvas
        //  if (GoldPoint.x > width) {
        //  resetGoldPoint();
        //  }
    }
}
function drawLilyPad() {
    push();
    rectMode(CENTER);
    fill("green");
    noStroke();
    ellipse(lilyPad.x, lilyPad.y, lilyPad.size);
    pop();

}
/**
 * Draws the fly as a black circle
 */
function drawFly() {
    push();
    noStroke();
    fill("#000000");
    ellipse(fly.x, fly.y, fly.size);
    pop();
}
//draws the evil fly
function drawEvilFly() {
    push();
    noStroke();
    fill("red");
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
    fill("#000000")
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



/**
 * Resets the fly to the left with a random y
 */
function resetFly() {
    fly.x = 0;
    fly.y = random(0, 300);
}

function resetEvilFly() {
    evilFly.x = 0;
    evilFly.y = random(0, 400);
}

function resetSpecialFly() {
    specialFly.x = 0;
    specialFly.y = random(0, 400);
}

function resetGoldPoint() {
    goldPoint.x = 0;
    goldPoint.y = random(0, 100);
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
        }
    }
}

/**
 * Displays the tongue (tip and line connection) and the frog (body)
 */
function drawFrog() {
    // Draw the tongue tip
    push();
    fill("#ff0000");
    noStroke();
    ellipse(frog.tongue.x, frog.tongue.y, frog.tongue.size);
    pop();

    // Draw the rest of the tongue

    push();
    stroke("#ff0000");
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

/**
 * Handles the tongue overlapping the fly
 */
function checkTongueFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, fly.x, fly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + fly.size / 2);
    if (eaten) {
        // Increase the Score
        score = score + 1; //score += 1; score++
        // Reset the fly
        resetFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
    }
}
function checkTongueEvilFlyOverlap() {
    // Get distance from tongue to fly
    const d = dist(frog.tongue.x, frog.tongue.y, evilFly.x, evilFly.y);
    // Check if it's an overlap
    const eaten = (d < frog.tongue.size / 2 + evilFly.size / 2);
    if (eaten) {
        // Decrease  the Score by 3
        score = score - 3; //score += 1; score++
        // Reset the fly
        resetEvilFly();
        // Bring back the tongue
        frog.tongue.state = "inbound";
        //wanting ti make the tongue flicker to represent it being injured

    }
}
/**
 * Launch the tongue on click (if it's not launched yet)
 */

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


/// MAKE ALL MY BEGINING OF CODES WITH A LOWER CASSE
///I want to make a fly woble not be straight 
////I want the frog tongue to flicker when he eats the red fly because they are dangerous, show the frog is hurt,  (maybe see if the fill can change)
////if eaten the evil fly more than 3 time its a game over 
////I want a fly to be super zoomy like crazy. I want to act differently than the rest 
//, if it is caught the player has to click a spefic key 10 time in a certain amount of time to win the game
//I want multiple of the same fly to appear more than once at the same time random. 
//frog tobgue move angle