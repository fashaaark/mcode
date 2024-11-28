

document.addEventListener('DOMContentLoaded', () => {
    const shape = document.getElementById('morphShape');
    shape.setAttribute('d', "M200,200 m-200,0 a200,200 0 1,0 400,0 a200,200 0 1,0 -400,0");
    
    let currentRotation = 0;
    
    function rotateShape() {
        currentRotation += 0.5;
        shape.style.transform = `rotate(${currentRotation}deg)`;
        requestAnimationFrame(rotateShape);
    }
    
    rotateShape();
});