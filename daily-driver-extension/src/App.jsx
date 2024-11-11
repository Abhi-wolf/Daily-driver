import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import { getTokens } from "./utils";
import AddTodoForm from "./components/AddTodoForm";
import Profile from "./components/Profile";
import AddBookmark from "./components/AddBookmark";
import { logoutUser } from "./features/auth";
import SwitchTab from "./components/SwitchTab";
import PomodoroWatch from "./components/PomodoroWatch";
import {
  Bookmark,
  LogOutIcon,
  NotebookTabs,
  PersonStanding,
  Timer,
} from "lucide-react";

function App() {
  const [view, setView] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      setIsAuthenticated(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function getTokensFromStorage() {
      const tokens = await getTokens();

      if (tokens?.accessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    }

    getTokensFromStorage();
  }, []);

  const renderView = () => {
    switch (view) {
      case "todo":
        return <AddTodoForm />;
      case "bookmark":
        return <AddBookmark />;
      case "profile":
        return <Profile />;
      default:
        return <PomodoroWatch />;
    }
  };

  if (!isAuthenticated) {
    return <SwitchTab setIsAuthenticated={setIsAuthenticated} />;
  }

  return (
    <div className="w-[350px] bg-gray-100 rounded-lg flex flex-col h-[420px]">
      {isAuthenticated && (
        <>
          <nav className="flex justify-between items-center w-full bg-gray-300 p-2 mb-2 rounded-md">
            <ul className="flex gap-6 items-center">
              <li
                className={`cursor-pointer ${
                  view === "todo" ? "text-purple-400" : "text-gray-500"
                }`}
                onClick={() => setView("todo")}
              >
                <NotebookTabs className="w-5 h-5" />
              </li>
              <li
                className={`cursor-pointer ${
                  view === "bookmark" ? "text-purple-400" : "text-gray-500"
                }`}
                onClick={() => setView("bookmark")}
              >
                <Bookmark className="w-5 h-5" />
              </li>
              <li
                className={`cursor-pointer ${
                  view === "profile" ? "text-purple-400" : "text-gray-500"
                }`}
                onClick={() => setView("profile")}
              >
                <PersonStanding className="w-5 h-5" />
              </li>
              <li
                className={`cursor-pointer ${
                  view === "timer" ? "text-purple-400" : "text-gray-500"
                }`}
                onClick={() => setView("timer")}
              >
                <Timer className="w-5 h-5" />
              </li>
            </ul>

            <button
              className="bg-red-400 rounded-lg p-2 text-white"
              onClick={() => handleLogout()}
            >
              <LogOutIcon className="w-5 h-5" />
            </button>
          </nav>

          <section>{renderView()}</section>
        </>
      )}
    </div>
  );
}

export default App;
