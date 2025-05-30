let gameData;
let score = 0;
let timeElapsed = 0;
let timerInterval;

document.addEventListener("DOMContentLoaded", () => {
    fetch('gameData.json')
        .then(response => response.json())
        .then(data => {
            gameData = data;
            document.getElementById('gameTitle').innerText = gameData.gameTitle;
            loadImages();
            startTimer();
        });
});

function loadImages() {
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    const img1 = new Image();
    const img2 = new Image();
    
    img1.src = gameData.images.image1;
    img2.src = gameData.images.image2;

    img1.onload = () => {
        canvas.width = img1.width;
        canvas.height = img1.height;
        ctx.drawImage(img1, 0, 0);
        img2.onload = () => {
            ctx.drawImage(img2, 0, 0);
            drawDifferences();
        };
    };
}

function drawDifferences() {
    const canvas = document.getElementById('imageCanvas');
    const ctx = canvas.getContext('2d');
    
    gameData.differences.forEach(diff => {
        const highlight = document.createElement('div');
        highlight.className = 'highlight';
        highlight.style.left = diff.x + 'px';
        highlight.style.top = diff.y + 'px';
        highlight.style.width = diff.width + 'px';
        highlight.style.height = diff.height + 'px';
        document.getElementById('gameContainer').appendChild(highlight);
        
        highlight.addEventListener('click', () => {
            score++;
            document.getElementById('score').innerText = score;
            highlight.style.borderColor = 'green';
            highlight.style.pointerEvents = 'none';
        });
    });
}

function startTimer() {
    timerInterval = setInterval(() => {
        timeElapsed++;
        document.getElementById('time').innerText = timeElapsed;
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

