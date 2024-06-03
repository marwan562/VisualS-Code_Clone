import { useState } from "react";
import FolderStyles from "../assets/SVG/IconsGenerate";
import FolderPlus from "../assets/SVG/FolderPlus";
import { v4 as uuidv4 } from "uuid";
import {
  addFileAction,
  setActiveFile,
} from "../toolkit/reducers/fileTreeSlice";
import { useAppDispatch } from "../toolkit/hooks";

type TProps = {
  setShowAddFolder: (val: boolean) => void;
  selectId: string;
};

const ButtonAddFolder = ({ selectId, setShowAddFolder }: TProps) => {
  const dispatch = useAppDispatch();
  const [nameFolder, setNameFolder] = useState<{ name_folder: string }>({
    name_folder: "",
  });

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target as {
      value: string;
      name: keyof typeof nameFolder;
    };

    setNameFolder({ [name]: value });
  };

  const addNewFolderHandler = () => {
    setShowAddFolder(false);
    const newItem = {
      id: uuidv4(),
      isFolder: true,
      isOpen: false,
      isActive: true,
      fileName: nameFolder.name_folder,
    };
    dispatch(addFileAction({ id: selectId, newItem }));
    dispatch(setActiveFile({ id: newItem.id }));
  };

  return (
    <div className="  ">
      <div className=" flex  items-center justify-center ml-6 space-x-2">
        {nameFolder.name_folder ? (
          <FolderStyles isFolder={true} name={nameFolder.name_folder} />
        ) : (
          <FolderPlus />
        )}

        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" && nameFolder.name_folder) {
              addNewFolderHandler();
            }
          }}
          onChange={onchangeHandler}
          name="name_folder"
          type="text"
          className={` ${
            !nameFolder.name_folder && " outline-red-700 outline-2"
          } w-full mt-1 text-white bg-gray-700 ml-4 text-base  outline-none rounded-sm`}
        />
      </div>
      {!nameFolder.name_folder && (
        <div className="   text-white bg-red-800 w-fit  p-2 ml-[50px] border-2 border-red-700  ">
          A Folder name must be Provided
        </div>
      )}
    </div>
  );
};

export default ButtonAddFolder;
