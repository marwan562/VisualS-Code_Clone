import Search from "../assets/SVG/Search";
import { useAppSelector } from "../toolkit/hooks";

const SearchRecursive = () => {
  const { fileTree } = useAppSelector((state) => state.fileTree);
  return (
    <div className="text-center border-b ">
      <div className="   ">
        <input
          className=" mb-2 w-1/2 placeholder:text-black  placeholder:text-center"
          placeholder={`${fileTree.fileName} `}
        />
      </div>
    </div>
  );
};

export default SearchRecursive;
