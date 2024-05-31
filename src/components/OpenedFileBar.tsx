import { useState } from "react";
import { useAppSelector } from "../toolkit/hooks";
import { filterOpenedFiles } from "../utils/filterOpenedFiles";
import FileSyntaxHighlight from "./FileSyntaxHighlight";
import OpenedFileBarTap from "./OpenedFileBarTap";
import Menu from "./UI/Menu";

const OpenedFileBar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });

  const { openedFiles, fileTree, clickedFile } = useAppSelector(
    (state) => state.fileTree
  );

  const contextMuneHandler = (
    e: React.MouseEvent<HTMLUListElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowMenu(true);
    setMenuPosition({ x: e.clientX, y: e.clientY });
  };

  const filterOpenedFile = filterOpenedFiles(openedFiles, fileTree);

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
      {showMenu && <Menu position={menuPosition} />}
    </div>
  );
};

export default OpenedFileBar;
