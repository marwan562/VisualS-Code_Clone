import CodeEditor from "./components/CodeEditor";
import { useAppSelector } from "./toolkit/hooks";

const App = () => {
  const { selectTheme } = useAppSelector((state) => state.fileTree);
  return (
    <div
      className={` ${
        selectTheme === "vs-dark"
          ? " bg-black text-white"
          : " bg-white text-black"
      }  font-mono h-[100vh]`}
    >
      <CodeEditor />
    </div>
  );
};

export default App;
