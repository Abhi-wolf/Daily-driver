import { useState, useEffect } from "react";
import { Clock, Play, Pause, RotateCcw } from "lucide-react";

export default function PomodoroWatch() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // Time left in seconds
  const [isActive, setIsActive] = useState(false); // Is the timer active?
  const [isWork, setIsWork] = useState(true); // Are we in work or break mode?
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0); // Count of completed Pomodoros
  const [workDuration, setWorkDuration] = useState(25); // Work duration in minutes
  const [breakDuration, setBreakDuration] = useState(5); // Break duration in minutes

  // Load saved state from chrome.storage when component mounts
  useEffect(() => {
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
        if (result.timeLeft !== undefined) setTimeLeft(result.timeLeft);
        if (result.isActive !== undefined) setIsActive(result.isActive);
        if (result.isWork !== undefined) setIsWork(result.isWork);
        if (result.pomodorosCompleted !== undefined)
          setPomodorosCompleted(result.pomodorosCompleted);
        if (result.workDuration !== undefined)
          setWorkDuration(result.workDuration);
        if (result.breakDuration !== undefined)
          setBreakDuration(result.breakDuration);
      }
    );
  }, []);

  // Format time into MM:SS format
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Toggle the timer (start or pause)
  const toggleTimer = () => {
    if (isActive) {
      chrome.runtime.sendMessage({ action: "pauseTimer" });
      setIsActive(false);
    } else {
      chrome.runtime.sendMessage({ action: "startTimer" });
      setIsActive(true);
    }
  };

  // Reset the timer to initial values
  const resetTimer = () => {
    chrome.runtime.sendMessage({ action: "resetTimer" });
    setIsActive(false);
    setIsWork(true);
    setTimeLeft(workDuration * 60); // Reset to work duration
    setPomodorosCompleted(0);
  };

  // Update progress bar calculation
  const progress = isWork
    ? ((workDuration * 60 - timeLeft) / (workDuration * 60)) * 100
    : ((breakDuration * 60 - timeLeft) / (breakDuration * 60)) * 100;

  return (
    <div className="w-[350px] p-2 bg-gray-100  rounded-lg ">
      <h1 className="text-2xl font-bold text-center mb-4">Pomodoro Timer</h1>
      <div className="flex justify-between mb-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="workDuration" className="p-1">
            Work (min)
          </label>
          <input
            id="workDuration"
            type="number"
            value={workDuration}
            onChange={(e) => setWorkDuration(Number(e.target.value))}
            className="w-20 p-2 rounded-lg shadow-md"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="breakDuration" className="p-1 ">
            Break (min)
          </label>
          <input
            id="breakDuration"
            type="number"
            value={breakDuration}
            onChange={(e) => setBreakDuration(Number(e.target.value))}
            className="w-20 p-2 rounded-lg shadow-md"
          />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-center text-4xl font-bold mb-2">
          <Clock className="mr-2" />
          {formatTime(timeLeft)}
        </div>
        <div className="text-center text-sm font-medium mb-2">
          {isWork ? "Work Time" : "Break Time"}
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-1000"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between mb-4">
        <button
          onClick={toggleTimer}
          className="px-4 py-2 bg-black border-2 border-stone-300 rounded-lg flex justify-center items-center text-white"
        >
          {isActive ? <Pause className="mr-2" /> : <Play className="mr-2" />}
          {isActive ? "Pause" : "Start"}
        </button>
        <button
          onClick={resetTimer}
          className="px-4 py-2 border-2 border-stone-300 flex gap-2 rounded-lg justify-center items-center"
        >
          <RotateCcw className="mr-2" />
          Reset
        </button>
      </div>
    </div>
  );
}
