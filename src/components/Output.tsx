import { useState } from "react";
import { executeCode } from "../api/api";
import { TCode_Snippets } from "../constans/constans";

type TProps = {
  language: TCode_Snippets;
  editorRef: any;
};

const Output = ({ editorRef, language }: TProps) => {
  const [output, setOutput] = useState(null);
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
      <p>Output</p>
      <button disabled={isLoading} onClick={runCode}>
        Run Code
      </button>
      <div color={isError ? "red.400" : ""}>
        {output
          ? output?.map((line, i) => <p key={i}>{line}</p>)
          : 'Click "Run Code" to see the output here'}
      </div>
    </div>
  );
};
export default Output;
