import FolderComp from "./components/RecursiveFileComp";
import OpenedFileBar from "./components/OpenedFileBar";
import { useAppSelector } from "./toolkit/hooks";
import ResizeablePanel from "./components/ResizeablePanel";
import WelocmeTap from "./components/WelocmeTap";


function App() {
  const { fileTree, openedFiles } = useAppSelector((state) => state.fileTree);

  return (
    <div className=" ">
      <div className=" flex ">
        <ResizeablePanel
          showLeftPanel
          leftPanel={<FolderComp fileTree={fileTree} />}
          rightPanel={openedFiles.length ? <OpenedFileBar /> : <WelocmeTap />}
        />
      </div>
    </div>
  );
}

export default App;
