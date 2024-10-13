import { useMutation } from "@tanstack/react-query";
import { updateFile } from "../../features/apiFile";

export function useRenameFile() {
  const { mutate: renameFile, isPending: isRenamingFile } = useMutation({
    mutationFn: updateFile,
  });

  return { renameFile, isRenamingFile };
}
