import { IFile } from "../interfaces";

// Function to deep clone an IFile node
const deepCloneNode = (node: IFile): IFile => {
    return {
      ...node,
      children: node.children ? node.children.map(deepCloneNode) : [],
    };
  };
  
  // Function to get all IFile objects in a nested structure
  export const getFileNames = (node: IFile): IFile[] => {
    const collectFilesRecursive = (currentNode: IFile): IFile[] => {
        const clonedNode = deepCloneNode(currentNode);
        let nonFolderFiles: IFile[] = [];

        if (!clonedNode.isFolder) {
            nonFolderFiles.push(clonedNode);
        }

        if (clonedNode.children) {
            clonedNode.children.forEach((child) => {
                nonFolderFiles = nonFolderFiles.concat(collectFilesRecursive(child));
            });
        }

        return nonFolderFiles;
    };

    return collectFilesRecursive(node);
  };