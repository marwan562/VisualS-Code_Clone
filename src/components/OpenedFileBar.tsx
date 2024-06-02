import React, { useState } from "react";
import { executeCode } from "../api/api";

type TProps = {
  language: 'javascript';
  editorRef: React.MutableRefObject<any>;
};

const Output: React.FC<TProps> = ({ editorRef, language }) => {
  const [output, setOutput] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode);
      setOutput(result.output.split("\n"));
      setIsError(!!result.stderr);
    } catch (error) {
      console.error(error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p>Output</p>
      <button onClick={runCode} disabled={isLoading}>
        {isLoading ? "Running..." : "Run Code"}
      </button>
      <div style={{ color: isError ? "red" : "" }}>
        {output ? (
          output.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>Click "Run Code" to see the output here</p>
        )}
      </div>
    </div>
  );
};

export default Output;
