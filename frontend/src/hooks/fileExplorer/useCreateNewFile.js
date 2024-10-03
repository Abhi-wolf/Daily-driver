import { useMutation } from "@tanstack/react-query";
import { createNewFile as createNewFileApi } from "../../features/apiFile";

export function useCreateNewFile() {
  const { mutate: createNewFile, isPending: isCreatingNewFile } = useMutation({
    mutationFn: createNewFileApi,
  });

  return { createNewFile, isCreatingNewFile };
}
