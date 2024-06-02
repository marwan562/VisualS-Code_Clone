import axios from "axios";
import { LANGUAGE_VERSIONS, TCode_Snippets } from "../constans/constans";
const API = axios.create({
  baseURL: "https://emkc.org/api/v2/piston",
});

export const executeCode = async (
  language: TCode_Snippets,
  sourceCode: string
) => {
  const response = await API.post("/execute", {
    language: language,
    version: LANGUAGE_VERSIONS[language],
    files: [
      {
        content: sourceCode,
      },
    ],
  });
  return response.data;
};
