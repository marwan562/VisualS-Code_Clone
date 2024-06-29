import { useState } from "react";
import IconsGenerate from "../assets/SVG/IconsGenerate";
import { IFile } from "../interfaces";
import { useAppSelector } from "../toolkit/hooks";

const LeftSearchBar = () => {
  const [value, setValue] = useState<string>("");
  const { fileTree } = useAppSelector((state) => state.fileTree);

  const filterTreeByContentLazy = (
    fileName: IFile,
    valueInput: string
  ): IFile[] => {
    if (!valueInput || !fileName) return [];

    const matchedNodes: IFile[] = fileName.content
      ?.toLowerCase()
      .includes(valueInput.toLowerCase())
      ? [fileName]
      : [];

    if (fileName.isFolder && fileName.children) {
      fileName.children.forEach((el) => {
        matchedNodes.push(...filterTreeByContentLazy(el, valueInput));
      });
    }
    return matchedNodes;
  };
  const filteredNodes = filterTreeByContentLazy(fileTree, value);

  const handleInputChange = (query: string) => {
    setValue(query.trim());
  };

  return (
    <div className="">
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
      <div className="overflow-y-auto">
        {filteredNodes.map((el, index) => (
          <div
            key={index}
            className="pl-8 mt-3 hover:bg-gray-500/25 cursor-pointer"
          >
            <div className="flex space-x-2">
              <IconsGenerate isFolder={false} name={el.fileName} />
              <h2 className="truncate">{el.fileName}</h2>
            </div>
            <div>{el.content}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftSearchBar;
