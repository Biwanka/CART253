/**
 * Introducing Variable
 * Bianca Gauthier
 * 
 * Learning what a variable is and does!
 */

"use strict";

/**
 * Create a canvas
*/
function setup() {
    createCanvas(1000, 480);

}


/**
 * Draw a circle in the centre of the canvas
*/
function draw() {
    background(0);

    // Draw the Circle
    push();
    fill(mouseX, mouseY, 0);
    noStroke();
    ellipse(width / 2, height / 2, 100, 100);
    pop();

}