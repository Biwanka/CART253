/**
 * Title of Project
 * Author Name
 * 
 * HOW EMBARRASSING! I HAVE NO DESCRIPTION OF MY PROJECT!
 * PLEASE REMOVE A GRADE FROM MY WORK IF IT'S GRADED!
 */

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
//function toggleMenu() {
//  document.querySelector('.nav').classList.toggle('active');
//}
function toggleMenu() {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');

    nav.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav');
    const hamburger = document.querySelector('.hamburger');

    if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
    }
});
// Example for ADHD page - floating distractions
function createFloatingDistraction() {
    const distractions = ['📱', '🎵', '💭', '📺', '🎮'];
    const distraction = document.createElement('div');
    distraction.className = 'floating-distraction';
    distraction.textContent = distractions[Math.floor(Math.random() * distractions.length)];

    // Random starting position
    distraction.style.left = Math.random() * window.innerWidth + 'px';
    distraction.style.top = '-50px';

    document.body.appendChild(distraction);

    // Animate the distraction
    const animation = distraction.animate([
        { transform: 'translateY(0) rotate(0deg)' },
        { transform: `translateY(${window.innerHeight + 50}px) rotate(${Math.random() * 360}deg)` }
    ], {
        duration: 5000 + Math.random() * 5000,
        easing: 'linear'
    });

    animation.onfinish = () => distraction.remove();
}

// Create new distractions periodically
if (document.querySelector('.adhd-page')) {
    setInterval(createFloatingDistraction, 2000);
}

// Example for Chronic Migraine page - visual effects
function addMigraineEffect() {
    const overlay = document.createElement('div');
    overlay.className = 'migraine-overlay';
    document.body.appendChild(overlay);

    // Pulse effect
    overlay.animate([
        { opacity: 0 },
        { opacity: 0.3 },
        { opacity: 0 }
    ], {
        duration: 2000,
        iterations: Infinity
    });
}
