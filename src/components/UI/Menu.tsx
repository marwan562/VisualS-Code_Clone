type TProps = {
  position: {
    x: number;
    y: number;
  };
};
const Menu = ({ position: { x, y } }: TProps) => {
  return (
    <ul
      style={{ position: "absolute", top: y, left: x }}
      className="bg-gray-600 text-black  px-6 py-1 p-1  w-1/5 rounded-md font-semibold"
    >
      <li className=" hover:bg-gray-400 w-full  cursor-pointer p-1 mb-1 rounded-md duration-200 hover:scale-105">
        Close
      </li>
      <li className="hover:bg-gray-400 w-full p-1  cursor-pointer rounded-md duration-200 hover:scale-105">
        Close All
      </li>
    </ul>
  );
};

export default Menu;
