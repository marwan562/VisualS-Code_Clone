import { IFile } from "../interfaces";

// Function to deep clone an IFile node
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

    if (clonedNode.children) {
      clonedNode.children = clonedNode.children
        .map(removeItemRecursive)
        .filter((child): child is IFile => child !== null);
    }

    return clonedNode;
  };

  const result = removeItemRecursive(node);

  if (result === null) {
    return { id: "", fileName: "", isFolder: false };
  }

  return result;
};
