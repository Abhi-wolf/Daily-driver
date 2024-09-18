/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm } from "react-hook-form";
import { useGetUserFileExplorer } from "../hooks/fileExplorer/useGetFileExplorer";
import { useUpdateFileExplorer } from "../hooks/fileExplorer/useUpdateFileExplorer";

function AddFileOrFolder({ isOpen, onClose, isFolder, insertNode }) {
  // const explorerData = [];
  const { updateFileExplorer, isUpdating } = useUpdateFileExplorer();
  const { data: explorerData, isPending } = useGetUserFileExplorer();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (item) => {
    try {
      const finalTree = insertNode(explorerData, "1", item.name, isFolder);
      console.log(finalTree);
      updateFileExplorer({ finalTree });
      onClose(false);
      navigate("/files");
    } catch (error) {
      console.log("AddFileOrFolder error = ", error);
    }
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
              disabled={false}
              {...register("name", { required: true })}
            />

            {errors.name && (
              <span className="text-red-400 my-1">Name is required.</span>
            )}
          </div>
          <Button type="submit" disabled={false}>
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddFileOrFolder;
