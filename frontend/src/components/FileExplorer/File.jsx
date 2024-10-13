/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Button } from "../ui/button";
import { useParams } from "react-router";
import { useGetFile } from "../../hooks/fileExplorer/useGetFile";
import { useFileUpdateContent } from "../../hooks/fileExplorer/useUpdateFileContent";
import { MediumSpinner } from "../Spinners";
import { useQueryClient } from "@tanstack/react-query";
import TextEditor from "./TextEditor";

const fakeData = {
  "8f5a826d-018d-43dc-934c-a0dbcab85e9f": {
    id: "8f5a826d-018d-43dc-934c-a0dbcab85e9f",
    value: [
      {
        id: "f922ce40-51be-4986-af73-8e1d8819a77b",
        type: "paragraph",
        children: [{ text: "Hello world" }],
        props: { nodeType: "block" },
      },
    ],
    type: "Paragraph",
    meta: { order: 0, depth: 0 },
  },
};

function File() {
  const queryClient = useQueryClient();
  const { fileId } = useParams();
  const { file, isPending } = useGetFile(fileId ? fileId : null);
  const { updateFileContent, isUpdatingFileContent } = useFileUpdateContent();

  const [filecontent, setFileContent] = useState();

  async function handleSave() {
    let convertedToString = filecontent;

    // if (filecontent && fileId) {
    //   updateFileContent(
    //     { convertedToString, fileId },
    //     {
    //       onSuccess: () => {
    //         toast.success("File updated successfully");
    //         queryClient.invalidateQueries({ queryKey: ["file", fileId] });
    //       },
    //       onError: (err) => {
    //         toast.error(err.message);
    //       },
    //     }
    //   );
    // }
  }

  useEffect(() => {
    if (file?.data && file.data != "") {
      console.log(file.data);
      setFileContent(fakeData);
    } else {
      setFileContent("");
    }
  }, [fileId]);

  return (
    <div className="m-2 min-h-[90vh]">
      <div className="w-full min-h-[90vh] relative ">
        {isPending || isUpdatingFileContent ? (
          <MediumSpinner />
        ) : (
          <TextEditor
            fileId={fileId}
            setFileContent={setFileContent}
            handleSave={handleSave}
            fileData={filecontent}
          />
        )}
      </div>

      {/* {fileId} */}
      {/* <div className="flex gap-4 items-center text-right justify-end my-2 absolute bottom-12 right-4">
        <Button onClick={handleSave} disabled={isUpdatingFileContent}>
          Save
        </Button>
      </div> */}
    </div>
  );
}

export default File;
