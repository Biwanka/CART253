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
    // Create random popup messages
    const messages = [
        "Did you remember to lock the door?",
        "Is your phone on silent?",
        "Did you turn off the stove?",
        "What if you're late?",
        "Did you make a mistake?",
        "Are you prepared enough?",
        "What are others thinking?"
    ];

    function createAnxietyPopup() {
        const popup = document.createElement('div');
        popup.className = 'anxiety-popup';
        popup.textContent = messages[Math.floor(Math.random() * messages.length)];

        // Random position
        popup.style.left = Math.random() * (window.innerWidth - 200) + 'px';
        popup.style.top = Math.random() * (window.innerHeight - 100) + 'px';

        document.body.appendChild(popup);

        // Remove popup after a delay
        setTimeout(() => {
            popup.style.opacity = '0';
            setTimeout(() => popup.remove(), 500);
        }, 3000);
    }

    // Screen shake effect
    function addScreenShake() {
        document.body.style.transform = `translate(${Math.random() * 4 - 2}px, ${Math.random() * 4 - 2}px)`;
        setTimeout(() => {
            document.body.style.transform = 'translate(0, 0)';
        }, 100);
    }

    setInterval(createAnxietyPopup, 5000);
    setInterval(addScreenShake, 10000);
});
