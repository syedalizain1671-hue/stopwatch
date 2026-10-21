let seconds = 0;
let minutes = 0;
let hours = 0;
let intervalId = null; // setInterval ki ID yahan rahegi
let lapCount = 0;

const startButton = document.querySelector('.start');
const stopButton = document.querySelector('.stop');
const resetButton = document.querySelector('.reset');
const recorder = document.querySelector('.lap');
const lapList = document.querySelector('.lapper');

const secondsDisplay = document.querySelector('#secondButton');
const minutesDisplay = document.querySelector('#setminute');
const hourDisplay = document.querySelector('#sethour');

// 5 ko "05" banata hai
function pad(number) {
    return String(number).padStart(2, '0');
}

// Teeno displays ek hi jagah se update hote hain
function updateDisplay() {
    hourDisplay.innerHTML = pad(hours);
    minutesDisplay.innerHTML = pad(minutes);
    secondsDisplay.innerHTML = pad(seconds);
}

startButton.addEventListener("click", () => {
    startButton.disabled = true;
    intervalId = setInterval(() => {
        seconds++;

        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }

        if (minutes === 60) {
            minutes = 0;
            hours++;
        }

        updateDisplay(); // carry logic ke baad display update
    }, 20);
});

stopButton.addEventListener("click", () => {
    clearInterval(intervalId);
    startButton.disabled = false;
});

resetButton.addEventListener("click", () => {
    clearInterval(intervalId);
    seconds = 0;
    minutes = 0;
    hours = 0;
    updateDisplay();

    lapCount = 0;
    lapList.innerHTML = 'No laps yet';

    startButton.disabled = false;
});

recorder.addEventListener("click", () => {
    // Timer abhi chala hi nahi to lap record na karo
    if (hours === 0 && minutes === 0 && seconds === 0) return;

    // Pehle lap par placeholder text hata do
    if (lapCount === 0) {
        lapList.innerHTML = '';
    }

    lapCount++;

    const row = document.createElement('div');
    row.className = 'lap-item';
    row.innerHTML =
    '<span class="lap-number">Lap ' + lapCount +  '--</span>' +
        '<span class="lap-time">' + pad(hours) + ':' + pad(minutes) + ':' + pad(seconds) + '</span>';

    lapList.appendChild(row);
    lapList.scrollTop = lapList.scrollHeight; // naya lap hamesha nazar aaye
});