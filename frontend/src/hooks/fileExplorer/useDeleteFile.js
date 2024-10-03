import { useMutation } from "@tanstack/react-query";
import { deleteFile as deleteFileApi } from "../../features/apiFile";

export function useDeleteFile() {
  const { mutate: deleteFile, isPending: isDeletingFile } = useMutation({
    mutationFn: deleteFileApi,
  });

  return { deleteFile, isDeletingFile };
}
