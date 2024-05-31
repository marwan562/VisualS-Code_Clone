import { ReactNode, useEffect, useRef } from "react";

type TProps = {
  closeMenu: (val: boolean) => void;
  children: ReactNode;
  position: {
    x: number;
    y: number;
  };
};

const Menu = ({ position: { x, y }, closeMenu, children }: TProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const clickOutSide = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        closeMenu(false);
      }
    };

    window.addEventListener("click", clickOutSide);

    return () => {
      window.removeEventListener("click", clickOutSide);
    };
  }, [closeMenu]);

  return (
    <div
      ref={menuRef}
      style={{ position: "absolute", top: y, left: x }}
      className="bg-gray-600 text-white  font-extralight text-sm  px-6 py-1 p-1  w-1/5 rounded-md "
    >
      {children}
    </div>
  );
};

export default Menu;
