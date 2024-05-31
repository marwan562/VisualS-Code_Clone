import FolderComp from "./components/RecursiveFileComp";
import OpenedFileBar from "./components/OpenedFileBar";
import { useAppSelector } from "./toolkit/hooks";
import ResizeablePanel from "./components/ResizeablePanel";
import WelocmeTap from "./components/WelocmeTap";
import { useState } from "react";
import FolderPlus from "./assets/SVG/FolderPlus";
import FilePlus from "./assets/SVG/FilePlus";

function App() {
  const { fileTree, openedFiles } = useAppSelector((state) => state.fileTree);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);

  const showAddFolderHandler = () => {
    if (showAddFile) {
      setShowAddFile(false);
      setShowAddFolder(true);
    } else setShowAddFolder(!showAddFolder);
  };
  const showAddFileHandler = () => {
    if (showAddFolder) {
      setShowAddFile(true);
      setShowAddFolder(false);
    } else setShowAddFile(!showAddFile);
  };

  return (
    <div className=" ">
      <div className=" flex ">
        <ResizeablePanel
          showLeftPanel
          leftPanel={
            <div className=" mt-1">
              <div className="flex items-center justify-between px-2 m-1">
                <h2>{fileTree.fileName}</h2>
                <div className=" space-x-2">
                  <button onClick={showAddFolderHandler} title="add-folder">
                    <FolderPlus />
                  </button>
                  <button onClick={showAddFileHandler} title="add-file">
                    <FilePlus />
                  </button>
                </div>
              </div>
              <hr />
              <FolderComp
                setShowAddFile={setShowAddFile}
                showAddFile={showAddFile}
                setShowAddFolder={setShowAddFolder}
                showAddFolder={showAddFolder}
                fileTree={fileTree}
              />
            </div>
          }
          rightPanel={openedFiles.length ? <OpenedFileBar /> : <WelocmeTap />}
        />
      </div>
    </div>
  );
}

export default App;
