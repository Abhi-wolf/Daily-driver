import { useMutation } from "@tanstack/react-query";
import { createNewFolder as createNewFolderApi } from "../../features/apiFolder";

export function useCreateNewFolder() {
  const { mutate: createNewFolder, isPending: isCreatingNewFolder } =
    useMutation({
      mutationFn: createNewFolderApi,
    });

  return { createNewFolder, isCreatingNewFolder };
}
