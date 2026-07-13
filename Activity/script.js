const countdownDisplay = document.getElementById("countdown");
const startButton = document.getElementById("startButton");
const pauseButton = document.getElementById("pauseButton");
const timeInput = document.getElementById("timeInput");

let timeLeft = 10;
let intervalId = null;
let isPaused = false;

// Start button
startButton.addEventListener("click", () => {
  // Prevent multiple timers
  if (intervalId !== null) return;

  // Use custom input if provided
  if (timeInput.value !== "") {
    timeLeft = parseInt(timeInput.value);
  }

  countdownDisplay.textContent = timeLeft;

  intervalId = setInterval(() => {
    if (!isPaused) {
      timeLeft--;
      countdownDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
        // Stop countdown using setTimeout
        setTimeout(() => {
          clearInterval(intervalId);
          intervalId = null;
          countdownDisplay.textContent = "Time's up!";
        }, 0);
      }
    }
  }, 1000);
});

// Pause/Resume button
pauseButton.addEventListener("click", () => {
  if (intervalId === null) return;

  isPaused = !isPaused;

  pauseButton.textContent = isPaused ? "Resume" : "Pause";
});
