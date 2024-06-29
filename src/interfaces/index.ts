import { IconType } from "react-icons/lib";

export interface IFile {
  id: string;
  fileName: string;
  isFolder: boolean;
  children?: IFile[];
  isActive?: boolean;
  isOpen?: boolean;
  content?: string;
}

export type TLeftBarRenderIcons = {
  name: "source" | "search"
  icon: IconType 
  isActive?: boolean;
};
