import { ReactNode } from "react";
import { useAppSelector } from "../toolkit/hooks";

const ChangeTheme = ({children}:{children:ReactNode}) => {
    const { selectTheme } = useAppSelector((state) => state.fileTree);
  return (
    <div
    className={` ${
      selectTheme === "vs-dark"
        ? " bg-black text-white"
        : " bg-white text-black"
    }  font-mono h-[100vh]`}
  >{children}
  </div>
  )
}

export default ChangeTheme