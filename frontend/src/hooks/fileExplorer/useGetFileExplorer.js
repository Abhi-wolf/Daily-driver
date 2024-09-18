import { useQuery } from "@tanstack/react-query";
import { getUserFileExplorer } from "../../features/apiFileExplorer";

export function useGetUserFileExplorer() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ["fileExplorer"],
    queryFn: () => getUserFileExplorer(),
  });

  return { data, isPending, isError, error };
}
