const gameContainer = document.getElementById('game-container');
/*const targets = document.querySelectorAll('.target');*/
let targets = Array.from(document.getElementsByClassName('target'));
const timeRemaining = document.getElementById('time-remaining');
const currentScore = document.getElementById('current-score');
const finalScore = document.getElementById('final-score')
const startButton = document.getElementById('start-button');
const retryButton = document.getElementById('retry-button');
const scoreContainer = document.getElementById('score-container')


let targetArray = Array.from(targets);

let score = 0;
let remainingTime = 5;
let isGameStarted = false;
let countdownInterval;

const targetClickTimes = new Map();

startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', restartGame)

// IncrementScore function handles multiple targets
function incrementScore(event) {
    if (!isGameStarted) {
        return;
    }


    const clickedTarget = event.target;

    if (targetArray.includes(clickedTarget)) {

        score++;
        console.log(clickedTarget)
        currentScore.textContent = score.toString();
        repositionTarget(clickedTarget);

    }
    targetClickTimes.set(clickedTarget, Date.now());

}
  // The repositionTarget function is responsible for animating the movement and scale of a target element on the game board.
function repositionTarget(target) {
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

//startGame removes start button
function startGame() {
    if (isGameStarted) {
        return;
    }

    isGameStarted = true;
    startButton.style.display = 'none';

    targets.forEach(target => {

        target.style.display = 'block';
        target.addEventListener('mousedown', incrementScore);
        repositionTarget(target);
        targetClickTimes.set(target, Date.now());
    });
    targets = Array.from(document.getElementsByClassName('target'));

    countdownInterval = setInterval(countDown, 1000);
}

// endGame function shows score container and removes targets
function endGame() {
    isGameStarted = false;
    finalScore.textContent = score.toString();
    targets.forEach(target => {
        target.style.display = 'none';
        target.removeEventListener('mousedown', incrementScore);
    });
    scoreContainer.style.display = 'block';

}

function restartGame() {
    score = 0;
    remainingTime = 5;
    finalScore.textContent = '';
    startButton.style.display = 'block';

    targets.forEach(target => {
        target.style.display = 'none'; // Hide each target
        target.style.top = '50%'; // Reset the target position to the center vertically
        target.style.left = '50%'; // Reset the target position to the center horizontally
        gameContainer.appendChild(target); // Append each target back to the game container
    });

    targets = Array.from(document.getElementsByClassName('target'));
    console.log(targets)

    scoreContainer.style.display = 'none';
    resetTargetTimeout();
}

// after time is out, this function removes targets and calls for endGame function, also it repositionsTarget after 4 seconds if it is not clicked
function countDown() {

    remainingTime--;
    timeRemaining.textContent = remainingTime.toString();

    if (remainingTime === 0) {
        targets.forEach(target => {
            target.style.display = 'block';
            target.removeEventListener('mousedown', incrementScore);

        });
        clearInterval(countdownInterval);
        endGame();
    } else {
        const currentTime = Date.now();
        targets.forEach(target => {
            const lastClickTime = targetClickTimes.get(target) || 0;
            if (currentTime - lastClickTime >= 4000 && target.style.display !== 'none') {
                repositionTarget(target);
                targetClickTimes.set(target, currentTime);
            }
        });
    }

}

function resetTargetTimeout() {
    targetClickTimes.clear();
}

//Test

const decreaseTargetsBtn = document.getElementById('decrease-targets');
const increaseTargetsBtn = document.getElementById('increase-targets');
const numTargetsSpan = document.getElementById('num-targets');

let numTargets = 4; // Initial number of targets
numTargetsSpan.textContent = numTargets.toString(); // Set initial value

// Function to increase the number of targets




// Function to increase the number of targets
// Function to increase the number of targets
function increaseTargets() {


    if (isGameStarted) {
        return;
    }

    numTargets++;
    numTargetsSpan.textContent = numTargets.toString();
    const gameContainer = document.getElementById('game-container');
    const targetDivs = gameContainer.getElementsByClassName('target');
    if (targetDivs.length < numTargets) {
        const newTarget = document.createElement('div');
        newTarget.id = `target${targetDivs.length + 1}`;
        newTarget.className = 'target';
        newTarget.dataset.clicked = 'false';
        newTarget.dataset.timerId = '';
        newTarget.style.display = 'none';
        gameContainer.appendChild(newTarget);

        targets = Array.from(document.getElementsByClassName('target')); // Update targets array
        targetArray = Array.from(targets); // Update targetArray
        console.log(targets)

        // Call repositionTarget for each newly added target
        targets.slice(-1 * (numTargets - targetDivs.length)).forEach(target => {
            target.addEventListener('mousedown', incrementScore); // Attach the event listener
            repositionTarget(target);
        });
    }
}

// Function to decrease the number of targets
function decreaseTargets() {

    if (isGameStarted) {
        return;
    }



    if (numTargets > 1) {
        numTargets--;
        numTargetsSpan.textContent = numTargets.toString();
        const gameContainer = document.getElementById('game-container');
        const targetDivs = gameContainer.getElementsByClassName('target');


        if (targetDivs.length > numTargets) {
            gameContainer.removeChild(targetDivs[targetDivs.length - 1]);

        }
        targets = Array.from(document.getElementsByClassName('target'));
        console.log(targets)
    }

}

// Event listener for the decrease targets button
decreaseTargetsBtn.addEventListener('click', decreaseTargets);

// Event listener for the increase targets button
increaseTargetsBtn.addEventListener('click', increaseTargets);