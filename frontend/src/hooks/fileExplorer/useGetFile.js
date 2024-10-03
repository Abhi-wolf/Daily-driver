import { useQuery } from "@tanstack/react-query";
import { getFile } from "../../features/apiFile";

export function useGetFile(fileId) {
  const {
    data: file,
    error,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["file", fileId],
    queryFn: () => getFile(fileId),
    enabled: !!fileId,
  });

  return { file, isPending, isError, error };
}
