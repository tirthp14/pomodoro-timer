let breakIncrement = document.getElementById("break-increment");
let breakDecrement = document.getElementById("break-decrement");

let sessionIncrement = document.getElementById("session-increment");
let sessionDecrement = document.getElementById("session-decrement");

let startStop = document.getElementById("start_stop");
let resetButton = document.getElementById("reset");

let breakLength = document.getElementById("break-length");
let sessionLength = document.getElementById("session-length");

let timerLabel = document.getElementById("timer-label");
let timeLeft = document.getElementById("time-left");
let audio = document.getElementById("beep");

let timer;
let timerStatus = "stop";
let minutes, seconds, pausedTime;

function updateDisplay() {
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    timeLeft.innerText = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
    timer = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
            clearInterval(timer);
            handleTimerEnd();
        } else {
            if (seconds > 0) {
                seconds--;
            } else if (minutes > 0) {
                minutes--;
                seconds = 59
            }
            updateDisplay();
        }
    }, 1000)
}

function handleTimerEnd() {
    playSound();

    if (timerStatus === "session") {
        timerStatus = "break";
        timerLabel.innerText = "Break";
        minutes = parseInt(breakLength.innerText);
    } else {
        timerStatus = "session";
        timerLabel.innerText = "Session";
        minutes = parseInt(sessionLength.innerText);
    }

    seconds = 0;
    updateDisplay();

    startTimer();
}

function playSound() {
    audio.play();
}

function stopTimer() {
    clearInterval(timer);
    pausedTime = { minutes, seconds };
    updateDisplay();
}

function resetTimer() {
    clearInterval(timer);
    timerStatus = "stop";
    pausedTime = null;
    breakLength.innerText = "5";
    sessionLength.innerText = "25";
    timerLabel.innerText = "Session";
    minutes = 25;
    seconds = 0;
    updateDisplay();
    audio.pause();
    audio.currentTime = 0;
}

breakDecrement.addEventListener("click", () => {
    let value = parseInt(breakLength.innerText);
    if (value > 1) {
        breakLength.innerText = value - 1;
    }
});

breakIncrement.addEventListener("click", () => {
    let value = parseInt(breakLength.innerText);
    if (value < 60) {
        breakLength.innerText = value + 1;
    }
});

sessionDecrement.addEventListener("click", () => {
    let value = parseInt(sessionLength.innerText);
    if (value > 1) {
        sessionLength.innerText = value - 1;
        timeLeft.innerText = `${String(value - 1).padStart(2, '0')}:00`
    }
});

sessionIncrement.addEventListener("click", () => {
    let value = parseInt(sessionLength.innerText);
    if (value < 60) {
        sessionLength.innerText = value + 1;
        timeLeft.innerText = `${String(value + 1).padStart(2, '0')}:00`
    }
});

startStop.addEventListener("click", () => {
    if (timerStatus === "stop") {
        timerStatus = "session";
        if (pausedTime) {
            minutes = pausedTime.minutes;
            seconds = pausedTime.seconds;
            pausedTime = null;
        } else {
            minutes = parseInt(sessionLength.innerText);
            seconds = 0;
        }
        updateDisplay();
        startTimer();
    } else if (timerStatus === "session" || timerStatus === "break") {
        timerStatus = "stop";
        stopTimer();
    }
});

resetButton.addEventListener("click", () => {
    resetTimer();
});