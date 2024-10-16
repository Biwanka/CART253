
"use strict";

/**
 * OH LOOK I DIDN'T DESCRIBE SETUP!!
*/
function setup() {

}


/**
 * OOPS I DIDN'T DESCRIBE WHAT MY DRAW DOES!
*/
function draw() {


}


document.addEventListener('DOMContentLoaded', function () {
    // Create migraine visual overlay
    const overlay = document.createElement('div');
    overlay.className = 'migraine-overlay';
    document.body.appendChild(overlay);

    // Add pulsing effect
    function pulseMigraineEffect() {
        overlay.style.opacity = (Math.sin(Date.now() / 1000) + 1) / 4;
    }

    // Blur effect
    function addBlurEffect() {
        document.body.style.filter = `blur(${Math.random() * 3}px)`;
        setTimeout(() => {
            document.body.style.filter = 'blur(0)';
        }, 2000);
    }

    // Light sensitivity effect
    let brightness = 100;
    function flickerEffect() {
        brightness = Math.max(50, brightness + (Math.random() * 40 - 20));
        document.body.style.filter = `brightness(${brightness}%)`;
    }

    setInterval(pulseMigraineEffect, 50);
    setInterval(addBlurEffect, 8000);
    setInterval(flickerEffect, 3000);
});
