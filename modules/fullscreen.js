const gameContainer = document.getElementById('game-container');
const expandButton = document.getElementById('game-expand');
const expandIcon = document.querySelector('.expand-button i')

expandButton.addEventListener('click', function() {

    if (document.fullscreenElement || document.webkitFullscreenElement || document.msFullscreenElement) {
        exitFullscreen();
        expandIcon.classList.remove('fas', 'fa-compress');
        expandIcon.classList.add('fas', 'fa-expand');
    } else {
        enterFullscreen(gameContainer);
        expandIcon.classList.remove('fas', 'fa-expand');
        expandIcon.classList.add('fas', 'fa-compress');

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