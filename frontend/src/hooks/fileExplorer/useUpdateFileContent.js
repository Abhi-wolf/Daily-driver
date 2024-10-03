import { useMutation } from "@tanstack/react-query";
import { updateFileContent as updateFileContentApi } from "../../features/apiFile";

export function useFileUpdateContent() {
  const { mutate: updateFileContent, isPending: isUpdatingFileContent } =
    useMutation({
      mutationFn: updateFileContentApi,
    });

  return { updateFileContent, isUpdatingFileContent };
}
