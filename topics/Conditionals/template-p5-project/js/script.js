/**
 * Circle Master
 * Pippin Barr
 *
 * This will be a program in which the user can move a circle
 * on the canvas using their own circle to "lead" it around.
 */

const puck = {
    x: 300,
    y: 300,
    size: 100,
    fill: "#ff0000"
};

const user = {
    x: undefined, // will be mouseX
    y: undefined, // will be mouseY
    size: 75,
    fill: "#000000",
    fills: {
        noOverLap

    }
};

const target = {
    x: 100,
    y: 100,
    size: 30,
    fill:
    
}

/**
 * Create the canvas
 */
function setup() {
    createCanvas(400, 400);

    noCursor();
}

/**
 * Move the user circle, check for overlap, draw the two circles
 */
function draw() {
    background("#aaaaaa");

    // Move user circle
    moveUser();
    movePuck();

    // Draw the user and puck
    drawTarget();
    drawUser();
    drawPuck();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
    user.x = mouseX;
    user.y = mouseY;
}

// move the puck based on the user push the puck
function movePuck() {
    const d = dist(user.x, user.y, puck.x, puck.y);
    const overlap = (d < user.size / 2 + puck.size / 2);
    if (overlap) {
        const dx = user.x - puck.x;
        const dy = user.y - puck.y;
        if (abs(dx) > abs(dy)) {
            // its closer on X
            if (dx < 0) {
                puck.x += 5;

            }

            else if (dx > 0) {
                puck.x -= 5;

            }

        }

        else {
            // its closer on y
            if (dy < 0) {
                puck.y += 1;
            }
            else if (dy > 0) {
                puck.y -= 1;

            }
        }
    }
}



/**
 * Displays the user circle
 */
function drawUser() {
    push();
    noStroke();
    fill(user.fill);
    ellipse(user.x, user.y, user.size);
    pop();
}

/**
 * Displays the puck circle
 */
function drawPuck() {
    push();
    noStroke();
    fill(puck.fill);
    ellipse(puck.x, puck.y, puck.size);

    pop();
}
function checkTarget() {
    const d = dist(user.x, user.y, puck.x, puck.y);
    const overlap = (d < user.size / 2 + puck.size / 2);
    if (overlap) {

    }
}
function drawTarget() {
    push();
    noStroke();
    fill(target.fill);
    ellipse(target.x, target.y, target.size);


}






