import {incrementScore, isGameStarted, getRandomImage} from "./gameLogic.js";
import {repositionTarget} from "./repositionTarget.js";

const decreaseTargetsBtn = document.getElementById('decrease-targets');
const increaseTargetsBtn = document.getElementById('increase-targets');
const numTargetsSpan = document.getElementById('num-targets');

let targets = Array.from(document.getElementsByClassName('target'));
let targetArray = Array.from(targets);
let numTargets = 4; // Initial number of targets
numTargetsSpan.textContent = numTargets.toString(); // Set initial value
export function increaseTargets() {

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
        const imageUrl = getRandomImage();
        newTarget.style.backgroundImage = `url("${imageUrl}")`;
        gameContainer.appendChild(newTarget);

        targets = Array.from(document.getElementsByClassName('target')); // Update targets array
        targetArray = Array.from(targets); // Update targetArray

        // Call repositionTarget for each newly added target
        targets.slice(-1 * (numTargets - targetDivs.length)).forEach(target => {
            target.addEventListener('mousedown', incrementScore); // Attach the event listener
            repositionTarget(target);
        });

    }
}

// Function to decrease the number of targets
export function decreaseTargets() {

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
    }

}

// Event listener for the decrease targets button
decreaseTargetsBtn.addEventListener('click', decreaseTargets);

// Event listener for the increase targets button
increaseTargetsBtn.addEventListener('click', increaseTargets);

