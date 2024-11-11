/* eslint-disable no-undef */
let timerInterval = null;
let timeLeft = 25 * 60; // default Pomodoro time in seconds
let isRunning = false;

const startTimer = () => {
  if (!isRunning) {
    isRunning = true;
    timerInterval = setInterval(() => {
      timeLeft -= 1;
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isRunning = false;

        chrome.notifications.create(
          {
            type: "basic",
            iconUrl: "icon1.png",
            title: "Time to Hydrate",
            message: "Everyday I'm Guzzlin'!",
            buttons: [{ title: "Keep it Flowing." }],
            priority: 0,
          },
          (notificationId) => {
            console.log("Notification created:", notificationId);
          }
        );
      }
    }, 1000);
  }
};

const stopTimer = () => {
  clearInterval(timerInterval);
  isRunning = false;
};

const resetTimer = () => {
  clearInterval(timerInterval);
  timeLeft = 25 * 60;
  isRunning = false;
};

const setCustomTime = (minutes) => {
  clearInterval(timerInterval);
  timeLeft = minutes;
  isRunning = false;
};

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

  if (request.action === "start") {
    startTimer();
  } else if (request.action === "stop") {
    stopTimer();
  } else if (request.action === "reset") {
    resetTimer();
  } else if (request.action === "setNewTime") {
    console.log("setNewTime = ", request);
    setCustomTime(request.time);
  } else if (request.action === "getState") {
    sendResponse({ timeLeft, isRunning });
  }
});
