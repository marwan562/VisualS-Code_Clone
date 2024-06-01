import { IFile } from "../interfaces";

const deepCloneNode = (node: IFile): IFile => {
  return {
    ...node,
    children: node.children ? node.children.map(deepCloneNode) : [],
  };
};
export const deleteItemFromFileTree = (
  node: IFile,
  idToRemove: string | null
): IFile => {
  const removeItemRecursive = (currentNode: IFile): IFile | null => {
    const clonedNode = deepCloneNode(currentNode);

    if (clonedNode.id === idToRemove) {
      return null;
    }

    // Recursively check children nodes
    if (clonedNode.children) {
      clonedNode.children = clonedNode.children
        .map(removeItemRecursive)
        .filter((child) => child !== null) as IFile[]; // Remove null (deleted) nodes
    }

    return clonedNode;
  };

  return removeItemRecursive(node);
};
