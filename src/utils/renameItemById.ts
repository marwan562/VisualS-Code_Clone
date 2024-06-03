import { IFile } from "../interfaces";

const deepCloneNode = (node: IFile): IFile => {
  return {
    ...node,
    children: node.children ? node.children.map(deepCloneNode) : [],
  };
};

export const renameItemById = (
  node: IFile,
  idToRename: string,
  newFileName: string
): IFile => {
  const renameItemRecursive = (currentNode: IFile): IFile => {
    const clonedNode = deepCloneNode(currentNode);

    if (clonedNode.id === idToRename) {
      clonedNode.fileName = newFileName;
    }

    if (clonedNode.children) {
      clonedNode.children = clonedNode.children.map(renameItemRecursive);
    }

    return clonedNode;
  };

  return renameItemRecursive(node);
};
