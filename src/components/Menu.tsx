import React, { useEffect } from "react";

type MenuProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const Menu: React.FC<MenuProps> = ({ isOpen, setIsOpen }) => {
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 767 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, setIsOpen]);

  useEffect(() => {
    const stopScrolling = (e: Event) => e.preventDefault();

    if (isOpen) {
      document.documentElement.addEventListener("touchmove", stopScrolling, {
        passive: false,
      });
      document.documentElement.addEventListener("wheel", stopScrolling, {
        passive: false,
      });
    } else {
      document.documentElement.removeEventListener("touchmove", stopScrolling);
      document.documentElement.removeEventListener("wheel", stopScrolling);
    }

    return () => {
      document.documentElement.removeEventListener("touchmove", stopScrolling);
      document.documentElement.removeEventListener("wheel", stopScrolling);
    };
  }, [isOpen]);

  return (
    <span
      className={`w-[30px] h-[19.5px] cursor-pointer flex flex-col justify-between items-end  ${
        isOpen ? "open" : ""
      }`}
    >
      <span className="w-full h-[3px] rounded-[5px] bg-white transition-all duration-300 ease-in-out" />
      <span className="w-[80%] h-[3px] rounded-[5px] bg-white transition-all duration-300 ease-in-out" />
      <span className="w-[60%] h-[3px] rounded-[5px] bg-white transition-all duration-300 ease-in-out" />
      <style>{`
        .open > span:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
        }
        .open > span:nth-child(2) {
          opacity: 0;
        }
        .open > span:nth-child(3) {
          width: 100%;
          transform: translateY(-8px) rotate(-45deg);
        }
      `}</style>
    </span>
  );
};

export default Menu;
