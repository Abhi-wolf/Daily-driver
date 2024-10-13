/* eslint-disable react/prop-types */
"use client";

import {
  BadgeIndianRupee,
  BookCheck,
  CalendarDays,
  Command,
  FolderPlus,
  Music,
  PencilLineIcon,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddOrEditTask from "./AddOrEditTask";
import ToolTip from "./ToolTip";

function FirstLeftSidebar() {
  const navigate = useNavigate();

  const [addNewTaskModal, setAddNewTaskModal] = useState(false);

  return (
    <>
      <div className="border-[1px] border-gray-300 h-full pt-4">
        <div className="flex flex-col justify-between items-center h-full">
          <div className="flex flex-col justify-center gap-8 p-1 m-2 ">
            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/fileExplorer")}
            >
              <ToolTip text="File Explorer">
                <FolderPlus className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>
            <li className="list-none cursor-pointer">
              <ToolTip text="Command menu">
                <Command className="h-5 w-5 hover:text-gray-400 transition " />
              </ToolTip>
            </li>
            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/calendar")}
            >
              <ToolTip text="Calender">
                <CalendarDays className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>

            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/tasksmanager")}
            >
              <ToolTip text="Task Manager">
                <BookCheck className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>
            <li
              className="list-none cursor-pointer"
              onClick={() => setAddNewTaskModal(!addNewTaskModal)}
            >
              <ToolTip text="New Task">
                <PencilLineIcon className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>

            <li className="list-none cursor-pointer">
              <ToolTip text="Spendings & Savings">
                <BadgeIndianRupee className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>

            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/music")}
            >
              <ToolTip text="Music">
                <Music className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>
          </div>

          {addNewTaskModal && (
            <AddOrEditTask
              isOpen={addNewTaskModal}
              onClose={setAddNewTaskModal}
            />
          )}

          {/* <div className="flex flex-col justify-center gap-8 p-1 m-2 ">
            <li
              className="list-none cursor-pointer"
              onClick={() => navigate("/profile")}
            >
              <ToolTip text="Settings">
                <Settings className="h-5 w-5 hover:text-gray-400 transition" />
              </ToolTip>
            </li>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default FirstLeftSidebar;
