import { IFile } from "../interfaces";

// Helper function to deep clone a node
const deepCloneNode = (node: IFile): IFile => {
  return {
    ...node,
    children: node.children ? node.children.map(deepCloneNode) : [],
  };
};

const addFile = (
  node: IFile,
  payload: IFile | undefined,
  active: boolean
): IFile => {
  const toggleStatusRecursive = (currentNode: IFile): IFile => {
    // Clone the current node to avoid direct mutation
    const clonedNode = deepCloneNode(currentNode);

    if (clonedNode.id === payload?.id) {
      console.log(payload.id);

      //   clonedNode.children?.push(payload);

      if (clonedNode.isFolder && !clonedNode.isOpen) {
        clonedNode.isOpen = active;
      } else if (clonedNode.isFolder && clonedNode.isOpen) {
        clonedNode.isOpen = !clonedNode.isOpen;
      }
    } else {
      if (clonedNode.isFolder && !clonedNode.isOpen) {
        clonedNode.isOpen = false;
      }

      clonedNode.isActive = false;
    }

    if (clonedNode.children) {
      clonedNode.children = clonedNode.children.map(toggleStatusRecursive);
    }

    return clonedNode;
  };

  return toggleStatusRecursive(node);
};

export default addFile;
