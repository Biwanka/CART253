/**
 * Cat PLay Time
 * Bianca Gauthier
 * 
 * The purpose of this is to recreate the idea of a cat that is plying with a laserPointer.
 */

"use strict";

//this will be the cursor that will represent the player
let catPaw = {
    //the position of the cat paw
    x: undefined,
    y: undefined,
    size: 30,

    // The image of the cat paw
    image: undefined
};



// the red dot from a laser pointer. The one that the cat is trying to catch 
const laserPointer = {
    //position
    x: 100,
    y: 100,
    size: 50,
    fill: "#cc3333",


};
/**The backgroun will change colour to give
    *the feeling that the cat is chasing the laser pointer in different 
    *rooms 
    */
const floor = {
    x: 400,
    y: 300,
    size: 1000,
    fill: undefined,
};


//loads cat paw image whihc will represent the user
function preload() {
    catPaw.image = loadImage("assets/images/KittyPaw.png");

}


function setup() {
    createCanvas(800, 600);
    noCursor();


}


function draw() {

    background(200);

    moveCatPaw();
    checkInput();



    drawFloor();
    drawLaserPointer();

    //the cat paw wich is the cursor
    push();
    imageMode(CENTER);
    image(catPaw.image, catPaw.x, catPaw.y);
    pop();


}
//makes the cat paw move with the cursor, so it becomes the users cursor
function moveCatPaw() {

    catPaw.x = mouseX;
    catPaw.y = mouseY;
}

function checkInput() {

    const distance = dist(catPaw.x, catPaw.y, laserPointer.x, laserPointer.y);
    const mouseOverlapsLaserPointer = (distance < laserPointer.size / 2);

    if (mouseOverlapsLaserPointer && mouseIsPressed) {
        laserPointer.x = random(0, width);
        laserPointer.y = random(0, height);
    }


    else {
        laserPointer.x = laserPointer.x;
        laserPointer.y = laserPointer.y;
    }

}

let c = map(mouseX, 0, 100, 0, 255)

function drawFloor() {
    push();
    noStroke();
    fill(c);
    circle(floor.x, floor.y, floor.size);
    pop();
}

// Draws the red circle laser pointer that the cat is trying to catch 
function drawLaserPointer() {
    push();
    noStroke();
    fill(laserPointer.fill);
    ellipse(laserPointer.x, laserPointer.y, laserPointer.size);
    pop();
}


