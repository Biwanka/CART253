/**
 * Cat PLay Time
 * Bianca Gauthier
 * 
 * This project put players in the position of a cat. It demonstrate a cat that is palying with a laserPointer. 
 * clicking the laserPointer will make it move to a different randomized area. The floor also chnages colour with the mousse 
 * movement to reacreat the idea if the cat playing in different eareas and is running fast.
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
    size: 30,
    fill: "#cc3333",


};
//the floor
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

//have created the canvas
function setup() {
    createCanvas(800, 600);
    noCursor();


}

//has all of my different functions to make everything work
function draw() {

    background(100);

    moveCatPaw();
    checkInput();
    drawFloorColour();
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
//The function that makes the LaserPointer move to random positions 
//also the function that makes the laser pointer move only when it is pressed.
function checkInput() {

    //claculating the distance so the circle only moves when the cat paw clicks on it.
    const distance = dist(catPaw.x, catPaw.y, laserPointer.x, laserPointer.y);
    const mouseOverlapsLaserPointer = (distance < laserPointer.size / 2);
    //if function so if the catpaw, is over the laserpointer and presses the laserpointer
    //then the red circle whihc is the laserpointer will appear somewhere random on the floor
    //this recreates the effect of a cat playing with a laserpointer.
    if (mouseOverlapsLaserPointer && mouseIsPressed) {
        laserPointer.x = random(0, width);
        laserPointer.y = random(0, height);
    }

    //if the laserpointer is not pressed then it will not move
    else {
        laserPointer.x = laserPointer.x;
        laserPointer.y = laserPointer.y;
    }

}
/**this makes the The backgroun change colour to give
    *the feeling that the cat is chasing the laser pointer in different 
    *rooms.
    */
function drawFloorColour() {

    //calculates so the change in colour only happens when the catpaw is on the floor
    //i used a circle so there are some extra that is reacted when it goes over the canvas.
    const distance = dist(catPaw.x, catPaw.y, floor.x, floor.y);
    const mouseOverlapsFloor = (distance < floor.size / 2);
    const mouseIsMoving = (movedX !== 0 || movedY !== 0);
    //if function so if the mouse is moving then the colour of the floor will change with it.
    if (mouseOverlapsFloor && mouseIsMoving) {
        drawFloor.fill = map(mouseX, 0, 100, 0, 100);
        drawFloor.fill = map(mouseY, 0, 100, 100, 0);
    }
}

//this draws the floor that the cat is playing on

function drawFloor() {
    push();
    noStroke();
    fill(mouseX, mouseY);
    circle(floor.x, floor.y, floor.size);
    pop();
}

// Draws the red circle whihc represent a laser pointer that the cat is trying to catch 
function drawLaserPointer() {
    push();
    noStroke();
    fill(laserPointer.fill);
    ellipse(laserPointer.x, laserPointer.y, laserPointer.size);
    pop();
}


