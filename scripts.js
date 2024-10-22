document.addEventListener("DOMContentLoaded", function() {
    const timerDisplay = document.getElementById("timer-display");
    const breathingPrompt = document.getElementById("breathing-prompt");
    const startButton = document.getElementById("start-exercise");
    const stopButton = document.getElementById("stop-exercise");

    let timer;
    let totalTime = 300; // 5 minutes = 300 seconds
    let breathingPhase = 0; // 0 = Inhale, 1 = Hold, 2 = Exhale
    let breathingPhaseTime = 0;
    let isRunning = false; // Track if the timer is running or paused
    let isPaused = false; // Track if the exercise is paused

    startButton.addEventListener("click", startBreathingExercise);
    stopButton.addEventListener("click", togglePauseResume);

    function startBreathingExercise() {
        isRunning = true;
        startButton.style.display = "none"; // Hide start button
        stopButton.style.display = "inline"; // Show stop button
        totalTime = 300; // Reset time to 5 minutes
        breathingPhaseTime = 4; // Inhale for 4 seconds to start
        breathingPhase = 0; // Start with inhale phase
        timer = setInterval(updateTimer, 1000); // Start the timer
        updateBreathingPrompt(); // Set the initial breathing prompt
    }

    function togglePauseResume() {
        if (isPaused) {
            resumeBreathingExercise(); // If paused, resume
        } else {
            pauseBreathingExercise(); // Otherwise, pause
        }
    }

    function pauseBreathingExercise() {
        isPaused = true;
        clearInterval(timer); // Stop the timer
        stopButton.textContent = "Resume"; // Change button to "Resume"
        breathingPrompt.textContent = "Exercise Paused. Press Resume to continue."; // Update prompt
    }

    function resumeBreathingExercise() {
        isPaused = false;
        stopButton.textContent = "Pause"; // Change button back to "Pause"
        timer = setInterval(updateTimer, 1000); // Restart the timer
    }

    function updateTimer() {
        totalTime--;

        let minutes = Math.floor(totalTime / 60);
        let seconds = totalTime % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds; // Add leading zero if necessary

        timerDisplay.textContent = `${minutes}:${seconds}`;

        if (totalTime <= 0) {
            clearInterval(timer);
            breathingPrompt.textContent = "Exercise Completed! Great job!";
            isRunning = false;
            stopButton.style.display = "none"; // Hide stop button
            startButton.style.display = "inline"; // Show start button again
        }

        updateBreathingPrompt(); // Update the breathing instructions
    }

    function updateBreathingPrompt() {
        breathingPhaseTime--;

        if (breathingPhaseTime <= 0) {
            if (breathingPhase === 0) {
                // Inhale for 4 seconds
                breathingPrompt.textContent = "Inhale deeply for 4 seconds...";
                breathingPhaseTime = 4;
                breathingPhase = 1;
            } else if (breathingPhase === 1) {
                // Hold for 7 seconds
                breathingPrompt.textContent = "Hold your breath for 7 seconds...";
                breathingPhaseTime = 7;
                breathingPhase = 2;
            } else {
                // Exhale for 8 seconds
                breathingPrompt.textContent = "Exhale slowly for 8 seconds...";
                breathingPhaseTime = 8;
                breathingPhase = 0;
            }
        }
    }
});

