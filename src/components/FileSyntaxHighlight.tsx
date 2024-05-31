import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/esm/styles/hljs";

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
      style={darcula}
    >
      {content}
    </SyntaxHighlighter>
  );
};

export default FileSyntaxHighlight;
