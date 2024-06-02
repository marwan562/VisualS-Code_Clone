import React, { useState, useRef } from "react";
import { executeCode } from "../api/api";

type TProps = {
  language: 'javascript';
};

const Output: React.FC<TProps> = ({ language }) => {
  const editorRef = useRef<Monaco.editor.IStandaloneCodeEditor | null>(null);
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const runCode = async () => {
    const sourceCode = editorRef.current?.getValue();
    if (!sourceCode) return;

    setIsLoading(true);
    try {
      const result = await executeCode(language, sourceCode);
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
        {output.length ? (
          output.map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>Click "Run Code" to see the output here</p>
        )}
      </div>
    </div>
  );
};

export default Output;
