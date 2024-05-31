export interface IFile {
  id: string;
  fileName: string;
  isFolder: boolean;
  children?: IFile[];
  isActive?: boolean;
  isOpen?: boolean;
  content?:string;
}
