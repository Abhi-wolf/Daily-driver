import Folderbar from "../components/Folderbar";
import { useFileExplorerStore } from "../store";

function Files() {
  const { fileToOpen } = useFileExplorerStore();

  return (
    <section className="flex gap-1 min-h-full">
      <Folderbar />
      <div>
        {fileToOpen}
        Dashboard
      </div>
    </section>
  );
}

export default Files;
