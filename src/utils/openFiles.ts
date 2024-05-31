import { IFile } from "../interfaces";

export const OpenedFiles = (openedFiles: IFile[], payload: IFile) => {
  const exitis = openedFiles.find((file) => file.fileName === payload.fileName);
  if (exitis) {
    return [...openedFiles];
  }
  return [...openedFiles, payload];
};
