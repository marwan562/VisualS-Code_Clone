/* eslint-disable react-refresh/only-export-components */
import { memo } from "react";
import ArrowIcon from "../assets/SVG/ArrowIcon.tsx";
import FolderStyles from "../assets/SVG/IconsGenerate.tsx";
import { IFile } from "../interfaces/index.ts";
import ArrowButtom from "../assets/SVG/ArrowButtom.tsx";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks.ts";
import {
  setActiveFile,
  setContentAction,
  setOpenedFiles,
} from "../toolkit/reducers/fileTreeSlice.ts";
import { changeActiveFile } from "../utils/changeActiveFile.ts";

type TProps = {
  fileTree: IFile;
  showAddFile?: boolean;
};

const RecursiveFileComp = ({ fileTree }: TProps) => {
  const dispatch = useAppDispatch();
  const { openedFiles } = useAppSelector((state) => state.fileTree);
  const { fileName, isOpen, isFolder, children, isActive, id, content } =
    fileTree;

  // Handlers

  const openFileHandler = () => {
    if (!isActive) {
      dispatch(setActiveFile(fileTree));
    } else if (isFolder && isActive) {
      dispatch(setActiveFile(fileTree));
    }
    if (!isFolder) {
      dispatch(setContentAction({ fileName, fileContent: content }));
    }

    if (!isFolder && !isActive) {
      const updatedFileTree = changeActiveFile(fileTree, id, true);

      dispatch(
        setOpenedFiles({
          fileTree: updatedFileTree,
          isActive: true,
        })
      );
    }

    const exists = openedFiles.find((file) => file.id === id);

    if (!exists && !isFolder) {
      const updatedFileTree = changeActiveFile(fileTree, id, true);
      dispatch(
        setOpenedFiles({
          fileTree: updatedFileTree,
          isActive: isFolder ? false : true,
        })
      );
    }
  };

  return (
    <div className="mb-1 ml-3 cursor-pointer">
      <span
        onClick={openFileHandler}
        className={`flex items-center ${
          isActive ? "bg-gray-500" : "hover:bg-gray-500"
        } rounded-md hover:scale-105 duration-300 p-[1px] hover:opacity-95 space-x-1 cursor-pointer`}
      >
        <div>
          {isFolder ? (
            <div className="flex items-center space-x-1">
              {isOpen ? <ArrowButtom /> : <ArrowIcon />}
              <FolderStyles
                isFolder={isFolder}
                isOpen={isOpen}
                name={fileName}
              />
            </div>
          ) : (
            <div className="ml-3 items-center flex">
              <FolderStyles
                isFolder={isFolder}
                isOpen={isOpen}
                name={fileName}
              />
            </div>
          )}
        </div>
        <p>{fileName}</p>
      </span>

      {isOpen &&
        children?.map((el) => <RecursiveFileComp key={el.id} fileTree={el} />)}
    </div>
  );
};

export default memo(RecursiveFileComp);
