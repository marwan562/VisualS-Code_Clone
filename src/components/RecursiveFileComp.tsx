/* eslint-disable react-refresh/only-export-components */
import { memo, useState } from "react";
import ArrowIcon from "../assets/SVG/ArrowIcon.tsx";
import FolderStyles from "../assets/SVG/IconsGenerate.tsx";
import { IFile } from "../interfaces/index.ts";
import ArrowButtom from "../assets/SVG/ArrowButtom.tsx";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks.ts";
import {
  removeFileTap,
  renameFilesAction,
  setActiveFile,
  setContentAction,
  setOpenedFiles,
} from "../toolkit/reducers/fileTreeSlice.ts";
import { changeActiveFile } from "../utils/changeActiveFile.ts";
import ButtonAddFolder from "./ButtonAddFolder.tsx";
import ButtonAddFile from "./ButtonAddFile.tsx";

type TProps = {
  fileTree: IFile;
  showAddFolder?: boolean;
  showAddFile?: boolean;
  showRenameFile?: boolean;
  setShowAddFile: (val: boolean) => void;
  setShowRenameFile: (val: boolean) => void;
  setShowAddFolder: (val: boolean) => void;
};

const RecursiveFileComp = ({
  fileTree,
  showAddFolder,
  showAddFile,
  setShowAddFile,
  showRenameFile,
  setShowAddFolder,
  setShowRenameFile,
}: TProps) => {
  const dispatch = useAppDispatch();
  const { openedFiles, removeFileTap: selectIdRename } = useAppSelector(
    (state) => state.fileTree
  );
  const { fileName, isOpen, isFolder, children, isActive, id, content } =
    fileTree;

  const [renameFile, setRenameFile] = useState("");

  // Handlers

  const openFileHandler = () => {
    setShowAddFile(false);
    setShowAddFolder(false);
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
        onContextMenu={() => {
          if (showRenameFile) {
            setShowRenameFile(false);
          }
          dispatch(removeFileTap(fileTree.id));
        }}
        onClick={openFileHandler}
        className={`flex items-center ${
          isActive ? "bg-gray-500" : "hover:bg-gray-500 "
        } rounded-sm duration-300 p-[1px] hover:opacity-95 space-x-1 cursor-pointer`}
      >
        <div>
          {isFolder ? (
            <div className="flex items-center space-x-1">
              {isOpen ? <ArrowButtom /> : <ArrowIcon />}
              <FolderStyles
                isFolder={isFolder}
                isOpen={isOpen}
                name={
                  selectIdRename === fileTree.id && showRenameFile
                    ? renameFile
                    : fileName
                }
              />
            </div>
          ) : (
            <div className="ml-3 items-center flex">
              <FolderStyles
                isFolder={isFolder}
                isOpen={isOpen}
                name={
                  selectIdRename === fileTree.id && showRenameFile
                    ? renameFile
                    : fileName
                }
              />
            </div>
          )}
        </div>
        {selectIdRename === fileTree.id && showRenameFile ? (
          <input
            autoFocus
            defaultValue={fileName}
            onChange={(e) => setRenameFile(e.target.value)}
            className="  w-full mt-1 bg-gray-700 ml-4 text-base  outline-none rounded-sm "
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter" && renameFile) {
                setShowRenameFile(false);
                dispatch(
                  renameFilesAction({
                    newName: renameFile,
                    idToRename: selectIdRename,
                  })
                );
              }
            }}
          />
        ) : (
          <p>{fileName}</p>
        )}
      </span>

      {isActive && isFolder && !showAddFile && showAddFolder && (
        <ButtonAddFolder
          setShowAddFolder={setShowAddFolder}
          selectId={fileTree.id}
        />
      )}
      {isActive && isFolder && !showAddFolder && showAddFile && (
        <ButtonAddFile selectId={fileTree.id} />
      )}

      {isOpen &&
        children?.map((el) => (
          <RecursiveFileComp
            setShowRenameFile={setShowRenameFile}
            showRenameFile={showRenameFile}
            setShowAddFile={setShowAddFile}
            showAddFile={showAddFile}
            setShowAddFolder={setShowAddFolder}
            showAddFolder={showAddFolder}
            key={el.id}
            fileTree={el}
          />
        ))}
    </div>
  );
};

export default memo(RecursiveFileComp);
