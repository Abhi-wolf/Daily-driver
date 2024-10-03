/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { useParams } from "react-router";
import { useGetFile } from "../../hooks/fileExplorer/useGetFile";
import { useFileUpdateContent } from "../../hooks/fileExplorer/useUpdateFileContent";
import { MediumSpinner } from "../Spinners";
import { useQueryClient } from "@tanstack/react-query";
import Editor from "./Editor";

function File() {
  const queryClient = useQueryClient();
  const { fileId } = useParams();
  const { file, isPending } = useGetFile(fileId ? fileId : null);
  const { updateFileContent, isUpdatingFileContent } = useFileUpdateContent();

  const [filecontent, setFileContent] = useState();

  async function handleSave() {
    console.log("CONTENT = ", filecontent);
    console.log("type of = ", typeof filecontent);

    if (filecontent && fileId) {
      updateFileContent(
        { filecontent, fileId },
        {
          onSuccess: () => {
            toast.success("File updated successfully");
            queryClient.invalidateQueries({ queryKey: ["file", fileId] });
          },
          onError: (err) => {
            toast.error(err.message);
          },
        }
      );
    }
  }

  useEffect(() => {
    if (file?.data) {
      setFileContent(JSON.parse(file?.data));
      // setFileContent(file?.data);
    } else {
      setFileContent("");
    }
  }, [fileId, file]);

  return (
    <div className="m-2 min-h-[90vh]">
      <div className="w-full min-h-[90vh] relative ">
        {isPending || isUpdatingFileContent ? (
          <MediumSpinner />
        ) : (
          <Editor
            id={fileId}
            setFileContent={setFileContent}
            data={filecontent}
          />
        )}
      </div>

      <div className="flex gap-4 items-center text-right justify-end my-2 absolute bottom-12 right-4">
        <Button onClick={handleSave} disabled={isUpdatingFileContent}>
          Save
        </Button>
      </div>
    </div>
  );
}

export default File;
