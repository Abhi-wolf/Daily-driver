import {
  CalendarClock,
  CalendarDaysIcon,
  HashIcon,
  PlusCircle,
} from "lucide-react";
import { useProjectStore } from "../../store";
import { useNavigate, useParams } from "react-router";
import AddProjectModel from "./AddProjectModel";
import { useGetProjects } from "../../hooks/project/useGetProjects";
import { SmallSpinner } from "../Spinners";
import { useGetLabels } from "../../hooks/labels/useGetLabels";
import AddLabelModel from "./AddLabelModel";
import EditDeleteProjectDropDown from "./EditDeleteProjectDropDown";

function TaskManagerSideBar() {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { setprojectToOpen } = useProjectStore();
  const { projects, isPending: isGettingProjects } = useGetProjects();
  const { labels, isPending: isGettingLabels } = useGetLabels();

  return (
    <div className="block w-[300px] min-h-full border-2 border-gray-400  p-4 pt-8 rounded-r-3xl overscroll-y-scroll">
      <div className="flex flex-col gap-16 h-full overflow-y-auto">
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

        {/* labels */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-400">My Labels</h2>
          {isGettingLabels ? (
            <SmallSpinner />
          ) : (
            <ul className="flex flex-col gap-4 text-gray-500">
              {labels?.map((label) => (
                <li
                  key={label._id}
                  className="flex gap-4 cursor-pointer hover:text-gray-600 hover:font-semibold"
                >
                  <HashIcon className="h-5 w-5 text-purple-500" />{" "}
                  <span>{label.labelName}</span>
                </li>
              ))}

              <AddLabelModel />
            </ul>
          )}
        </div>

        {/* projects */}
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-400">My Projects</h2>
          {isGettingProjects ? (
            <SmallSpinner />
          ) : (
            <ul className="flex flex-col gap-4 text-gray-500 ">
              {projects?.map((project) => (
                <li
                  key={project._id}
                  onClick={() => {
                    setprojectToOpen(project?._id);
                    navigate(`/tasksmanager/project/${project._id}`);
                  }}
                  className={`${
                    projectId === project._id ? "text-green-400" : ""
                  } flex justify-between cursor-pointer  hover:font-semibold`}
                >
                  <div className="flex gap-4">
                    <HashIcon className="h-5 w-5 text-purple-500" />{" "}
                    <span>{project.projectName}</span>
                  </div>
                  <EditDeleteProjectDropDown projectId={projectId} />
                </li>
              ))}

              <AddProjectModel />
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskManagerSideBar;
