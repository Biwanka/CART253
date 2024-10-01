/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

"use strict";

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
    x: 500,
    y: 100,
    size: 50,
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


    drawFloor();
    drawLaserPointer();

    //the cat paw wich is the cursor

    push();
    imageMode(CENTER);
    image(catPaw.image, catPaw.x, catPaw.y);
    pop();

    //Remap mouse X from [0, 100] to [0,255]
    // let c = map(mouseX, 0, 100, 0, 255);
    moveCatPaw();
    checkInput();
}

//makes the cat paw move with the cursor, so it becomes the users cursor
function moveCatPaw() {
    catPaw.x = mouseX;
    catPaw.y = mouseY;

}
function drawFloor() {
    push();
    noStroke();
    fill(0);
    rect(30, 20, 55, 400);
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



function checkInput() {

    // const distance = dist(mouse.x, mouse.y, laserPointer.x, laserPointer.y);
    //const mouseOverlapsLaserPointer = (distance < laserPointer.size / 2);

    if (mouseIsPressed) {
        laserPointer.x = random(0, width);
        laserPointer.y = random(0, height);
    }
    else {
        laserPointer.x = laserPointer.x;
        laserPointer.y = laserPointer.y;
    }
}

