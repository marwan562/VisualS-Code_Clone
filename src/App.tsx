import FolderComp from "./components/RecursiveFileComp";
import OpenedFileBar from "./components/OpenedFileBar";
import { useAppDispatch, useAppSelector } from "./toolkit/hooks";
import ResizeablePanel from "./components/ResizeablePanel";
import WelocmeTap from "./components/WelocmeTap";
import { useState } from "react";
import FolderPlus from "./assets/SVG/FolderPlus";
import FilePlus from "./assets/SVG/FilePlus";
import Menu from "./components/UI/Menu";
import { removeLeftSideContextMenu } from "./toolkit/reducers/fileTreeSlice";

function App() {
  const { fileTree, openedFiles, removeFileTap } = useAppSelector(
    (state) => state.fileTree
  );
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const dispatch = useAppDispatch();

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
            <div
              onContextMenu={(e) => {
                setPosition({ x: e.clientX, y: e.clientY });
                setShowMenu(true);
              }}
              className=" mt-1"
            >
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

              {showMenu && (
                <Menu position={position} closeMenu={setShowMenu}>
                  <ul>
                    <li
                      onClick={() => {
                        setShowMenu(false);
                        dispatch(removeLeftSideContextMenu(removeFileTap));
                      }}
                      className=" hover:bg-blue-500 w-full  cursor-pointer p-1 mb-1 rounded-md duration-200 hover:scale-105"
                    >
                      Remove
                    </li>
                    <li className="hover:bg-blue-500 w-full p-1  cursor-pointer rounded-md duration-200 hover:scale-105">
                      Rename
                    </li>
                  </ul>
                </Menu>
              )}
            </div>
          }
          rightPanel={openedFiles.length ? <OpenedFileBar /> : <WelocmeTap />}
        />
      </div>
    </div>
  );
}

export default App;
