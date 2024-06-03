import React, { useState } from "react";
import Search from "../assets/SVG/Search";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
import FolderStyles from "../assets/SVG/IconsGenerate";
import {
  setActiveFile,
  setContentAction,
  setOpenedFiles,
} from "../toolkit/reducers/fileTreeSlice";
import { changeActiveFile } from "../utils/changeActiveFile";
import { getFileNames } from "../utils/getFIleNames";

interface IFile {
  id: string;
  fileName: string;
  isFolder: boolean;
  children?: IFile[];
  isActive?: boolean;
  isOpen?: boolean;
  content?: string;
}

const SearchRecursive = () => {
  const dispatch = useAppDispatch();
  const { fileTree, openedFiles } = useAppSelector((state) => state.fileTree);
  const renderFileNames = getFileNames(fileTree);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isMouseOverList, setIsMouseOverList] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    if (!isMouseOverList) {
      setIsFocused(false);
    }
  };

  const handleMouseEnterList = () => {
    setIsMouseOverList(true);
  };

  const handleMouseLeaveList = () => {
    setInputValue("");
    setIsMouseOverList(false);
    setIsFocused(false);
  };

  const handleFileClick = (file: IFile) => {
    setInputValue("");
    setIsFocused(false);

    dispatch(
      setContentAction({ fileContent: file.content, fileName: file.fileName })
    );
    if (!file.isActive) {
      dispatch(setActiveFile(file));
    }
    const exists = openedFiles.find((openedFile) => openedFile.id === file.id);

    if (!exists) {
      const updatedFileTree = changeActiveFile(file, file.id, true);
      dispatch(setOpenedFiles({ fileTree: updatedFileTree, isActive: true }));
    }
  };

  const filterFileTree = (node: IFile, query: string): IFile[] => {
    if (!query) {
      return [];
    }

    if (
      !node.isFolder &&
      node.fileName.toLowerCase().includes(query.toLowerCase())
    ) {
      return [node];
    }

    if (node.isFolder && node.children) {
      return node.children
        .map((child) => filterFileTree(child, query))
        .flat()
        .filter(Boolean);
    }

    return [];
  };

  let filteredTree: IFile[] = [];

  if (isFocused && !inputValue) {
    filteredTree = filterFileTree(fileTree, "");
  } else {
    filteredTree = filterFileTree(fileTree, inputValue);
  }

  return (
    <div className=" border-b flex justify-center relative">
      <div className="relative inline-block w-1/2 mb-2">
        <input
          className="w-full text-center  placeholder:text-black placeholder:text-center pl-10 focus:outline-none bg-[#1e1e1e] text-[#d4d4d4] border border-[#3c3c3c] rounded-[4px] shadow-md focus:shadow-lg focus:border-[#007acc] transition duration-200"
          placeholder={`Search ${fileTree.fileName}`}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />

        {!inputValue && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none transition-opacity duration-200">
            <Search />
          </div>
        )}
        {isFocused && (
          <div
            className="absolute w-full mt-1 bg-[#1e1e1e] text-[#d4d4d4] border border-[#3c3c3c] rounded-[4px] shadow-lg max-h-40 overflow-auto z-10"
            onMouseEnter={handleMouseEnterList}
            onMouseLeave={handleMouseLeaveList}
          >
            {filteredTree.length ? (
              filteredTree.map((fileName, inx) => (
                <div
                  key={inx}
                  className="p-2 cursor-pointer flex items-center justify-start space-x-3 hover:bg-[#2a2d2e]"
                  onClick={() => handleFileClick(fileName)}
                >
                  <FolderStyles name={fileName.fileName} isFolder={false} />
                  <h2>{fileName.fileName}</h2>
                </div>
              ))
            ) : (
              <div className="p-2">
                {renderFileNames.map((file, inx) => {
                  return (
                    <div
                      key={inx}
                      className="p-2  cursor-pointer flex items-center justify-start space-x-3 hover:bg-[#2a2d2e]"
                      onClick={() => handleFileClick(file)}
                    >
                      <FolderStyles name={file.fileName} isFolder={false} />
                      <h2>{file.fileName}</h2>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchRecursive;
