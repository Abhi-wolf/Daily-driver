/* eslint-disable react/prop-types */
import useTraverseTree from "@/hooks/useTraverseTree";
import FolderOrFile from "./FolderOrFile";
import ToolTip from "./ToolTip";
import { Folder, NotebookPen } from "lucide-react";
import { useState } from "react";
import AddFileOrFolder from "./AddFolderOrFile";
import { useGetUserFileExplorer } from "../hooks/fileExplorer/useGetFileExplorer";
import { useUpdateFileExplorer } from "../hooks/fileExplorer/useUpdateFileExplorer";

function Folderbar() {
  // const explorerData = {};
  const { data: explorerData, isPending } = useGetUserFileExplorer();
  const { updateFileExplorer, isUpdating } = useUpdateFileExplorer();

  console.log("explorerData = ", explorerData);

  const [newFolder, setNewFolder] = useState(false);
  const [newFile, setNewFile] = useState(false);
  const { insertNode, renameNode, deleteNode } = useTraverseTree();

  const handleInsertNode = async (folderId, item, isFolder) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);
    updateFileExplorer({ finalTree });
    console.log(finalTree);
  };

  const handleRenameNode = async (folderId, newName) => {
    const finalTree = renameNode(explorerData, folderId, newName);
    updateFileExplorer({ finalTree });
    console.log(finalTree);
  };

  const handleDeleteNode = async (folderId) => {
    const finalTree = deleteNode(explorerData, folderId);
    updateFileExplorer({ finalTree });

    console.log(finalTree);
  };

  if (isPending || isUpdating) {
    return <h1>Pending ..... </h1>;
  }

  return (
    <div className="block w-[300px] min-h-full border-2 border-gray-400 rounded-r-3xl ">
      <div className="w-full  py-4 flex flex-col gap-4">
        <h3 className="text-center text-violet-500 font-bold text-lg underline decoration-wavy py-2">
          Files And Folders
        </h3>

        <ul className="flex gap-8 justify-center items-center ">
          <li
            className="list-none cursor-pointer"
            onClick={() => setNewFile(!newFile)}
          >
            <ToolTip text="New Note">
              <NotebookPen className="h-4 w-4 hover:text-gray-400 transition" />
            </ToolTip>
          </li>
          <li
            className="list-none cursor-pointer"
            onClick={() => setNewFolder(!newFolder)}
          >
            <ToolTip text="New Folder">
              <Folder className="h-4 w-4 hover:text-gray-400 transition" />
            </ToolTip>
          </li>
        </ul>

        {newFolder && (
          <AddFileOrFolder
            isFolder={true}
            isOpen={newFolder}
            onClose={setNewFolder}
            insertNode={insertNode}
          />
        )}

        {newFile && (
          <AddFileOrFolder
            isFolder={false}
            isOpen={newFile}
            onClose={setNewFile}
            insertNode={insertNode}
          />
        )}
      </div>

      {explorerData?.items?.map((item) => {
        return (
          <FolderOrFile
            folder={item}
            key={item.id}
            handleInsertNode={handleInsertNode}
            handleRenameNode={handleRenameNode}
            handleDeleteNode={handleDeleteNode}
          />
        );
      })}
    </div>
  );
}

export default Folderbar;
