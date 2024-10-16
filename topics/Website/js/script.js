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
