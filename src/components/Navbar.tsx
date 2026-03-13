import React, { useState } from "react";
import MobileNav from "./MobileNav";

const Navbar = () => {
  // const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <header className="w-full fixed z-[1000]">
        <nav className="flex justify-between items-center w-[98%] mx-auto mt-[10px] px-8 py-4 rounded-[10px] text-[#4b0023] font-medium bg-white/30 backdrop-blur-md">
          <a
            href="index.html"
            className="text-black no-underline font-['Cinzel_Decorative']"
          >
            <span className="hidden uppercase">Lotusforever</span>
            <i className="fas fa-spa"></i>
          </a>

          <ul className="flex gap-6 list-none m-0 p-0">
            <li className="cursor-pointer hover:underline">
              <a
                href="#"
                className="text-[#4b0023] text-[1.2rem] font-medium no-underline"
              >
                Products
              </a>
            </li>
            <li className="cursor-pointer hover:underline">
              <a
                href="#"
                className="text-[#4b0023] text-[1.2rem] font-medium no-underline"
              >
                About
              </a>
            </li>
            <li className="cursor-pointer hover:underline">
              <a
                href="#"
                className="text-[#4b0023] text-[1.2rem] font-medium no-underline"
              >
                Tips
              </a>
            </li>
            <li className="cursor-pointer hover:underline">
              <a
                href="#"
                className="text-[#4b0023] text-[1.2rem] font-medium no-underline"
              >
                FAQ
              </a>
            </li>
          </ul>

          <a href="#" className="font-medium">
            sign-up/login
          </a>

          {/* hamburger */}
          <span
            id="menu"
            className="hidden w-[30px] h-[20px] flex-col justify-between"
          >
            <span className="block w-full h-[4px] rounded bg-[#4b0023] transition-all"></span>
            <span className="block w-[80%] h-[4px] rounded bg-[#4b0023] transition-all"></span>
            <span className="block w-[60%] h-[4px] rounded bg-[#4b0023] transition-all"></span>
          </span>
        </nav>
        <MobileNav />
      </header>
    </>
  );
};

export default Navbar;
