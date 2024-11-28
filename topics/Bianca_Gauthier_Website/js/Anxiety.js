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


function toggleMenu() {
    document.querySelector('.nav').classList.toggle('active');
}


let isFlashing = false;

function toggleFlashEffect() {
    isFlashing = !isFlashing;
    if (isFlashing) {
        let flashLayer = document.createElement('div');
        flashLayer.classList.add('flashing-effect');
        document.body.appendChild(flashLayer);
    } else {
        document.querySelector('.flashing-effect').remove();
    }
}


function createPopupTime() {

    const times = [
        "9:00 AM",
        "11:00 AM",
        "2:00 PM",
        "4:00 PM",
        "8:00 PM",
        "10:00 PM"
    ];
    const popupTime = document.createElement('div');
    popupTime.className = 'popupTime';
    popupTime.style.left = Math.random() * (window.innerWidth - 200) + 'px';
    popupTime.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    popupTime.style.zIndex = Math.floor(Math.random() * 10) + 1;
    popupTime.textContent = times[Math.floor(Math.random() * times.length) + 1];
    document.body.appendChild(popupTime);


    setTimeout(() => {
        popupTime.style.opacity = '0';
        setTimeout(() => popupTime.remove(), 500);
    }, 5000);
}

let scrollTimeout;
window.addEventListener('wheel', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(createPopupTime, 200);
});

document.addEventListener('DOMContentLoaded', function () {
    // Create random popup messages
    const messages = [
        "You should know this",
        "Why can't your concentrate",
        "Look the time past and you did NOTHING!",
        "THINK, THINK, THINK, THINK",
        "Did you make a mistake?",
        "Are you prepared enough?",
        "What are others thinking?",
        "Is it good enough?"
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
