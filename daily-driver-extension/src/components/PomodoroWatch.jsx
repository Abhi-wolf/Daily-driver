/* eslint-disable no-undef */
import { useEffect, useState } from "react";
import { Play, Pause, RotateCcw, Clock } from "lucide-react";

function PomodoroWatch() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    chrome.runtime.sendMessage({ action: "getState" }, (response) => {
      setTime(response.timeLeft);
      setIsRunning(response.isRunning);
    });
  }, []);

  const startTimer = () => {
    chrome.runtime.sendMessage({ action: "start" });
    setIsRunning(true);
  };

  const stopTimer = () => {
    chrome.runtime.sendMessage({ action: "stop" });
    setIsRunning(false);
  };

  const resetTimer = () => {
    chrome.runtime.sendMessage({ action: "reset" });
    setTime(25 * 60);
    setIsRunning(false);
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(minutes).padStart(2, 0)} : ${String(secs).padStart(2, 0)}`;
  };

  const setCustomTime = (minutes) => {
    const newTime = minutes * 60;
    setTime(newTime);
    chrome.runtime.sendMessage({ action: "setNewTime", time: newTime });
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        chrome.runtime.sendMessage({ action: "getState" }, (response) => {
          setTime(response.timeLeft);
          setIsRunning(response.isRunning);
        });
      }, 10000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  return (
    <div className="w-[350px] h-[380px] bg-gray-600 text-gray-100 rounded-2xl p-4 flex flex-col items-center justify-between font-sans shadow-lg">
      <h2 className="text-2xl font-bold">Pomodoro Timer</h2>
      <div className="w-48 h-48 rounded-full bg-gray-800 flex items-center justify-center shadow-inner flex-col gap-2">
        <div className="text-4xl font-bold">{formatTime(time)}</div>
        <div
          className={`${
            isRunning ? "text-green-400" : "text-red-400"
          } text-sm font-semibold flex gap-2`}
        >
          <span
            className={`w-4 h-4 ${
              isRunning ? "bg-green-400" : "bg-red-400"
            } rounded-full`}
          ></span>
          <span>{isRunning ? "Running " : "Paused"}</span>
        </div>

        <div className="text-[8px] text-white">
          Updation after every 10 seconds...
        </div>
      </div>
      <div className="w-full mb-4">
        <label htmlFor="custom-time" className="flex items-center mb-2">
          <Clock className="w-4 h-4 mr-2" />
          <span className="text-sm">Set Timer (minutes):</span>
        </label>
        <input
          id="custom-time"
          type="range"
          min="1"
          max="60"
          value={Math.floor(time / 60)}
          onChange={(e) => setCustomTime(parseInt(e.target.value))}
          className="w-full accent-blue-500"
        />
        <div className="flex justify-between text-xs mt-1">
          <span>1</span>
          <span>{time}</span>
          <span>60</span>
        </div>
      </div>
      <div className="flex justify-between w-full">
        <button
          onClick={startTimer}
          disabled={isRunning}
          className={`bg-green-500 text-white rounded-lg px-3 py-2 flex items-center justify-center ${
            isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-green-600"
          }`}
        >
          <Play className="w-4 h-4 mr-1" />
          Start
        </button>
        <button
          onClick={stopTimer}
          disabled={!isRunning}
          className={`bg-yellow-500 text-white rounded-lg px-3 py-2 flex items-center justify-center ${
            !isRunning ? "opacity-50 cursor-not-allowed" : "hover:bg-yellow-600"
          }`}
        >
          <Pause className="w-4 h-4 mr-1" />
          Pause
        </button>
        <button
          onClick={resetTimer}
          className="bg-red-500 text-white rounded-lg px-3 py-2 flex items-center justify-center hover:bg-red-600"
        >
          <RotateCcw className="w-4 h-4 mr-1" />
          Reset
        </button>
      </div>
    </div>
  );
}

export default PomodoroWatch;
