/* eslint-disable react/prop-types */
import { Bell, Bookmark, CalendarDaysIcon } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useForm } from "react-hook-form";
import { transformDate } from "../lib/utils";
import { toast } from "sonner";
import { useUserStore } from "../store";
import { useLogout } from "../hooks/auth/useLogout";
import { useGetEvent } from "../hooks/events/useGetEvents";
import { useAddEvent } from "../hooks/events/useAddEvent";

function Topbar() {
  const [selected, setSelected] = useState();
  const [isOpen, onClose] = useState(false);
  const { removeUser } = useUserStore();
  const { logout, isPending } = useLogout();

  const { events } = useGetEvent();

  let eventDays = events?.map((event) => new Date(event.eventDate));

  const handleSelectDate = (date) => {
    setSelected(date);
    console.log(date);
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
    <header className="w-full border-[1px] border-gray-300 fixed top-0 left-0">
      <div className="p-2 flex justify-between items-center ">
        {/* left */}
        <div className="flex gap-4 items-center">
          <li className="list-none cursor-pointer">
            <Bookmark className=" h-5 w-5 hover:text-gray-400 transition" />
          </li>
        </div>

        {/* right */}
        <div className="flex gap-4 items-center">
          <div>
            <Bell className=" h-5 w-5 hover:text-gray-400 transition" />
          </div>
          <DropdownMenu className="mr-4">
            <DropdownMenuTrigger asChild>
              <CalendarDaysIcon className=" h-5 w-5 hover:text-gray-400 transition cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-6 mr-4">
              <DayPicker
                mode="single"
                selected={selected}
                onSelect={handleSelectDate}
                modifiers={{
                  booked: eventDays,
                }}
                modifiersClassNames={{
                  booked: "bg-red-500 text-white rounded-full",
                }}
              />
            </DropdownMenuContent>
          </DropdownMenu>
          <Avatar className="h-6 w-6 cursor-not-allowed">
            <AvatarImage src="" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

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

function AddEventDialog({ isOpen, onClose, selected, setSelected }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { addEvent, isPending } = useAddEvent();

  const onSubmit = async (data) => {
    setSelected("");

    const newEvent = {
      eventName: data?.eventName,
      eventDescription: data?.eventDescription,
      eventDate: data.eventDate,
      id: uuidv4(),
    };

    try {
      addEvent(
        { newEvent },
        {
          onSuccess: (data) => {
            console.log("eveny data = ", data);
            toast.success("Event Added successfully");
          },
          onError: (err) => {
            toast.error(err.message);
            console.log(err.message);
          },
        }
      );
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }

    onClose(!isOpen);
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Add important event&apos;s to get notifications on time.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex flex-col   gap-4">
            <Label htmlFor="eventName" className="text-left">
              Event Name
            </Label>
            <Input
              id="eventName"
              className="col-span-3"
              {...register("eventName", { required: true })}
              aria-invalid={errors.eventName ? "true" : "false"}
            />

            {errors.eventName && (
              <p className="text-red-400 text-sm">Event name is required</p>
            )}
          </div>
          <div className="flex flex-col   gap-4">
            <Label htmlFor="eventDescription" className="text-left">
              Event Description
            </Label>
            <Textarea
              placeholder="Type your event description here."
              id="eventDescription"
              className="col-span-3"
              {...register("eventDescription")}
            />
          </div>
          <div className="flex flex-col   gap-4">
            <Label htmlFor="eventDate" className="text-left">
              From
            </Label>
            <Input
              id="eventDate"
              type="date"
              defaultValue={transformDate(selected)}
              className="col-span-3"
              {...register("eventDate", {
                required: true,
                validate: (match) => {
                  return (
                    transformDate(new Date()) <= transformDate(match) ||
                    "Date should be greater than or equal to today's date"
                  );
                },
              })}
              aria-invalid={errors.eventDate ? "true" : "false"}
            />
            {errors.eventDate && (
              <p className="text-red-400 text-sm">
                {errors.eventDate?.message
                  ? errors.eventDate?.message
                  : "Date is required"}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="justify-self-end"
            disabled={isPending}
          >
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default Topbar;
