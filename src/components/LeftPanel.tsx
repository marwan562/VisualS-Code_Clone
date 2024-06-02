import { useState } from "react";
import FilePlus from "../assets/SVG/FilePlus";
import FolderPlus from "../assets/SVG/FolderPlus";
import FontEdit from "../assets/SVG/FontEdit";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
import RecursiveFileComp from "./RecursiveFileComp";
import Menu from "./UI/Menu";
import { removeLeftSideContextMenu } from "../toolkit/reducers/fileTreeSlice";

type TProps = {
  showMenuTheme: boolean;
  setShowMenuTheme: (val: boolean) => void;
};

const LeftPanel = ({ setShowMenuTheme, showMenuTheme }: TProps) => {
  const dispatch = useAppDispatch();
  const { fileTree, removeFileTap } = useAppSelector((state) => state.fileTree);

  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

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

  const themeHandler = () => {
    setShowMenuTheme(!showMenuTheme);
  };
  return (
    <div
      onContextMenu={(e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        setShowMenu(true);
      }}
      className=" mt-1"
    >
      <div className="flex items-center justify-between px-2 my-[9px]">
        <h2>{fileTree.fileName}</h2>
        <div className=" space-x-2">
          <button onClick={themeHandler} title="Edit-Theme">
            <FontEdit />
          </button>
          <button onClick={showAddFolderHandler} title="add-folder">
            <FolderPlus />
          </button>
          <button onClick={showAddFileHandler} title="add-file">
            <FilePlus />
          </button>
        </div>
      </div>
      <hr />
      <RecursiveFileComp
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
  );
};

export default LeftPanel;
