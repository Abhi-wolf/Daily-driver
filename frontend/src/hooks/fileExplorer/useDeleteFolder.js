import { useMutation } from "@tanstack/react-query";
import { deleteFolder as deleteFolderApi } from "../../features/apiFolder";

export function useDeleteFolder() {
  const { mutate: deleteFolder, isPending: isDeletingFolder } = useMutation({
    mutationFn: deleteFolderApi,
  });

  return { deleteFolder, isDeletingFolder };
}
