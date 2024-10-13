import { useMutation } from "@tanstack/react-query";
import { updateFile } from "../../features/apiFile";

export function useFileUpdateContent() {
  const { mutate: updateFileContent, isPending: isUpdatingFileContent } =
    useMutation({
      mutationFn: updateFile,
    });

  return { updateFileContent, isUpdatingFileContent };
}
