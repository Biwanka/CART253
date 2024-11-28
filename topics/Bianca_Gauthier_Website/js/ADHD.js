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


// Text movement effect
const textMove = document.querySelectorAll(' h1, h2, h3');
textMove.className = 'move-text'
textMove.forEach(move => {
    move.addEventListener('mouseover', () => {
        move.style.transform = `translateX(${Math.random() * 10 - 5}px)`;
        setTimeout(() => {
            move.style.transform = 'translateX(0)';
        }, 150);
    });
});

// Start creating distractions
setInterval(createFloatingDistraction, 2000);



