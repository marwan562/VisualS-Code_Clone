import { VscSourceControl, VscSearch } from "react-icons/vsc";
import { TLeftBarRenderIcons } from "../interfaces";
import { useAppDispatch, useAppSelector } from "../toolkit/hooks";
import { setIsActiveLeftBar } from "../toolkit/reducers/leftBarSlice";
import { IconType } from "react-icons/lib";

type TIactive = {
 name:"source" | 'search' 
 index: number 
 icon:IconType
  }

const leftBarRenderIcons: TLeftBarRenderIcons[] = [
  {
    name: "source",
    icon: VscSourceControl,
  },
  {
    name: "search",
    icon: VscSearch,
  },
];

const LeftBar = () => {
  const dispactch = useAppDispatch()
  const {  name: nameF} = useAppSelector((state) => state.leftBarSlice)


  


  const activeXclikckHANLDER = ({   name , icon}:TIactive) => {
    dispactch(setIsActiveLeftBar({icon  ,name}))
  }

  return (
    <div className="border-x-2">
      {leftBarRenderIcons.map(({ name, icon: IconComponent }, index) => {
        return (
          <div
            key={index}
            onClick={() => activeXclikckHANLDER({index , icon:IconComponent  , name})}
            className={`flex items-center cursor-pointer ${
              name === nameF
                ? "border-cyan-500 border-l-4"
                : "border-l-4 border-l-transparent"
            } space-x-2 p-2`}
          >
            <IconComponent size={30} />
          </div>
        );
      })}
    </div>
  );
};

export default LeftBar;
