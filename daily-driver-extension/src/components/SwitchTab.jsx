/* eslint-disable react/prop-types */
import { useState } from "react";
import PomodoroWatch from "./PomodoroWatch";
import LoginForm from "./LoginForm";

function SwitchTab({ setIsAuthenticated }) {
  const [tab, setTab] = useState("timer");

  return (
    <div className="w-[350px] flex flex-col justify-around  p-2 gap-2">
      <div className="w-full flex justify-between">
        <button
          onClick={() => setTab("login")}
          className={` w-full p-2 border-2 shadow-md ${
            tab === "login"
              ? "border-purple-300 shadow-purple-400"
              : "border-gray-400"
          } rounded-md `}
        >
          Login
        </button>
        <button
          onClick={() => setTab("timer")}
          className={` w-full p-2 border-2 shadow-md ${
            tab === "timer"
              ? "border-purple-300 shadow-purple-400"
              : "border-gray-400"
          } rounded-md `}
        >
          Timer
        </button>
      </div>

      {tab === "timer" ? (
        <PomodoroWatch />
      ) : (
        <LoginForm setIsLoggedIn={setIsAuthenticated} />
      )}
    </div>
  );
}

export default SwitchTab;
