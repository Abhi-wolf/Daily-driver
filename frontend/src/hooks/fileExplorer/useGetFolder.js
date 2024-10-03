import { useQuery } from "@tanstack/react-query";
import { getFolder } from "../../features/apiFolder";

export function useGetFolder(folderId) {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => getFolder(folderId),
    enabled: !!folderId,
  });

  return { data, isPending, isError, error };
}
