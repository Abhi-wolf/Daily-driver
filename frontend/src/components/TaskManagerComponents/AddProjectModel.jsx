/* eslint-disable react/prop-types */

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddProject } from "../../hooks/project/useAddProject";

function AddProjectModel() {
  const { addNewProject, isPending } = useAddProject();
  const [isOpen, onClose] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (newProject) => {
    try {
      addNewProject(
        { newProject },
        {
          onSuccess: (data) => {
            console.log(data);
            toast.success("Project created successfully");
            onClose(false);
          },
        }
      );
    } catch (error) {
      console.log("AddFileOrFolder error = ", error);
    }
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogTrigger asChild>
        <li className="list-none flex gap-4 items-center text-orange-400 font-semibold cursor-pointer hover:text-orange-700">
          <PlusCircle className="h-5 w-5" />{" "}
          <span className="text-md">Create new Project</span>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] p-8 text-gray-600">
        <DialogHeader>
          <DialogTitle>Create A New Project</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-col  gap-4">
            <Label htmlFor="projectName" className="text-left capitalize">
              Project title
            </Label>
            <Input
              id="projectName"
              className="col-span-3"
              disabled={isPending}
              {...register("projectName", { required: true })}
            />

            {errors.projectName && (
              <span className="text-red-400 my-1">Name is required.</span>
            )}
          </div>

          <div className="flex flex-col  gap-4">
            <Label
              htmlFor="projectDescription"
              className="text-left capitalize"
            >
              Project Description
            </Label>
            <Textarea
              id="projectDescription"
              className="col-span-3"
              disabled={isPending}
              {...register("projectDescription")}
            />

            {errors.projectDescription && (
              <span className="text-red-400 my-1">Name is required.</span>
            )}
          </div>
          <Button type="submit" disabled={isPending}>
            Create Project
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddProjectModel;
