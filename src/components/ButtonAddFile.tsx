import { useState } from "react";
import FolderStyles from "../assets/SVG/IconsGenerate";
import FilePlus from "../assets/SVG/FilePlus";
import { useAppDispatch } from "../toolkit/hooks";
import {
  addFileAction,
  setActiveFile,
  setOpenedFiles,
} from "../toolkit/reducers/fileTreeSlice";
import { v4 as uuidv4 } from "uuid";

type TProps = {
  selectId: string;
};

const ButtonAddFile = ({ selectId }: TProps) => {
  const dispatch = useAppDispatch();
  const [nameFile, setNameFile] = useState<{ name_file: string }>({
    name_file: "",
  });

  const onchangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target as {
      value: string;
      name: keyof typeof nameFile;
    };
    setNameFile({ [name]: value });
  };

  const addNewFileHandler = () => {
    const newItem = {
      id: uuidv4(),
      isFolder: false,
      isOpen: true,
      isActive: true,
      fileName: nameFile.name_file,
    };
    dispatch(addFileAction({ id: selectId, newItem }));
    dispatch(setActiveFile({ id: newItem.id }));
    dispatch(
      setOpenedFiles({
        fileTree: newItem,
        isActive: true,
      })
    );
  };

  return (
    <div className=" ">
      <div className="flex items-center justify-center ml-6 space-x-2">
        {nameFile.name_file ? (
          <FolderStyles isFolder={false} name={nameFile.name_file} />
        ) : (
          <FilePlus />
        )}

        <input
          onKeyDown={(e) => {
            if (e.key === "Enter" && nameFile.name_file) {
              addNewFileHandler();
            }
          }}
          onChange={onchangeHandler}
          name="name_file"
          type="text"
          className=" w-full mt-1 bg-gray-700 ml-4 text-base  outline-none rounded-sm"
        />
      </div>
      {!nameFile.name_file && (
        <span className="  border border-red-600 text-sm ml-[42px] w-full bg-red-900  ">
          A File name must be Provided
        </span>
      )}
    </div>
  );
};

export default ButtonAddFile;
