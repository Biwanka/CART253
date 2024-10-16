
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





document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('paintCanvas');
    const ctx = canvas.getContext('2d');
    const paintbrush = document.getElementById('paintbrush');
    const brushStatus = document.getElementById('brush-status');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let brushSelected = false;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    function startDrawing(e) {
        if (!brushSelected) return;
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
        // Draw a single point in case of a click without drag
        ctx.beginPath();
        ctx.arc(lastX, lastY, ctx.lineWidth / 2, 0, Math.PI * 2);
        ctx.fill();
    }

    function draw(e) {
        if (!isDrawing || !brushSelected) return;
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function selectBrush() {
        brushSelected = true;
        paintbrush.classList.remove('falling');
        brushStatus.textContent = 'Paintbrush selected';
        canvas.style.cursor = 'crosshair';
        console.log('Brush selected');
    }

    function interruptDrawing() {
        isDrawing = false;
        brushSelected = false;
        paintbrush.classList.add('falling');
        brushStatus.textContent = 'Click to select paintbrush';
        canvas.style.cursor = 'default';
        console.log('Interrupting drawing');
        setTimeout(() => {
            paintbrush.classList.remove('falling');
            console.log('Brush reset');
        }, 1000);
    }

    function updateBrushSize() {
        ctx.lineWidth = brushSize.value;
    }

    function updateBrushColor() {
        ctx.strokeStyle = colorPicker.value;
        ctx.fillStyle = colorPicker.value;
    }

    paintbrush.addEventListener('click', selectBrush);
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    colorPicker.addEventListener('input', updateBrushColor);
    brushSize.addEventListener('input', updateBrushSize);

    updateBrushSize();
    updateBrushColor();

    setInterval(interruptDrawing, 15000);

    console.log('Script loaded and running');
});