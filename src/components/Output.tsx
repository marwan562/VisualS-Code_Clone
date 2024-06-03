import { useState } from "react";
import { executeCode } from "../api/api";
import { TCode_Snippets } from "../constans/constans";
import FileSyntaxHighlight from "./FileSyntaxHighlight";

type TProps = {
  language: TCode_Snippets;
  editorRef: any;
};

const Output = ({ editorRef, language }: TProps) => {
  const [output, setOutput] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between px-2 my-[9px]">
        <h2 className=" font-mono ">Output</h2>
        <div className=" space-x-2">
          <button
            className=" bg-gray-500 hover:bg-slate-400/20 duration-200 p-1 rounded-md"
            disabled={isLoading}
            onClick={runCode}
            title="Run-Code"
          >
            Run Code
          </button>
        </div>
      </div>
      <hr />

      {isLoading ? (
        <div className=" h-[87vh] overflow-y-auto justify-center flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z" />
          </svg>
          <span>Runnign...</span>
        </div>
      ) : (
        <div className=" text-sm w-fit " color={isError ? "red.400" : ""}>
          {output ? (
            output?.map((line) => <FileSyntaxHighlight content={line} />)
          ) : (
            <FileSyntaxHighlight content='Click "Run Code" to see the output here' />
          )}
        </div>
      )}
    </div>
  );
};
export default Output;
