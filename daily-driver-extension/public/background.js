let timerInterval;
let timeLeft = 25 * 60; // Default work duration in seconds (25 minutes)
let isActive = false;
let isWork = true; // True for work, false for break
let pomodorosCompleted = 0;
let workDuration = 25 * 60; // Work duration in seconds
let breakDuration = 5 * 60; // Break duration in seconds

// Load saved timer state from chrome.storage when background script starts
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(
    [
      "timeLeft",
      "isActive",
      "isWork",
      "pomodorosCompleted",
      "workDuration",
      "breakDuration",
    ],
    (result) => {
      if (result.timeLeft !== undefined) timeLeft = result.timeLeft;
      if (result.isActive !== undefined) isActive = result.isActive;
      if (result.isWork !== undefined) isWork = result.isWork;
      if (result.pomodorosCompleted !== undefined)
        pomodorosCompleted = result.pomodorosCompleted;
      if (result.workDuration !== undefined) workDuration = result.workDuration;
      if (result.breakDuration !== undefined)
        breakDuration = result.breakDuration;

      // Start the timer if it was previously active
      if (isActive) {
        startTimer();
      }
    }
  );
});

// Start the timer
function startTimer() {
  if (timerInterval) clearInterval(timerInterval); // Clear any existing interval
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timeLeft <= 0) {
      if (isWork) {
        isWork = false;
        timeLeft = breakDuration;
      } else {
        isWork = true;
        pomodorosCompleted++;
        timeLeft = workDuration;
      }

      // Update the state in chrome.storage
      chrome.storage.local.set({
        timeLeft,
        isWork,
        pomodorosCompleted,
      });
    }

    // Update the timer state in chrome.storage every second
    chrome.storage.local.set({ timeLeft });
  }, 1000);
}

// Pause the timer
function pauseTimer() {
  clearInterval(timerInterval);
  isActive = false;
  chrome.storage.local.set({ isActive });
}

// Reset the timer
function resetTimer() {
  clearInterval(timerInterval);
  timeLeft = workDuration;
  isActive = false;
  isWork = true;
  pomodorosCompleted = 0;
  chrome.storage.local.set({ timeLeft, isActive, isWork, pomodorosCompleted });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log("Message received:", request);

  if (request.action === "setTokens") {
    chrome.storage.local.set({
      accessToken: request.accessToken,
      refreshToken: request.refreshToken,
    });
    sendResponse({ status: "success" });
  } else if (request.action === "getTokens") {
    chrome.storage.local.get(["accessToken", "refreshToken"], (tokens) => {
      sendResponse(tokens);
    });
    return true; // Keeps the message channel open for async response
  } else if (request.action === "removeTokens") {
    chrome.storage.local.remove(["accessToken", "refreshToken"]);
    sendResponse({ status: "success" });
  }

  if (message.action === "startTimer") {
    if (!isActive) {
      isActive = true;
      startTimer();
      chrome.storage.local.set({ isActive });
    }
  } else if (message.action === "pauseTimer") {
    pauseTimer();
  } else if (message.action === "resetTimer") {
    resetTimer();
  }
});
