import {
  CalendarClock,
  CalendarDaysIcon,
  HashIcon,
  PlusCircle,
} from "lucide-react";

const projects = [
  {
    id: 122344,
    name: "Todo Application",
  },

  {
    id: 1255344,
    name: "Chat App",
  },

  {
    id: 287344,
    name: "URL Shortener",
  },

  {
    id: 3284344,
    name: "DSA Tracker ",
  },
];

function TaskManagerSideBar() {
  return (
    <div className="block w-[300px] min-h-full border-2 border-gray-400  p-4 pt-8 rounded-xl">
      <div className="flex flex-col gap-16">
        {/* Upper Part */}
        <ul className="flex flex-col gap-4">
          <li className="list-none flex gap-4 items-center text-orange-500 font-semibold">
            <PlusCircle className="h-6 w-6" />{" "}
            <span className="text-lg">Add Task</span>
          </li>
          <li className="list-none flex gap-4 items-center ">
            <CalendarClock className="h-5 w-5" />{" "}
            <span className="text-lg">Today</span>
          </li>
          <li className="list-none flex gap-4 items-center ">
            <CalendarDaysIcon className="h-5 w-5" />{" "}
            <span className="text-lg">Upcoming</span>
          </li>
        </ul>

        {/* Middle Part */}

        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-400">My Projects</h2>
          <ul className="flex flex-col gap-4">
            {projects.map((project) => (
              <li key={project.id} className="flex gap-4">
                <HashIcon className="h-5 w-5 text-purple-500" />{" "}
                <span>{project.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default TaskManagerSideBar;
