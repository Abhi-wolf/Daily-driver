import { useSelector } from "react-redux";
import Folderbar from "../components/Folderbar";

function Files() {
  const fileToOpen = useSelector((state) => state.user.fileToOpen);

  console.log(fileToOpen);

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
