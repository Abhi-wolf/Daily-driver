import { useMutation } from "@tanstack/react-query";
import { renameFolder as renameFolderApi } from "../../features/apiFolder";

export function useRenameFolder() {
  const { mutate: renameFolder, isPending: isRenamingFolder } = useMutation({
    mutationFn: renameFolderApi,
  });

  return { renameFolder, isRenamingFolder };
}
