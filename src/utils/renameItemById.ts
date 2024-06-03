import { IFile } from "../interfaces";

const deepCloneNode = (node: IFile): IFile => {
    return {
      ...node,
      children: node.children ? node.children.map(deepCloneNode) : [],
    };
  };


export const renameItemById = (node: IFile, idToRename: string, newFileName: string): IFile => {
    const renameItemRecursive = (currentNode: IFile): IFile => {
      // Clone the current node to avoid direct mutation
      const clonedNode = deepCloneNode(currentNode);
  
      // If the current node's ID matches the ID to rename, update its fileName
      if (clonedNode.id === idToRename) {
        clonedNode.fileName = newFileName;
      }
  
      // Recursively check children nodes
      if (clonedNode.children) {
        clonedNode.children = clonedNode.children.map(renameItemRecursive);
      }
  
      return clonedNode;
    };
  
    return renameItemRecursive(node);
  };