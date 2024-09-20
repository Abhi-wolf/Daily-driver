import Folderbar from "../components/Folderbar";
import { useFileExplorerStore } from "../store";

function Files() {
  const { fileToOpen } = useFileExplorerStore();

  return (
    <>
      <Folderbar />
      <div className="w-full overflow-y-auto overflow-x-hidden">
        {fileToOpen}
        Dashboard
      </div>
    </>
  );
}

export default Files;
