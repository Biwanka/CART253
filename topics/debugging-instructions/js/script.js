/**
 * Debugging Instructions
 * Pippin Barr
 * 
 * Is meant to display a bug. But doesn't. Because it has bugs.
 * 
 * It has 5 bugs. Hopefully not more.
 */

"use strict";

/**
 * Creates the canvas
*/
function setup() {
    createCanvas(500, 500);
}


/**
 * Displays a bug on a pink background
*/
function draw() {

    background("red");

    push();
    strokeWeight(10);
    line(200, 200, 200, 300);
    pop();

    push();
    noFill();
    stroke("yellow");
    strokeWeight(10);
    arc(220, 300, 40, 60, 0, PI),
        pop();

    beginshape();
    ellipse()



}