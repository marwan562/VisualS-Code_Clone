import SyntaxHighlighter from "react-syntax-highlighter";
// import * as theme from "react-syntax-highlighter/dist/esm/styles/hljs";
// import { useAppSelector } from "../toolkit/hooks";

const FileSyntaxHighlight = ({ content }: { content: string }) => {
  // const { selectTheme } = useAppSelector((state) => state.fileTree);

  return (
    <SyntaxHighlighter
      customStyle={{
        backgroundColor: "transparent",
        width: "100%",
        maxHeight: "100vh",
        fontSize: "1.2rem",
      }}
      language="jsx"
    >
      {content}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighlight;
