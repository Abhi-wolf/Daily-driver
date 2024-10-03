import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Profile from "./pages/Profile";
import Files from "./pages/Files";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import TaskManager from "./pages/TaskManager";
import { KanbanBoard } from "./components/TaskManagerComponents/KanbanBoard";
import CalendarPage from "./pages/CalendarPage";
import Music from "./pages/Music";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Todos from "./pages/Todos";
import NotesEditor from "./pages/NotesEditor";

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
          <Route path="/profile" element={<Profile />} />
          <Route path="/files" element={<Files />}>
            <Route path=":fileId" element={<NotesEditor />} />
          </Route>
          <Route index path="/calendar" element={<CalendarPage />} />
          <Route path="/music" element={<Music />} />
          <Route path="/tasksmanager" element={<TaskManager />}>
            <Route
              index
              element={<Navigate to="/tasksmanager/todos" replace />}
            />
            <Route path="todos" element={<Todos />} />
            <Route path="project/:projectId" element={<KanbanBoard />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetPassword/:token" element={<ResetPassword />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
