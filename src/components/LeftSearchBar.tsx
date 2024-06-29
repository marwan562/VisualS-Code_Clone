import { useState, useEffect } from "react";
import IconsGenerate from "../assets/SVG/IconsGenerate";
import { IFile } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
import {
  setActiveFile,
  setContentAction,
  setOpenedFiles,
} from "../toolkit/reducers/fileTreeSlice";
import { changeActiveFile } from "../utils/changeActiveFile";
import debounce from "lodash/debounce";

const LeftSearchBar = () => {
  const [value, setValue] = useState<string>("");
  const [filteredNodes, setFilteredNodes] = useState<IFile[]>([]);

  const dispatch = useAppDispatch();
  const { fileTree, openedFiles } = useAppSelector((state) => state.fileTree);

  useEffect(() => {
    const debouncedSearch = debounce((query: string) => {
      const results = filterTreeByContentLazy(fileTree, query);
      setFilteredNodes(results);
    }, 300);

    debouncedSearch(value);

    return () => {
      debouncedSearch.cancel();
    };
  }, [value, fileTree]);

  const filterTreeByContentLazy = (node: IFile, query: string): IFile[] => {
    if (!query || !node) return [];

    const matchedNodes: IFile[] = node.content
      ?.toLowerCase()
      .includes(query.toLowerCase())
      ? [node]
      : [];

    if (node.isFolder && node.children) {
      node.children.forEach((child) => {
        matchedNodes.push(...filterTreeByContentLazy(child, query));
      });
    }

    return matchedNodes;
  };

  const handleInputChange = (query: string) => {
    setValue(query.trim());
  };

  const handleFileClick = (file: IFile) => {
    setValue("");

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

  const highlightQueryInContent = (content: string, query: string) => {
    if (!query) return content;
    const regex = new RegExp(`(${query})`, "gi");
    const parts = content.split(regex);
    return (
      <>
        {parts.map((part, index) =>
          part.toLowerCase() === query.toLowerCase() ? (
            <span key={index} className="bg-yellow-500">
              {part}
            </span>
          ) : (
            part
          )
        )}
      </>
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-center pt-2">
        <div>
          <h2 className="pb-2 font-semibold">SEARCH</h2>
          <input
            value={value}
            onChange={(e) => handleInputChange(e.target.value)}
            type="text"
            className="bg-gray-500"
          />
        </div>
      </div>
      <div className="overflow-y-auto flex-1 mt-2">
        {filteredNodes.map((el, index) => (
          <div
            key={index}
            onClick={() => handleFileClick(el)}
            className="pl-8 mt-3 hover:bg-gray-500/25 cursor-pointer"
          >
            <div className="flex space-x-2">
              <IconsGenerate isFolder={false} name={el.fileName} />
              <h2 className="truncate">{el.fileName}</h2>
            </div>
            <div className="truncate">
              {el.content && highlightQueryInContent(el.content, value)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSearchBar;
