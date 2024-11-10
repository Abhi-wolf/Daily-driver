/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [taskLabels, setTaskLabels] = useState([]);
  const [bookmarkLabels, setBookmarkLabels] = useState([]);

  // Load data from chrome storage when component mounts
  useEffect(() => {
    chrome.storage.local.get(
      ["user", "taskLabels", "bookmarkLabels"],
      (result) => {
        setUser(result.user || null);
        setTaskLabels(result.taskLabels || []);
        setBookmarkLabels(result.bookmarkLabels || []);
      }
    );
  }, []);

  // Update chrome storage whenever state changes
  useEffect(() => {
    chrome.storage.local.set({ user, taskLabels, bookmarkLabels });
  }, [user, taskLabels, bookmarkLabels]);

  function handleBookmarkLabels(items) {
    setBookmarkLabels(items);
  }

  function handleTaskLabels(items) {
    setTaskLabels(items);
  }

  function handleUser(item) {
    setUser(item);
  }

  return (
    <UserContext.Provider
      value={{
        user,
        taskLabels,
        bookmarkLabels,
        handleUser,
        handleBookmarkLabels,
        handleTaskLabels,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("User context was used outside of user context");
  }

  return context;
}

export { UserProvider, useUser };
