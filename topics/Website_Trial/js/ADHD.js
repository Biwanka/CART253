/**
 * Connected to the ADHD one 
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
// ADHD Effects
document.addEventListener('DOMContentLoaded', function () {
    // Create floating distractions
    function createFloatingDistraction() {
        const distractions = ['📱', '🎵', '💭', '📺', '🎮', '⌚', '🔔', '💡', '✉️'];
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

    // Text movement effect
    const textElements = document.querySelectorAll('p, h1, h2, h3');
    textElements.forEach(element => {
        element.addEventListener('mouseover', () => {
            element.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
            setTimeout(() => {
                element.style.transform = 'translateX(0)';
            }, 150);
        });
    });

    // Start creating distractions
    setInterval(createFloatingDistraction, 2000);
});

function toggleMenu() {
    document.querySelector('.nav').classList.toggle('active');
}