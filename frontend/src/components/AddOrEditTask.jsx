/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { useForm } from "react-hook-form";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";

function AddOrEditTask({ isOpen, onClose, isFolder = true }) {
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
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>
            Create a new {isFolder ? "folder" : "file"}{" "}
          </DialogTitle>
          <DialogDescription>
            This new {isFolder ? "folder" : "file"} will be created in the root
            folder. To create a {isFolder ? "folder" : "file"} in a specfic
            folder right click on that folder.
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 "
        >
          <div className="flex flex-col  gap-4">
            <Label htmlFor="name" className="text-left capitalize">
              {isFolder ? "folder" : "file"} name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              {...register("name", { required: true })}
            />

            {errors.name && (
              <span className="text-red-400 my-1">Name is required.</span>
            )}
          </div>
          <Button type="submit">Save changes</Button>
        </form>
        {/* <DialogFooter> */}
        {/* </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default AddOrEditTask;
