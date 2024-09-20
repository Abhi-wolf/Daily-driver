/* eslint-disable react/prop-types */

import { EllipsisVertical } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { useState } from "react";
import { useDeleteProject } from "../../hooks/project/useDeleteProject";
import { toast } from "sonner";
import { useNavigate } from "react-router";

function EditDeleteProjectDropDown({ projectId }) {
  const [confirmDeleteDialog, setConfirmDeleteDialog] = useState(false);
  const { deleteProject, isPending } = useDeleteProject();
  const navigate = useNavigate();

  const handleDeleteProject = async () => {
    console.error("HANDLE DELETE");

    deleteProject(
      { projectId },
      {
        onSuccess: () => {
          toast.success("Project successfully deleted");
          setConfirmDeleteDialog(false);
          navigate("/tasksmanager");
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="flex flex-col gap-2 p-4">
        <Button
          variant="destructive"
          onClick={() => setConfirmDeleteDialog(true)}
        >
          Delete Project
        </Button>
        <Button variant="outline"> Edit Project</Button>
      </DropdownMenuContent>

      {confirmDeleteDialog && (
        <ConfirmDeleteDialog
          onClose={setConfirmDeleteDialog}
          isOpen={confirmDeleteDialog}
          isPending={isPending}
          handleDeleteProject={handleDeleteProject}
        />
      )}
    </DropdownMenu>
  );
}

function ConfirmDeleteDialog({
  onClose,
  isOpen,
  handleDeleteProject,
  isPending,
}) {
  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Once deleted the project cannot be recovered
          </DialogDescription>
        </DialogHeader>
        <Button
          type="submit"
          variant="destructive"
          disabled={isPending}
          onClick={handleDeleteProject}
        >
          Confirm Delete
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default EditDeleteProjectDropDown;
