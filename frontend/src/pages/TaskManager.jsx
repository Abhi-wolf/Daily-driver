import TaskManagerSideBar from "../components/TaskManagerSideBar";

function TaskManager() {
  return (
    <section className="flex gap-1 min-h-full">
      <TaskManagerSideBar />
      <div>Task Manager</div>
    </section>
  );
}

export default TaskManager;
