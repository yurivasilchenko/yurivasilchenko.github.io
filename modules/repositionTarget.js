import {incrementScore} from "./gameLogic.js";

const gameContainer = document.getElementById('game-container');
export function repositionTarget(target) {
    const containerWidth = gameContainer.offsetWidth;
    const containerHeight = gameContainer.offsetHeight;
    const maxX = containerWidth - target.offsetWidth;
    const maxY = containerHeight - target.offsetHeight;

    const moveAmount = 200; // We can adjust movement speed

    let currentX = Math.floor(Math.random() * maxX);
    let currentY = Math.floor(Math.random() * maxY);

    let moveX = 0;
    let moveY = 0;

    while (moveX === 0 && moveY === 0) {
        moveX = Math.floor(Math.random() * (2 * moveAmount + 1)) - moveAmount;
        moveY = Math.floor(Math.random() * (2 * moveAmount + 1)) - moveAmount;
    }

    let scale = 0;
    let isGrowing = true;
    let lastFrameTime = performance.now();

    const growthDuration = 2; // Duration for target growth in seconds
    const shrinkDuration = 2; // Duration for target shrink in seconds


    function animate() {
        const currentTime = performance.now();
        const deltaTime = (currentTime - lastFrameTime) / 1000; // Convert milliseconds to seconds
        lastFrameTime = currentTime;

        currentX += moveX * deltaTime;
        currentY += moveY * deltaTime;

        // checks if the target has reached the boundaries of the game container and reverses the movement direction if necessary.
        if (currentX <= 0 || currentX >= maxX) {
            moveX *= -1;
        }

        if (currentY <= 0 || currentY >= maxY) {
            moveY *= -1;
        }

        if (isGrowing) {
            scale += deltaTime / growthDuration; // Increase the scale based on the target duration for growth
            if (scale >= 1) {
                // Once the scale reaches 1, start decreasing
                isGrowing = false;
            }
        } else {
            scale -= deltaTime / shrinkDuration; // Decrease the scale based on the target duration for shrink
            if (scale <= 0) {
                // Reset target position and scale
                return;
            }
        }

        // Resetting target scale
        target.style.left = `${currentX}px`;
        target.style.top = `${currentY}px`;
        target.style.transform = `scale(${scale})`;

        target.animationFrameId = requestAnimationFrame(animate);
    }

    target.animationFrameId = requestAnimationFrame(animate);

    target.addEventListener('mousedown', incrementScore); // Reattach click event listener
}
