import { IFile } from "../interfaces";
import { v4 as uuidv4 } from "uuid";
import { Theme } from "@monaco-editor/react";

export const fileTree: IFile = {
  id: uuidv4(),
  fileName: "VS Code Clone",
  isFolder: true,
  isOpen: true,
  isActive: true,

  children: [
    {
      id: uuidv4(),
      fileName: "node_modules",
      isFolder: true,
      isOpen: false,
      isActive: false,
      children: [
        {
          id: uuidv4(),
          fileName: "react.js",
          isActive: false,
          isFolder: false,
          isOpen: false,
        },
      ],
    },
    {
      id: uuidv4(),
      fileName: "public",
      isFolder: true,
      isOpen: false,
      isActive: false,
      children: [
        {
          id: uuidv4(),
          fileName: "assets",
          isFolder: true,
          isOpen: false,
          isActive: false,
        },
      ],
    },
    {
      id: uuidv4(),
      fileName: "app",
      isActive: false,
      isFolder: true,
      isOpen: false,
      children: [
        {
          id: uuidv4(),
          fileName: "App.tsx",
          isActive: false,
          isFolder: false,
          isOpen: false,
          content: `import FolderComp from "./components/RecursiveFileComp";
          import OpenedFileBar from "./components/OpenedFileBar";
          import { useAppSelector } from "./toolkit/hooks";
          import ResizeablePanel from "./components/ResizeablePanel";
          import WelocmeTap from "./components/WelocmeTap";
          
          
          function App() {
            const { fileTree, openedFiles } = useAppSelector((state) => state.fileTree);
          
            return (
              <div className=" ">
                <div className=" flex ">
                  <ResizeablePanel
                    showLeftPanel
                    leftPanel={<FolderComp fileTree={fileTree} />}
                    rightPanel={openedFiles.length ? <OpenedFileBar /> : <WelocmeTap />}
                  />
                </div>
              </div>
            );
          }
          
          export default App;
          
          `,
        },
        {
          id: uuidv4(),
          fileName: "main.tsx",
          isActive: false,
          isFolder: false,
          isOpen: false,
          content: `import React from "react";
          import ReactDOM from "react-dom/client";
          import App from "./App.tsx";
          import "./index.css";
          import { Provider } from "react-redux";
          import { store } from "./toolkit/index.ts";
          
          ReactDOM.createRoot(document.getElementById("root")!).render(
            <React.StrictMode>
              <Provider store={store}>
                <App />
              </Provider>
            </React.StrictMode>
          );
          `,
        },
      ],
    },
    {
      id: uuidv4(),
      fileName: "src",
      isFolder: true,
      isOpen: false,
      isActive: false,
      children: [
        {
          id: uuidv4(),
          fileName: "Components",
          isFolder: true,
          isOpen: false,
          isActive: false,

          children: [
            {
              id: uuidv4(),
              fileName: "UI",
              isFolder: true,
              isOpen: false,
              isActive: false,
              children: [
                {
                  id: uuidv4(),
                  fileName: "Menu.tsx",
                  isFolder: false,
                  isOpen: false,
                  isActive: false,
                  content: `import { ReactNode, useEffect, useRef } from "react";

                  type TProps = {
                    closeMenu: (val: boolean) => void;
                    children: ReactNode;
                    position: {
                      x: number;
                      y: number;
                    };
                  };
                  
                  const Menu = ({ position: { x, y }, closeMenu, children }: TProps) => {
                    const menuRef = useRef<HTMLDivElement>(null);
                  
                    useEffect(() => {
                      const clickOutSide = (e: MouseEvent) => {
                        if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                          closeMenu(false);
                        }
                      };
                  
                      window.addEventListener("click", clickOutSide);
                  
                      return () => {
                        window.removeEventListener("click", clickOutSide);
                      };
                    }, [closeMenu]);
                  
                    return (
                      <div
                        ref={menuRef}
                        style={{ position: "absolute", top: y, left: x }}
                        className="bg-gray-600 text-white  font-extralight text-sm  px-6 py-1 p-1  w-1/5 rounded-md "
                      >
                        {children}
                      </div>
                    );
                  };
                  
                  export default Menu;
                  `,
                },
              ],
            },

            {
              id: uuidv4(),
              fileName: "WelcomeTap.tsx",
              isFolder: false,
              isOpen: false,
              isActive: false,
              content: `const WelocmeTap = () => {
                return (
                  <div className=" h-screen flex items-center justify-center">
                    <div className="">
                      <h2 className=" text-center font-semibold text-4xl mb-9 mr-6">
                        Visual Studio Code
                      </h2>
                      <img
                        className=" w-64"
                        src="src/assets/icons/vscode.svg"
                        alt="Welcome_Tap"
                      />
                    </div>
                  </div>
                );
              };
              
              export default WelocmeTap;
              `,
            },
            {
              id: uuidv4(),
              fileName: "ResizealblePanel.tsx",
              isFolder: false,
              isOpen: false,
              isActive: false,
              content: `import React from "react";
              import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
              
              type TType = {
                defaultLayout?: number[] | undefined;
                leftPanel: React.ReactNode;
                rightPanel: React.ReactNode;
                showLeftPanel: boolean;
              };
              
              const ResizeablePanel = ({
                leftPanel,
                rightPanel,
                showLeftPanel,
                defaultLayout = [33, 67],
              }: TType) => {
                const onLayout = (sizes: number[]) => {
                  document.cookie = 'react-resizable-panels:layout={JSON.stringify(sizes)}'
                };
                return (
                  <PanelGroup
                    direction="horizontal"
                    onLayout={onLayout}
                    autoSaveId="condition"
                  >
                    {showLeftPanel && (
                      <>
                        <Panel collapsible={true} minSize={17}>
                          {leftPanel}
                        </Panel>
                        <PanelResizeHandle className="border-r-2 h-screen bg-slate-400" />
                      </>
                    )}
              
                    <Panel defaultSize={defaultLayout[1]}>{rightPanel}</Panel>
                  </PanelGroup>
                );
              };
              
              export default ResizeablePanel;
              `,
            },
            {
              id: uuidv4(),
              fileName: "FileSyntaxHighlight.tsx",
              isActive: false,
              isFolder: false,
              isOpen: false,
              content: `import SyntaxHighlighter from "react-syntax-highlighter";
              import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";
              
              const FileSyntaxHighlight = ({ content }: { content: string }) => {
                return (
                  <SyntaxHighlighter
                    customStyle={{
                      backgroundColor: "transparent",
                      width: "100%",
                      maxHeight: "100vh",
                      overflowX: "auto",
                      fontSize: "1.2rem",
                    }}
                    showLineNumbers
                    language="javascript"
                    style={hybrid}
                  >
                    {content}
                  </SyntaxHighlighter>
                );
              };
              
              export default FileSyntaxHighlight;
              `,
            },
            {
              id: uuidv4(),
              fileName: "OpenedFileBar.tsx",
              isActive: false,
              isFolder: false,
              isOpen: false,
              content: `import { useState } from "react";
              import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
              import { filterOpenedFiles } from "../utils/filterOpenedFiles";
              import FileSyntaxHighlight from "./FileSyntaxHighlight";
              import OpenedFileBarTap from "./OpenedFileBarTap";
              import Menu from "./UI/Menu";
              import {
                removeFile,
                setActiveFile,
                setContentAction,
              } from "../toolkit/reducers/fileTreeSlice";
              
              const OpenedFileBar = () => {
                const [showMenu, setShowMenu] = useState(false);
                const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
              
                const { openedFiles, fileTree, clickedFile, removeFileTap } = useAppSelector(
                  (state) => state.fileTree
                );
              
                const contextMuneHandler = (
                  e: React.MouseEvent<HTMLUListElement, MouseEvent>
                ) => {
                  e.preventDefault();
                  setShowMenu(true);
                  setMenuPosition({ x: e.clientX, y: e.clientY });
                };
                const dispatch = useAppDispatch();
              
                const filterOpenedFile = filterOpenedFiles(openedFiles, fileTree);
              
                const closeOneFile = () => {
                  setShowMenu(false);
                  const filter = openedFiles.filter((file) => file.id !== removeFileTap);
                  const lastTap = filter[filter.length - 1];
                  const fileLastTap = openedFiles.find((file) => file?.id === lastTap?.id);
              
                  dispatch(removeFile(filter));
                  dispatch(
                    setContentAction({
                      fileContent: lastTap?.content,
                      fileName: lastTap?.fileName,
                    })
                  );
                  dispatch(setActiveFile(fileLastTap));
                };
                const closeAllFiles = () => {
                  setShowMenu(false);
                  dispatch(removeFile([]));
                };
                return (
                  <div>
                    <ul onContextMenu={contextMuneHandler} className=" flex  items-center ">
                      {filterOpenedFile.map((el) => (
                        <OpenedFileBarTap key={el.id} fileTree={el} />
                      ))}
                    </ul>
                    {clickedFile.fileContent && (
                      <FileSyntaxHighlight content={clickedFile.fileContent} />
                    )}
                    {showMenu && (
                      <Menu closeMenu={setShowMenu} position={menuPosition}>
                        <ul>
                          <li
                            onClick={closeOneFile}
                            className=" hover:bg-blue-500 w-full  cursor-pointer p-1 mb-1 rounded-md duration-200 hover:scale-105"
                          >
                            Close
                          </li>
                          <li
                            onClick={closeAllFiles}
                            className="hover:bg-blue-500 w-full p-1  cursor-pointer rounded-md duration-200 hover:scale-105"
                          >
                            Close All
                          </li>
                        </ul>
                      </Menu>
                    )}
                  </div>
                );
              };
              
              export default OpenedFileBar;
              
              `,
            },
            {
              id: uuidv4(),
              fileName: "OpenedFileBarTap.tsx",
              isActive: false,
              isFolder: false,
              isOpen: false,
              content: `import React from "react";
              import FolderStyles from "../assets/SVG/IconsGenerate";
              import { IFile } from "../interfaces";
              import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
              import {
                removeFile,
                removeFileTap,
                setActiveFile,
                setContentAction,
                setOpenedFiles,
              } from "../toolkit/reducers/fileTreeSlice";
              import { changeActiveFile } from "../utils/changeActiveFile";
              
              const OpenedFileBarTap = ({ fileTree }: { fileTree: IFile }) => {
                const dispatch = useAppDispatch();
                const { fileName, id, isActive, content } = fileTree;
              
                const { openedFiles } = useAppSelector((state) => state.fileTree);
              
                const openFileHandler = () => {
                  dispatch(setContentAction({ fileContent: content, fileName }));
                  if (!isActive) {
                    dispatch(setActiveFile(fileTree));
                  }
                  const exists = openedFiles.find((file) => file.id === id);
              
                  if (!exists) {
                    const updatedFileTree = changeActiveFile(fileTree, id, true);
                    dispatch(setOpenedFiles({ fileTree: updatedFileTree, isActive: true }));
                  }
                };
              
                const onRemoveHandler = (
                  e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                ) => {
                  e.stopPropagation();
              
                  const filter = openedFiles.filter((file) => file.id !== fileTree?.id);
                  const lastTap = filter[filter.length - 1];
                  const fileLastTap = openedFiles.find((file) => file?.id === lastTap?.id);
              
                  dispatch(removeFile(filter));
                  dispatch(
                    setContentAction({
                      fileContent: lastTap?.content,
                      fileName: lastTap?.fileName,
                    })
                  );
                  dispatch(setActiveFile(fileLastTap));
                };
              
                return (
                  <li
                    onContextMenu={() => {
                      dispatch(removeFileTap(fileTree.id));
                    }}
                    onClick={openFileHandler}
                    key={id}
                    className={' duration-300 flex items-center {
                      isActive
                        ? " border-t-4  border-cyan-600 "
                        : "hover:bg-gray-500 border-t-4  border-t-transparent"
                    }  justify-center space-x-2 p-2 cursor-pointer duration-300  hover:opacity-90'}
                  >
                    <FolderStyles name={fileName} />
                    <h2>{fileName}</h2>
                    <button
                      title="Close-File"
                      onClick={onRemoveHandler}
                      className="text-white  hover:bg-gray-700 rounded-md  "
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="17"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                      </svg>
                    </button>
                  </li>
                );
              };
              
              export default OpenedFileBarTap;
              
              `,
            },
            {
              id: uuidv4(),
              fileName: "RecursiveFileComp.tsx",
              isActive: false,
              isFolder: false,
              isOpen: false,
              content: `/* eslint-disable react-refresh/only-export-components */
              import { memo } from "react";
              import ArrowIcon from "../assets/SVG/ArrowIcon.tsx";
              import FolderStyles from "../assets/SVG/IconsGenerate.tsx";
              import { IFile } from "../interfaces/index.ts";
              import ArrowButtom from "../assets/SVG/ArrowButtom.tsx";
              import { useAppDispatch, useAppSelector } from "../toolkit/hooks.ts";
              import {
                setActiveFile,
                setContentAction,
                setOpenedFiles,
              } from "../toolkit/reducers/fileTreeSlice.ts";
              import { changeActiveFile } from "../utils/changeActiveFile.ts";
              
              type TProps = {
                fileTree: IFile;
              };
              
              const RecursiveFileComp = ({ fileTree }: TProps) => {
                const dispatch = useAppDispatch();
                const { openedFiles } = useAppSelector((state) => state.fileTree);
                const { fileName, isOpen, isFolder, children, isActive, id, content } =
                  fileTree;
                // Handlers
                const openFileHandler = () => {
                  if (!isActive) {
                    dispatch(setActiveFile(fileTree));
                  } else if (isFolder && isActive) {
                    dispatch(setActiveFile(fileTree));
                  }
                  if (!isFolder) {
                    dispatch(setContentAction({ fileName, fileContent: content }));
                  }
              
                  if (!isFolder && !isActive) {
                    const updatedFileTree = changeActiveFile(fileTree, id, true);
              
                    dispatch(
                      setOpenedFiles({
                        fileTree: updatedFileTree,
                        isActive: true,
                      })
                    );
                  }
              
                  const exists = openedFiles.find((file) => file.id === id);
              
                  if (!exists && !isFolder) {
                    const updatedFileTree = changeActiveFile(fileTree, id, true);
                    dispatch(
                      setOpenedFiles({
                        fileTree: updatedFileTree,
                        isActive: isFolder ? false : true,
                      })
                    );
                  }
                };
              
                return (
                  <div className="mb-1 ml-3 cursor-pointer">
                    <span
                      onClick={openFileHandler}
                      className={'flex items-center {
                        isActive ? "bg-gray-500" : "hover:bg-gray-500"
                      } rounded-md hover:scale-105 duration-300 p-[1px] hover:opacity-95 space-x-1 cursor-pointer'}
                    >
                      <div>
                        {isFolder ? (
                          <div className="flex items-center space-x-1">
                            {isOpen ? <ArrowButtom /> : <ArrowIcon />}
                            <FolderStyles
                              isFolder={isFolder}
                              isOpen={isOpen}
                              name={fileName}
                            />
                          </div>
                        ) : (
                          <div className="ml-3 items-center flex">
                            <FolderStyles
                              isFolder={isFolder}
                              isOpen={isOpen}
                              name={fileName}
                            />
                          </div>
                        )}
                      </div>
                      <p>{fileName}</p>
                    </span>
                    {isOpen &&
                      children?.map((el) => <RecursiveFileComp key={el.id} fileTree={el} />)}
                  </div>
                );
              };
              
              export default memo(RecursiveFileComp);
              
              `,
            },
          ],
        },
        {
          id: uuidv4(),
          fileName: "interface",
          isFolder: true,
          isOpen: false,
          isActive: false,
          children: [
            {
              id: uuidv4(),
              fileName: "index.tsx",
              isFolder: false,
              isOpen: false,
              isActive: false,
              content: `export interface IFile {
                id: string;
                fileName: string;
                isFolder: boolean;
                children?: IFile[];
                isActive?: boolean;
                isOpen?: boolean;
                content?:string;
              }
              `,
            },
          ],
        },
        {
          id: uuidv4(),
          fileName: "hook",
          isFolder: true,
          isOpen: false,
          isActive: false,
          children: [
            {
              id: uuidv4(),
              fileName: "index.tsx",
              isFolder: false,
              isOpen: false,
              isActive: false,
              content: `import { useDispatch, useSelector } from "react-redux";
            import type { RootState, AppDispatch } from "./";
            
            export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
            export const useAppSelector = useSelector.withTypes<RootState>();
            `,
            },
          ],
        },
        {
          id: uuidv4(),
          fileName: "redux",
          isFolder: true,
          isOpen: false,
          isActive: false,
          children: [
            {
              id: uuidv4(),
              fileName: "redux-reducer",
              isFolder: true,
              isOpen: false,
              isActive: false,
              children: [
                {
                  id: uuidv4(),
                  fileName: "fileTreeSlice.tsx",
                  isFolder: false,
                  isOpen: false,
                  isActive: false,
                  content: `import { createSlice, PayloadAction } from "@reduxjs/toolkit";
                  import { IFile } from "../../interfaces";
                  import { fileTree } from "../../data";
                  import { changeActiveFile } from "../../utils/changeActiveFile"; // Corrected function name
                  
                  interface IClickedFile {
                    fileName: string;
                    fileContent: string | undefined;
                  }
                  
                  type TState = {
                    fileTree: IFile;
                    openedFiles: IFile[];
                    clickedFile: IClickedFile;
                    removeFileTap: string | null;
                  };
                  
                  const initialState: TState = {
                    fileTree: { ...fileTree },
                    openedFiles: [],
                    clickedFile: {
                      fileName: "",
                      fileContent: "",
                    },
                    removeFileTap: null,
                  };
                  
                  const fileTreeSlice = createSlice({
                    name: "fileTree",
                    initialState,
                    reducers: {
                      setActiveFile: (
                        state,
                        action: PayloadAction<{ id: string } | undefined>
                      ) => {
                        state.fileTree = changeActiveFile(
                          state.fileTree,
                          action?.payload?.id,
                          true
                        );
                      },
                  
                      setOpenedFiles: (
                        state,
                        action: PayloadAction<{ fileTree: IFile; isActive: boolean | undefined }>
                      ) => {
                        const fileExists = state.openedFiles.some(
                          (file) => file.id === action.payload.fileTree.id
                        );
                  
                        if (!fileExists) {
                          state.openedFiles.push({
                            ...action.payload.fileTree,
                            isActive: action.payload.isActive,
                          });
                        }
                      },
                      setContentAction: (state, actions: PayloadAction<IClickedFile>) => {
                        state.clickedFile = actions.payload;
                      },
                      removeFile: (state, action: PayloadAction<IFile[]>) => {
                        state.openedFiles = action.payload;
                      },
                      removeFileTap: (state, action: PayloadAction<string | null>) => {
                        state.removeFileTap = action.payload;
                      },
                    },
                  });
                  
                  export const { setOpenedFiles, removeFile, setActiveFile, setContentAction ,removeFileTap } =
                    fileTreeSlice.actions;
                  export default fileTreeSlice.reducer;
                  
                  `,
                },
              ],
            },

            {
              id: uuidv4(),
              fileName: "redux-store",
              isFolder: false,
              isOpen: false,
              isActive: false,
              content: `import { configureStore } from "@reduxjs/toolkit";
              import fileTree from "./reducers/fileTreeSlice";
              
              export const store = configureStore({
                reducer: {
                  fileTree,
                },
              });
              
              export type RootState = ReturnType<typeof store.getState>;
              export type AppDispatch = typeof store.dispatch;
              `,
            },
          ],
        },
        {
          id: uuidv4(),
          fileName: "utils",
          isFolder: true,
          isOpen: false,
          isActive: false,
          children: [
            {
              id: uuidv4(),
              fileName: "changeActionFile.ts",
              isFolder: false,
              isOpen: false,
              isActive: false,
              content: `import { IFile } from "../interfaces";

            // Helper function to deep clone a node
            const deepCloneNode = (node: IFile): IFile => {
              return {
                ...node,
                children: node.children ? node.children.map(deepCloneNode) : [],
              };
            };
            
            export const changeActiveFile = (
              node: IFile,
              id: string,
              active: boolean
            ): IFile => {
              const toggleStatusRecursive = (currentNode: IFile): IFile => {
                // Clone the current node to avoid direct mutation
                const clonedNode = deepCloneNode(currentNode);
            
                if (clonedNode.id === id) {
                  clonedNode.isActive = active;
            
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
            `,
            },
            {
              id: uuidv4(),
              fileName: "filterOpenedFiles.ts",
              isActive: false,
              isFolder: false,
              isOpen: false,
              content: `import { IFile } from "../interfaces";

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
            `,
            },
            {
              id: uuidv4(),
              fileName: "openFile.ts",
              isActive: false,
              isFolder: false,
              isOpen: false,
              content: `import { IFile } from "../interfaces";

            export const OpenedFiles = (openedFiles: IFile[], payload: IFile) => {
              const exitis = openedFiles.find((file) => file.fileName === payload.fileName);
              if (exitis) {
                return [...openedFiles];
              }
              return [...openedFiles, payload];
            };
            `,
            },
          ],
        },
      ],
    },
    {
      id: uuidv4(),
      fileName: "data",
      isFolder: true,
      isActive: false,
      isOpen: false,
      children: [
        {
          id: uuidv4(),
          fileName: "index.tsx",
          isActive: false,
          isFolder: false,
          isOpen: false,
          content: `//NOT, Active Now`,
        },
      ],
    },
    {
      id: uuidv4(),
      fileName: "css",
      isActive: false,
      isFolder: true,
      isOpen: false,
      children: [
        {
          id: uuidv4(),
          fileName: "style.css",
          isActive: true,
          isFolder: false,
          isOpen: false,
          content: `@tailwind base;
          @tailwind components;
          @tailwind utilities;
          
          :root {
            font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
            line-height: 1.5;
            font-weight: 400;
          
            color-scheme: light dark;
            color: rgba(255, 255, 255, 0.87);
            background-color: #242629de;
          
            text-rendering: optimizeLegibility;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          `,
        },
      ],
    },
    {
      id: uuidv4(),
      fileName: "packages",
      isActive: false,
      isFolder: true,
      isOpen: false,
      children: [
        {
          id: uuidv4(),
          fileName: "package.json",
          isActive: false,
          isFolder: false,
          isOpen: false,
          content: `{
            "name": "redux-toolkit",
            "private": true,
            "version": "0.0.0",
            "type": "module",
            "scripts": {
              "dev": "vite",
              "build": "tsc && vite build",
              "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
              "preview": "vite preview"
            },
            "dependencies": {
              "@reduxjs/toolkit": "^2.2.5",
              "react": "^18.2.0",
              "react-dom": "^18.2.0",
              "react-redux": "^9.1.2",
              "react-resizable-panels": "^2.0.19",
              "react-syntax-highlighter": "^15.5.0",
              "uuid": "^9.0.1"
            },
            "devDependencies": {
              "@types/react": "^18.2.66",
              "@types/react-dom": "^18.2.22",
              "@types/react-syntax-highlighter": "^15.5.13",
              "@types/uuid": "^9.0.8",
              "@typescript-eslint/eslint-plugin": "^7.2.0",
              "@typescript-eslint/parser": "^7.2.0",
              "@vitejs/plugin-react-swc": "^3.5.0",
              "autoprefixer": "^10.4.19",
              "eslint": "^8.57.0",
              "eslint-plugin-react-hooks": "^4.6.0",
              "eslint-plugin-react-refresh": "^0.4.6",
              "postcss": "^8.4.38",
              "tailwindcss": "^3.4.3",
              "typescript": "^5.2.2",
              "vite": "^5.2.0"
            }
          }
          `,
        },
      ],
    },
    {
      id: uuidv4(),
      fileName: "index.html",
      isActive: false,
      isFolder: false,
      isOpen: false,
      content: `<!doctype html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <link rel="icon" type="image/svg+xml" href="/vite.svg" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Vite + React + TS</title>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" src="/src/main.tsx"></script>
        </body>
      </html>
      `,
    },
  ],
};

export const themesSyntax: Theme[] = ["light", "vs-dark"];
