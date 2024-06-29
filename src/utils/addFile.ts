import { IFile } from "../interfaces";

const deepCloneNode = (node: IFile): IFile => {
  return {
    ...node,
    children: node.children ? node.children.map(deepCloneNode) : [],
  };
};

export const addItemToFileTree = (
  node: IFile,
  parentId: string,
  newItem: IFile
): IFile => {
  const addItemRecursive = (currentNode: IFile): IFile => {
    // Clone the current node to avoid direct mutation
    const clonedNode = deepCloneNode(currentNode);

    if (clonedNode.id === parentId && clonedNode.isFolder) {
      clonedNode.children = [
        ...(clonedNode.children || []),
        {
          ...newItem,
          content: "",
        },
      ];
    } else {
      clonedNode.isActive = false;
    }

    if (clonedNode.children) {
      clonedNode.children = clonedNode.children.map(addItemRecursive);
    }

    return clonedNode;
  };

  return addItemRecursive(node);
};
