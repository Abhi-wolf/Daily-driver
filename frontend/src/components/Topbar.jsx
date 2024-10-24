/* eslint-disable react/prop-types */
import { Bell, Bookmark, CalendarDaysIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";

import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "sonner";
import { useUserStore } from "../store";
import { useLogout } from "../hooks/auth/useLogout";
import { useGetEvent } from "../hooks/events/useGetEvents";
import { useNavigate } from "react-router";
import AddEventDialog from "./EventDialog";
import TodaysDate from "./TodaysDate";

function Topbar() {
  const [selected, setSelected] = useState();
  const [isOpen, onClose] = useState(false);

  const { removeUser } = useUserStore();
  const { events } = useGetEvent();
  const { user } = useUserStore();

  const { logout, isPending } = useLogout();
  const navigate = useNavigate();

  let eventDays = events?.map((event) => ({
    from: new Date(event.startDate),
    to: new Date(event.endDate),
  }));

  const handleSelectDate = (date) => {
    setSelected(date);
    onClose(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      removeUser();
      toast.success("Successfully logged out");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="w-full border-[1px] border-gray-300 fixed top-0 left-0 z-50">
      <div className="flex justify-between items-center ">
        {/* left */}
        <div className="flex gap-4 items-center">
          <li className="list-none cursor-pointer">
            <Bookmark className=" h-5 w-5 hover:text-gray-400 transition" />
          </li>
        </div>

        {/* today's date */}
        <TodaysDate />

        {/* right */}
        <div className="flex gap-6 items-center">
          <div>
            <Bell className=" h-5 w-5 hover:text-gray-400 transition" />
          </div>
          <DropdownMenu className="mr-4">
            <DropdownMenuTrigger asChild>
              <CalendarDaysIcon className=" h-5 w-5 hover:text-gray-400 transition cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-6 mr-4 flex flex-col gap-4">
              <DayPicker
                mode="range"
                selected={selected}
                onSelect={handleSelectDate}
                modifiers={{
                  booked: eventDays,
                }}
                modifiersClassNames={{
                  booked: "bg-red-500 text-white rounded-full",
                }}
              />

              <Button onClick={() => setSelected()} variant="secondary">
                Clear Selected Dates
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>

          <div
            className="flex gap-2 justify-between items-center border-l-2 border-r-2 px-[6px] my-2 border-gray-200 cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            <Avatar className="h-6 w-6 ">
              <AvatarImage src="" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex flex-col ">
              <span className="text-xs text-purple-600 font-semibold">
                {user?.name}
              </span>
              <span className="text-xs text-gray-500  ">{user?.email}</span>
            </div>
          </div>

          <Button
            variant="destructive"
            disabled={isPending}
            className="h-6 rounded-md px-2 text-xs"
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </div>
      </div>

      {isOpen && (
        <AddEventDialog
          isOpen={isOpen}
          onClose={onClose}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </header>
  );
}

export default Topbar;
