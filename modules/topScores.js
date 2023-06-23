// Load scores from local storage or initialize an empty array
let scores = JSON.parse(localStorage.getItem('scores')) || [];
export function saveScore(score, targets){
    scores.push(score);
    scores.sort((a, b) => b.hits - a.hits); // Sort scores in descending order
    localStorage.setItem('scores', JSON.stringify(scores));
}

// Function to display the top scores
export function displayTopScores(){
    const scoreList = document.getElementById('score-list');

    scoreList.innerHTML = ''; // Clear the existing list

    scores.slice(0, 10).forEach((score, index) => {
        const listItem = document.createElement('li');

        const scoreDiv = document.createElement('div');
        scoreDiv.textContent = `Hits: ${score.hits}`;
        scoreDiv.id = 'score-div';
        listItem.appendChild(scoreDiv);

        const targetDiv = document.createElement('div');
        targetDiv.textContent = `Targets amount: ${score.targets}`;
        targetDiv.id = 'target-div';
        listItem.appendChild(targetDiv);

        const dateDiv = document.createElement('div');
        dateDiv.textContent = getFormattedDate(score.timestamp);
        dateDiv.id = 'date-div';
        listItem.appendChild(dateDiv);

        scoreList.appendChild(listItem);
    });
}

// Function to format the date
export function getFormattedDate(timestamp){
    const currentDate = new Date();
    const targetDate = new Date(timestamp);
    const timeDiff = Math.abs(currentDate - targetDate);
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const month = 30 * day;
    const year = 365 * day;

    if (timeDiff < minute) {
        return "less than a minute ago";
    } else if (timeDiff < hour) {
        const minutes = Math.floor(timeDiff / minute);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (timeDiff < day) {
        const hours = Math.floor(timeDiff / hour);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (timeDiff < month) {
        const days = Math.floor(timeDiff / day);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (timeDiff < year) {
        const months = Math.floor(timeDiff / month);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    } else {
        const years = Math.floor(timeDiff / year);
        return `${years} year${years > 1 ? 's' : ''} ago`;
    }
}
