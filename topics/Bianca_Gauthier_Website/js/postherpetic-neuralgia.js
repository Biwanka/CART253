
"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/

let isFlickering = false;

function toggleFlickerEffect() {
    isFlickering = !isFlickering;
    if (isFlickering) {
        let flickerLayer = document.createElement('div');
        flickerLayer.classList.add('flicker-effect');
        document.body.appendChild(flickerLayer);
    } else {
        document.querySelector('.flicker-effect').remove();
    }
}
let isBurning = false;

function toggleBurnEffect() {
    isBurning = !isBurning;
    if (isBurning) {
        let burnLayer = document.createElement('div');
        burnLayer.classList.add('burning-effect');
        document.body.appendChild(burnLayer);
    } else {
        document.querySelector('.burning-effect').remove();
    }
}

let isTingling = false;

function toggleTingleEffect() {
    isTingling = !isTingling;
    if (isTingling) {
        createTingle();
    } else {
        removeTingles();
    }
}

function createTingle() {
    for (let i = 0; i < 5; i++) {
        let tingle = document.createElement('div');
        tingle.classList.add('tingle-effect');
        tingle.style.top = Math.random() * window.innerHeight + 'px';
        tingle.style.left = Math.random() * window.innerWidth + 'px';
        document.body.appendChild(tingle);
    }
}

function removeTingles() {
    let tingles = document.querySelectorAll('.tingle-effect');
    tingles.forEach(tingle => tingle.remove());
}
let isBlurred = false;

function toggleBlur() {
    isBlurred = !isBlurred;
    if (isBlurred) {
        let blurLayer = document.createElement('div');
        blurLayer.classList.add('blurred');
        document.body.appendChild(blurLayer);
    } else {
        document.querySelector('.blurred').remove();
    }
}
const neuralgiaText = document.getElementById("neuralgia-text");
neuralgiaText.addEventListener("mouseover", () => {
    neuralgiaText.style.animation = "pulse 1s infinite";
});

neuralgiaText.addEventListener("mouseleave", () => {
    neuralgiaText.style.animation = "none";
});