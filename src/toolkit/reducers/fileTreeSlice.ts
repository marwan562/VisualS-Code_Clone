import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../../interfaces";
import { fileTree } from "../../data";
import { changeActiveFile } from "../../utils/changeActiveFile"; // Corrected function name

interface IClickedFile {
  fileName: string;
  fileContent: string | undefined;
}

type TState = {
  fileTree: IFile;
  openedFiles: IFile[];
  clickedFile: IClickedFile;
};

const initialState: TState = {
  fileTree: { ...fileTree },
  openedFiles: [],
  clickedFile: {
    fileName: "",
    fileContent: "",
  },
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    setActiveFile: (
      state,
      action: PayloadAction<{ id: string } | undefined>
    ) => {
      state.fileTree = changeActiveFile(
        state.fileTree,
        action?.payload?.id,
        true
      );
    },

    setOpenedFiles: (
      state,
      action: PayloadAction<{ fileTree: IFile; isActive: boolean | undefined }>
    ) => {
      const fileExists = state.openedFiles.some(
        (file) => file.id === action.payload.fileTree.id
      );

      if (!fileExists) {
        state.openedFiles.push({
          ...action.payload.fileTree,
          isActive: action.payload.isActive,
        });
      }
    },
    setContentAction: (state, actions: PayloadAction<IClickedFile>) => {
      state.clickedFile = actions.payload;
    },
    removeFile: (state, action: PayloadAction<IFile[]>) => {
      state.openedFiles = action.payload;
    },
  },
});

export const { setOpenedFiles, removeFile, setActiveFile, setContentAction } =
  fileTreeSlice.actions;
export default fileTreeSlice.reducer;
