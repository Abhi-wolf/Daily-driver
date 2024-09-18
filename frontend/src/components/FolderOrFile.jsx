/* eslint-disable react/prop-types */
"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "./ui/context-menu";
import {
  ChevronDown,
  ChevronRight,
  File,
  FolderOpen,
  Pencil,
  Trash2,
} from "lucide-react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import { Input } from "./ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { useFileExplorerStore } from "../store";

function FolderOrFile({
  folder,
  handleInsertNode,
  handleRenameNode,
  handleDeleteNode,
}) {
  const navigate = useNavigate();
  const { setFileToOpen } = useFileExplorerStore();
  const [expand, setExpand] = useState(false);
  const [deleteFileFolder, setDeleteFileFolder] = useState(false);

  const [showInput, setShowInput] = useState({
    visible: false,
    isFolder: null,
  });

  const [rename, setRename] = useState({
    visible: false,
    isFolder: null,
  });

  // add new file or folder
  function handleNewFileOrFolder(e, isFolder) {
    e.stopPropagation();
    console.log("isfolder = ", isFolder);
    setExpand(true);
    setShowInput({
      visible: true,
      isFolder: isFolder,
    });

    console.log(showInput);
  }

  function onAddFileOrFolder(e) {
    if (e.keyCode === 13 && e.target.value) {
      console.log("save file or folder");
      handleInsertNode(folder.id, e.target.value, showInput.isFolder);
      setShowInput({ ...showInput, visible: false });
    }
  }

  // rename new file or folder
  function handleRename(e, isFolder) {
    e.stopPropagation();
    setExpand(true);
    setRename({
      visible: true,
      isFolder: isFolder,
    });

    console.log(rename);
  }

  function onRenameFileOrFolder(e) {
    if (e.keyCode === 13 && e.target.value) {
      console.log("rename file or folder");
      handleRenameNode(folder.id, e.target.value);
      setRename({ ...rename, visible: false });
    }
  }

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger>
          {folder.isFolder ? (
            <>
              <div
                onClick={() => setExpand(!expand)}
                className="flex gap-2 text-gray-500 font-semibold text-sm capitalize cursor-pointer p-2  my-2 rounded-md hover:bg-gray-300"
              >
                {expand ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}

                {rename.visible ? (
                  <div className="flex gap-2 items-center">
                    <span>
                      {showInput.isFolder && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                    <Input
                      type="text"
                      defaultValue={folder.name}
                      className="bg-gray-100"
                      onKeyDown={onRenameFileOrFolder}
                    />
                  </div>
                ) : (
                  folder?.name
                )}
              </div>
              <div className={`${expand ? "block" : "hidden"} pl-6`}>
                {showInput.visible && (
                  <div className="flex gap-2 items-center">
                    <span>
                      {showInput.isFolder && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                    <Input
                      type="text"
                      // defaultValue="undefined"
                      placeholder="Name...."
                      className="bg-gray-100"
                      onKeyDown={onAddFileOrFolder}
                    />
                  </div>
                )}
                {folder.items.map((item) => {
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
            </>
          ) : (
            <div
              className="text-gray-500 font-semibold text-sm p-2 bg-gray-100 my-2 rounded-md cursor-pointer"
              onClick={() => {
                setFileToOpen(folder?.id);
                navigate("/files");
              }}
            >
              {rename.visible ? (
                <div className="flex gap-2 items-center">
                  <span>
                    {showInput.isFolder ? (
                      <ChevronRight className="w-4 h-4" />
                    ) : (
                      <File className="w-4 h-4" />
                    )}
                  </span>
                  <Input
                    type="text"
                    defaultValue={folder.name}
                    className="bg-gray-100"
                    onKeyDown={onRenameFileOrFolder}
                  />
                </div>
              ) : (
                <div className="flex gap-2 items-center">
                  <File className="w-4 h-4" />
                  {folder?.name}
                </div>
              )}
            </div>
          )}
        </ContextMenuTrigger>
        <ContextMenuContent className="w-64">
          {folder.isFolder && (
            <ContextMenuItem
              inset
              className="flex gap-4"
              onClick={(e) => handleNewFileOrFolder(e, false)}
            >
              <Pencil2Icon className="w-4 h-4" />
              <span> New Note</span>
            </ContextMenuItem>
          )}

          {folder.isFolder && (
            <ContextMenuItem
              inset
              className="flex gap-4"
              onClick={(e) => handleNewFileOrFolder(e, true)}
            >
              <FolderOpen className="w-4 h-4" />
              <span> New Folder</span>
            </ContextMenuItem>
          )}

          {folder.isFolder && <ContextMenuSeparator />}

          <ContextMenuItem
            inset
            className="flex gap-4"
            onClick={(e) => handleRename(e, folder.isFolder)}
          >
            <Pencil className="w-4 h-4" />
            <span> Rename</span>
          </ContextMenuItem>

          <ContextMenuSeparator />
          <ContextMenuItem
            inset
            className="flex gap-4 text-red-600 font-semibold"
            onClick={() => setDeleteFileFolder(!deleteFileFolder)}
          >
            <Trash2 className="w-4 h-4 " />
            <span> Delete</span>
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      {deleteFileFolder && (
        <ConfirmDeleteDianlog
          isOpen={deleteFileFolder}
          onClose={setDeleteFileFolder}
          handleDeleteNode={handleDeleteNode}
          id={folder.id}
        />
      )}
    </>
  );
}

function ConfirmDeleteDianlog({ onClose, isOpen, id, handleDeleteNode }) {
  const handleSubmit = () => {
    handleDeleteNode(id);
  };

  return (
    <Dialog onOpenChange={onClose} open={isOpen} modal defaultOpen={false}>
      <DialogContent className="sm:max-w-[425px] p-8">
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Once deleted the file or folder cannot be recovered
          </DialogDescription>
        </DialogHeader>
        <Button type="submit" variant="destructive" onClick={handleSubmit}>
          Save changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default FolderOrFile;
