// tokenService.js

// Store tokens by sending a message to the background script
export const setTokens = (accessToken, refreshToken) => {
  return new Promise((resolve) => {
    console.log("Setting tokens:", accessToken, refreshToken); // Add this
    chrome.runtime.sendMessage(
      { action: "setTokens", accessToken, refreshToken },
      (response) => {
        console.log("Set token response:", response); // Add this
        resolve(response);
      }
    );
  });
};

// Retrieve tokens by sending a message to the background script
export const getTokens = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "getTokens" }, (tokens) => {
      resolve(tokens);
    });
  });
};

// Remove tokens by sending a message to the background script
export const removeTokens = () => {
  return new Promise((resolve) => {
    chrome.runtime.sendMessage({ action: "removeTokens" }, (response) => {
      resolve(response);
    });
  });
};

export const getTodayDate = () => {
  const today = new Date();
  return today.toISOString().split("T")[0];
};
