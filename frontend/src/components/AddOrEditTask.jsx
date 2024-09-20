/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";
import { useForm } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

import { CalendarClock, Flag } from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { DayPicker } from "react-day-picker";
import { transformDate } from "../lib/utils";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";

function AddOrEditTask({ isOpen, onClose }) {
  const [priority, setPriority] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  console.log(dueDate);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (item) => {
    console.log(item);
    onClose(false);
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle className="hidden">Task Form</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-col  gap-4">
            <div className="flex flex-col gap-2">
              <Textarea
                id="name"
                rows={4}
                placeholder="Task name ... "
                className="col-span-3 border-none hover:border-none rounded-md text-xl"
                {...register("name", { required: true })}
              />

              {errors.name && (
                <span className="text-red-400 my-1">Name is required.</span>
              )}
            </div>

            <div className="flex gap-4 items-center">
              {/* <div className="flex gap-2 border-2 border-gray-300 hover:border-gray-500 p-2 rounded-md text-gray-500 text-sm cursor-pointer hover:text-gray-600 font-semibold"></div> */}

              <DropdownMenu className="mr-4">
                <DropdownMenuTrigger asChild>
                  <div className="flex gap-2 border-2 border-gray-300 hover:border-gray-500 p-2 rounded-md text-gray-500 text-sm cursor-pointer hover:text-gray-600 font-semibold">
                    <CalendarClock className="h-5 w-5 hover:text-gray-400 transition cursor-pointer " />
                    <span>{transformDate(dueDate)}</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-6 mr-4">
                  <DayPicker
                    mode="single"
                    selected={dueDate}
                    onSelect={setDueDate}
                    modifiers={{ booked: dueDate }}
                    modifiersClassNames={{
                      booked: "bg-red-500 text-white rounded-full",
                    }}
                  />
                </DropdownMenuContent>
              </DropdownMenu>
              <div
                onClick={() => setPriority(!priority)}
                className={`${
                  priority
                    ? "text-red-600 border-red-300 hover:text-red-600 hover:border-red-300 bg-red-300"
                    : "text-green-600  border-green-300 hover:text-green-600 hover:border-green-300 bg-green-300"
                } flex gap-2 border-2   p-2 rounded-md text-sm cursor-pointer  font-semibold`}
              >
                <Flag className={`w-5 h-5 `} />
                <span className="">Priority</span>
              </div>
            </div>

            <Separator className="h-[1px] bg-gray-400" />
          </div>
          <div className="flex justify-between">
            <Select>
              <SelectTrigger className="w-[120px] border-gray-400 text-gray-500 font-semibold">
                <SelectValue placeholder="Label" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="work">Work</SelectItem>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="home">Home</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button type="submit">Save changes</Button>
          </div>
        </form>
        {/* <DialogFooter> */}
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default AddOrEditTask;
