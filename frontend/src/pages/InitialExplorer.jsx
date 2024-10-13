import DataNotFound from "../components/DataNotFound";
import FileBox from "../components/FileExplorer/common/FileBox";
import FolderBox from "../components/FileExplorer/common/FolderBox";
import { LargeSpinner } from "../components/Spinners";
import { useGetUserFileExplorer } from "../hooks/fileExplorer/useGetFileExplorer";

function InitialExplorer() {
  const { data: explorerData, isPending } = useGetUserFileExplorer();

  return (
    <div className="flex flex-wrap gap-4 w-full min-h-full p-4 mt-8">
      {isPending ? (
        <LargeSpinner />
      ) : (
        <>
          {explorerData?.map((item) => {
            if (item.type === "folder")
              return <FolderBox key={item._id} folder={item} />;
            else return <FileBox key={item._id} file={item} />;
          })}

          {explorerData.length === 0 && (
            <DataNotFound message="No files and folders found" size="6xl" />
          )}
        </>
      )}
    </div>
  );
}

export default InitialExplorer;
