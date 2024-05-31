import React from "react";
import FolderStyles from "../assets/SVG/IconsGenerate";
import { IFile } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
import {
  removeFile,
  removeFileTap,
  setActiveFile,
  setContentAction,
  setOpenedFiles,
} from "../toolkit/reducers/fileTreeSlice";
import { changeActiveFile } from "../utils/changeActiveFile";

const OpenedFileBarTap = ({ fileTree }: { fileTree: IFile }) => {
  const dispatch = useAppDispatch();
  const { fileName, id, isActive, content } = fileTree;

  const { openedFiles } = useAppSelector((state) => state.fileTree);

  const openFileHandler = () => {
    dispatch(setContentAction({ fileContent: content, fileName }));
    if (!isActive) {
      dispatch(setActiveFile(fileTree));
    }
    const exists = openedFiles.find((file) => file.id === id);

    if (!exists) {
      const updatedFileTree = changeActiveFile(fileTree, id, true);
      dispatch(setOpenedFiles({ fileTree: updatedFileTree, isActive: true }));
    }
  };

  const onRemoveHandler = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();

    const filter = openedFiles.filter((file) => file.id !== fileTree?.id);
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

  return (
    <li
      onContextMenu={() => {
        dispatch(removeFileTap(fileTree.id));
      }}
      onClick={openFileHandler}
      key={id}
      className={` duration-300 flex items-center ${
        isActive
          ? " border-t-4  border-cyan-600 "
          : "hover:bg-gray-500 border-t-4  border-t-transparent"
      }  justify-center space-x-2 p-2 cursor-pointer duration-300  hover:opacity-90`}
    >
      <FolderStyles name={fileName} />
      <h2>{fileName}</h2>
      <button
        title="Close-File"
        onClick={onRemoveHandler}
        className="text-white  hover:bg-gray-700 rounded-md  "
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="17"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>
      </button>
    </li>
  );
};

export default OpenedFileBarTap;
