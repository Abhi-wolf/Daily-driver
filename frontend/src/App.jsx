import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Profile from "./pages/Profile";
import Files from "./pages/Files";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskManager from "./pages/TaskManager";
import { KanbanBoard } from "./components/TaskManagerComponents/KanbanBoard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Home />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index path="/files" element={<Files />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tasksmanager" element={<TaskManager />}>
            <Route
              path="/tasksmanager/project/:projectId"
              element={<KanbanBoard />}
            />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
