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
        overflowX: "auto",
        fontSize: "1.2rem",
      }}
      showLineNumbers
      language="jsx"
      // style={theme[selectTheme]}
    >
      {content}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighlight;
