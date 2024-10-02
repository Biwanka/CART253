/**
 * Keyboard Events
 * Bianca Gauthier
 * 
 * A chance to experiment with keyboard events in a simple setting.
*/

"use strict";

// Our ball
const ball = {
    // Position
    x: 200,
    y: 200,
    // Size
    size: 50,
    // fill
    fill: "#ffffff",
    // fills
    fills: {
        white: "#ffffff",
        red: "#ff0000",
        blue: "#0000ff"
    },
    keys: {
        redKey: 82, //R
        blueKey: 66 //B
    }
}

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(400, 400);
}

/**
 * Draws the ball
 */
function draw() {
    background(0);

    // Draw the ball
    push();
    noStroke();
    fill(ball.fill);
    ellipse(ball.x, ball.y, ball.size);
    pop();
}

function keyPressed(event) {
    if (event.keyCode === ball.keys.red) {
        ball.fill = ball.fills.red;
    }

    else if (event.keyCode === 66) {
        ball.fill = ball.fills.bleu;
    }

}

function keyReleased() {
    if (event.keyCode === 82 || event.key === 66) {
        ball.fill = ball.fills.white;
    }

}