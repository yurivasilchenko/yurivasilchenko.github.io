const gameContainer = document.getElementById('game-container');
const expandButton = document.getElementById('game-expand');

expandButton.addEventListener('click', function() {
    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreen();
    } else {
        enterFullscreen(gameContainer);
    }
});

export function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) { /* Safari */
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { /* IE11 */
        element.msRequestFullscreen();
    }
}

export function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}