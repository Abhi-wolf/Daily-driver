/* eslint-disable react/prop-types */

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/shadcn";
import "@blocknote/shadcn/style.css";
import { useEffect, useMemo, useState } from "react";

import { BlockNoteEditor } from "@blocknote/core";
import { saveToLocalStorage } from "../../lib/localStorage";
import { uploadFile } from "../../lib/uploadFile";

export default function Editor({ id, setFileContent, data }) {
  const [content, setContent] = useState("loading");

  useEffect(() => {
    setContent(data);
  }, [id]);

  const editor = useMemo(() => {
    if (content === "loading") {
      return undefined;
    }

    return BlockNoteEditor.create({
      initialContent: content,
      uploadFile,
    });
  }, [content]);

  if (editor === undefined) return "Loading content";

  return (
    <div className="min-w-full min-h-[94vh] overflow-y-auto border-1 p-4 ">
      <BlockNoteView
        editor={editor}
        formattingToolbar={true}
        onChange={() => {
          saveToLocalStorage(editor.document, id);
          setFileContent(JSON.stringify(editor.document));
          // setFileContent(editor.document);
        }}
      />
    </div>
  );
}
