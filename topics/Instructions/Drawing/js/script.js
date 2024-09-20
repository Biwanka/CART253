/**
 * The Greatest Record of All Time
 * Bianca Gauthier
 * 
 * Displays the greatest recird of all time
 */

"use strict";

/**
Creates a square canvas
*/
function setup() {
    createCanvas(640, 640);


}


/**
 * Displays the record
*/
function draw() {
    //Grey background
    background( 150, 150, 150);


    //Main part of the record 
    push() ;
    fill(255, 0, 0);
    stroke(255);
    ellipse(320, 320, 480);
    pop();
    
    //the label on the record
    push();
    fill("white");
    noStroke();
    ellipse(320, 320, 140,);
    pop();
    
    //the hole in the record
    push();
    fill("#000000");
    noStroke()
    ellipse(320, 320, 20);
    pop();



}