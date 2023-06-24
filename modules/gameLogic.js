import {repositionTarget} from "./repositionTarget.js";
import {displayTopScores, saveScore} from "./topScores.js";

const gameContainer = document.getElementById('game-container');
const finalScore = document.getElementById('final-score');
const scoreContainer = document.getElementById('score-container')
const currentScore = document.getElementById('current-score');
const timeRemaining = document.getElementById('time-remaining');
const startButton = document.getElementById('start-button');
const retryButton = document.getElementById('retry-button');

let targets = Array.from(document.getElementsByClassName('target'));
const images = [
    'img/target_new_pink.jpg',
    'img/target_new_blue.jpg',
    'img/target_new_white.jpg'
];
let score = 0;
let remainingTime = 60;
let countdownInterval;
let targetArray = Array.from(targets);

export let isGameStarted = false;
const targetClickTimes = new Map();

startButton.addEventListener('click', startGame);
retryButton.addEventListener('click', restartGame)

export function incrementScore(event) {
    if (!isGameStarted) {
        return;
    }

    const clickedTarget = event.target;

    if (targetArray.includes(clickedTarget)) {

        score++;
        currentScore.textContent = score.toString();
        repositionTarget(clickedTarget);

    }
    targetClickTimes.set(clickedTarget, Date.now());

}
export function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * images.length);
    return images[randomIndex];
}
export function startGame() {

    if (isGameStarted) {
        return;
    }
//new commit
    isGameStarted = true;
    startButton.style.display = 'none';
    targets = Array.from(document.getElementsByClassName('target'));
    targetArray = Array.from(targets);


    targets.forEach(target => {

        target.style.display = 'block';
        const imageUrl = getRandomImage();
        target.style.backgroundImage = `url("${imageUrl}")`;
        target.addEventListener('mousedown', incrementScore);
        repositionTarget(target);
        targetClickTimes.set(target, Date.now());
    });

    countdownInterval = setInterval(countDown, 1000);
}

// endGame function shows score container and removes targets
export function endGame() {
    isGameStarted = false;

    finalScore.textContent = score.toString();
    targets.forEach(target => {
        target.style.display = 'none';
        target.removeEventListener('mousedown', incrementScore);
    });
    scoreContainer.style.display = 'block';

    const currentScore = {
        hits: score,
        targets: targets.length,
        timestamp: Date.now()
    };
    saveScore(currentScore);

    // Display the updated top scores
    displayTopScores();

}

export function restartGame() {
    score = 0;
    remainingTime = 60;
    currentScore.textContent ='0'
    timeRemaining.textContent = `${remainingTime}`
    finalScore.textContent = '';
    startButton.style.display = 'flex';

    targets.forEach(target => {
        target.style.display = 'none'; // Hide each target
        target.style.top = '50%'; // Reset the target position to the center vertically
        target.style.left = '50%'; // Reset the target position to the center horizontally
        gameContainer.appendChild(target); // Append each target back to the game container
    });

    targets = Array.from(document.getElementsByClassName('target'));


    scoreContainer.style.display = 'none';

    resetTargetTimeout();
}

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
                const imageUrl = getRandomImage();
                target.style.backgroundImage = `url("${imageUrl}")`;
                repositionTarget(target);
                targetClickTimes.set(target, currentTime);
            }
        });
    }
}

function resetTargetTimeout() {
    targetClickTimes.clear();
}