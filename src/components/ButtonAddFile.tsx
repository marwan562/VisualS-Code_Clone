import { useState } from "react";
import FolderStyles from "../assets/SVG/IconsGenerate";
import FilePlus from "../assets/SVG/FilePlus";
import { useAppDispatch } from "../toolkit/hooks";
import {
  addFileAction,
  setActiveFile,
  setContentAction,
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
      content:''
    };
    dispatch(addFileAction({ id: selectId, newItem }));
    dispatch(setActiveFile({ id: newItem.id }));
    dispatch(
      setOpenedFiles({
        fileTree: newItem,
        isActive: true,
      })
    );
    dispatch(setContentAction({fileName:newItem.fileName ,fileContent:newItem.content}))
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
          className={` ${!nameFile.name_file && " outline-red-700 outline-2"} w-full mt-1 text-white bg-gray-700 ml-4 text-base  outline-none rounded-sm`}
        />
      </div>
      {!nameFile.name_file && (
        <div className=" text-white bg-red-800 w-fit  p-2 ml-[50px] border-2 border-red-700 ">
          A File name must be Provided
        </div>
      )} 
    </div>
  );
};

export default ButtonAddFile;
