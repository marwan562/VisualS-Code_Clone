import { IFile } from "../interfaces";

export const filterOpenedFiles = (
  openedFiles: IFile[],
  fileTree: IFile
): IFile[] => {
  const result = [] as IFile[];

  function traverse(treeNode: IFile) {
    if (
      treeNode.children &&
      treeNode.isFolder &&
      treeNode.children.length > 0
    ) {
      treeNode.children.forEach((child) => traverse(child));
    }

    const openedFile = openedFiles.find((file) => file.id === treeNode.id);
    if (openedFile) {
      if (treeNode.isActive) {
        result.push({ ...openedFile, isActive: true });
      } else {
        result.push({ ...openedFile, isActive: false });
      }
    }
  }

  traverse(fileTree);

  return result;
};
