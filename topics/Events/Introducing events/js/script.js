/**
 * Introducing events
 *Bianca Gauthier

 taking a look at how events work in javascripts and p5
 */

"use strict";

/**

*/
function setup() {
    createCanvas(400, 400);
    //makes the canvas black
    background(0);

}


/**
*/
function draw() {

}
//Draws a circle at the mouse position
function mousePressed() {
    push();
    noStroke();
    fill(255, 255, 0);
    ellipse(mouseX, mouseY, 50);
    pop();
}