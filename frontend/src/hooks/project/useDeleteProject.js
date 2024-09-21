import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject as deleteProjectApi } from "../../features/apiProject";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isPending } = useMutation({
    mutationFn: deleteProjectApi,
    onSuccess: (projectId) => {
      console.log("Deleted project ID:", projectId);
      queryClient.removeQueries(["project", projectId]);
      queryClient.invalidateQueries(["projects"]);
    },
  });

  return { deleteProject, isPending };
}
