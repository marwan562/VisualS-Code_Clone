import OpenedFileBar from "../components/OpenedFileBar";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
import ResizeablePanel from "../components/ResizeablePanel";
import WelocmeTap from "../components/WelocmeTap";
import { useRef, useState } from "react";
import { setSelectedTheme } from "../toolkit/reducers/fileTreeSlice";
import { themesSyntax } from "../data";
import LeftPanel from "./LeftPanel";
import Output from "./Output";

function CodeEditor() {
  const editorRef = useRef(null);
  const { openedFiles, selectTheme } = useAppSelector(
    (state) => state.fileTree
  );

  const [showMenuTheme, setShowMenuTheme] = useState(false);

  const dispatch = useAppDispatch();

  const renderSelectThemes = themesSyntax.map((them, inx) => (
    <option key={inx} value={them}>
      {them}
    </option>
  ));

  const onchangeThemeHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setShowMenuTheme(false);
    dispatch(setSelectedTheme(e.target.value));
  };

  return (
    <div className="  ">
      {showMenuTheme && (
        <select
          defaultValue={selectTheme}
          onChange={onchangeThemeHandler}
          title="Select-theme"
          className=" absolute left-36 top border-b-4 border-t-4 border-x-2 w-fit  top-6 z-50 bg-gray-600   px-8 py-1 p-1 rounded-md  "
        >
          {renderSelectThemes}
        </select>
      )}
      <div className=" flex ">
        <ResizeablePanel
          showLeftPanel
          leftPanel={
            <LeftPanel
              showMenuTheme={showMenuTheme}
              setShowMenuTheme={setShowMenuTheme}
            />
          }
          cnterPanel={
            openedFiles.length ? (
              <OpenedFileBar editorRef={editorRef} />
            ) : (
              <WelocmeTap />
            )
          }
          rightPanel={<Output language="javascript" editorRef={editorRef} />}
        />
      </div>
    </div>
  );
}

export default CodeEditor;
