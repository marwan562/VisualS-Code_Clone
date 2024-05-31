import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
import { filterOpenedFiles } from "../utils/filterOpenedFiles";
import FileSyntaxHighlight from "./FileSyntaxHighlight";
import OpenedFileBarTap from "./OpenedFileBarTap";
import Menu from "./UI/Menu";
import {
  removeFile,
  setActiveFile,
  setContentAction,
} from "../toolkit/reducers/fileTreeSlice";

const OpenedFileBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const { openedFiles, fileTree, clickedFile, removeFileTap } = useAppSelector(
    (state) => state.fileTree
  );

  const contextMuneHandler = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowMenu(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };
  const dispatch = useAppDispatch();

  const filterOpenedFile = filterOpenedFiles(openedFiles, fileTree);

  const closeOneFile = () => {
    setShowMenu(false);
    const filter = openedFiles.filter((file) => file.id !== removeFileTap);
    const lastTap = filter[filter.length - 1];
    const fileLastTap = openedFiles.find((file) => file?.id === lastTap?.id);

    dispatch(removeFile(filter));
    dispatch(
      setContentAction({
        fileContent: lastTap?.content,
        fileName: lastTap?.fileName,
      })
    );
    dispatch(setActiveFile(fileLastTap));
  };
  const closeAllFiles = () => {
    setShowMenu(false);
    dispatch(removeFile([]));
  };
  return (
    <div>
      <ul onContextMenu={contextMuneHandler} className=" flex  items-center ">
        {filterOpenedFile.map((el) => (
          <OpenedFileBarTap key={el.id} fileTree={el} />
        ))}
      </ul>
      {clickedFile.fileContent && (
        <FileSyntaxHighlight content={clickedFile.fileContent} />
      )}
      {showMenu && (
        <Menu closeMenu={setShowMenu} position={menuPosition}>
          <ul>
            <li
              onClick={closeOneFile}
              className=" hover:bg-blue-500 w-full  cursor-pointer p-1 mb-1 rounded-md duration-200 hover:scale-105"
            >
              Close
            </li>
            <li
              onClick={closeAllFiles}
              className="hover:bg-blue-500 w-full p-1  cursor-pointer rounded-md duration-200 hover:scale-105"
            >
              Close All
            </li>
          </ul>
        </Menu>
      )}
    </div>
  );
};

export default OpenedFileBar;
