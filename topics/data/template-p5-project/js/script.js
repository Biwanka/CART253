/**
 * Terrible New Car
 * Pippin Barr
 * 
 * A program to generate new car model names using dinosaurs.
 * 
 * Uses:
 * Darius Kazemi's corpora repository
 * https://github.com/dariusk/corpora/tree/master
 */

"use strict";

let carData = undefined;
let dinosaurData = undefined;
let langData = undefined;
let lang = "fr";

let mainText = "Click to generate a car name.";

/**
 * Load the car and dinosaur data
 */
function preload() {
    carData = loadJSON("assets/Data/cars.json");
    dinosaurData = loadJSON("assets/Data/dinosaurs.json");
    langData = loadJSON("assets/Data/lang.json");
}

/**
 * Create the canvas
*/
function setup() {
    createCanvas(600, 400);

    if (lang === "fr") {
        mainText = langData.instructions.fr;
    }
    else if (lang === "en") {
        mainText = langData.instructions.en;
    }

    mainText = langData.instructions[lang]; //a way to write it without needing to do all of the if statement 
}

/**
 * Display the current main text (either instructions or a car)
*/
function draw() {
    background(0);

    push();
    fill("pink");
    textAlign(CENTER, CENTER);
    textSize(32);
    text(mainText, width / 2, height / 2);
    pop();
}

/**
 * Generate a new car name
 */
function mousePressed() {
    //get a random element from the cars array in carData
    const car = random(carData.cars);

    const dinosaur = random(dinosaurData.dinosaurs);
    maintText = car + "" + dinosaur;

    // mainText = ` I drive a ${car} ${dinosaur} to work`;
}






// function getRandomElement(array) {
// const randomIndex = Math.floor(Math.random() * array.lenght)
//return array [randomIndex]
//}