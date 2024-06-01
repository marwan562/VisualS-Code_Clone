import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFile } from "../../interfaces";
import { fileTree } from "../../data";
import { changeActiveFile } from "../../utils/changeActiveFile"; // Corrected function name
import { addItemToFileTree } from "../../utils/addFile";
import { deleteItemFromFileTree } from "../../utils/removeContextMenu";

interface IClickedFile {
  fileName: string;
  fileContent: string | undefined;
}

type TState = {
  fileTree: IFile;
  openedFiles: IFile[];
  clickedFile: IClickedFile;
  removeFileTap: string | null;
};

const initialState: TState = {
  fileTree: { ...fileTree },
  openedFiles: [],
  clickedFile: {
    fileName: "",
    fileContent: "",
  },
  removeFileTap: null,
};

const fileTreeSlice = createSlice({
  name: "fileTree",
  initialState,
  reducers: {
    addFileAction: (
      state,
      action: PayloadAction<{ id: string; newItem: IFile }>
    ) => {
      state.fileTree = addItemToFileTree(
        state.fileTree,
        action.payload.id,
        action.payload.newItem
      );
    },
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
    removeFileTap: (state, action: PayloadAction<string | null>) => {
      state.removeFileTap = action.payload;
    },
    removeLeftSideContextMenu: (state, action: PayloadAction<string|null>) => {
      state.fileTree = deleteItemFromFileTree(state.fileTree, action.payload);
    },
  },
});

export const {
  setOpenedFiles,
  removeFile,
  setActiveFile,
  setContentAction,
  removeFileTap,
  addFileAction,
  removeLeftSideContextMenu
} = fileTreeSlice.actions;
export default fileTreeSlice.reducer;
