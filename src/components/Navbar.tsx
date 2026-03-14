import React, { useState } from "react";
import MobileNav from "./MobileNav";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="w-full fixed z-1000">
        <nav className="flex justify-between items-center w-[98%] mx-auto mt-[10px] px-8 py-4 rounded-[10px] text-[#4b0023] font-medium bg-white/30 backdrop-blur-md">
          <Link to="/" className="text-black  font-[kesiq] text-2xl lg:text-3xl">
            SublimeNoir
          </Link>
          <ul className="gap-6 list-none m-0 p-0 hidden md:flex">
            <li><Link to="/product" className="text-[#4b0023]">Products</Link></li>
            <li><Link to="/about" className="text-[#4b0023]">About</Link></li>
            <li><Link to="/tips" className="text-[#4b0023]">Tips</Link></li>
            <li><Link to="/faq" className="text-[#4b0023]">FAQ</Link></li>
          </ul>
          <ul className="gap-6 list-none m-0 p-0 flex">
            <li className="hidden md:flex">
              <Link to="/login" className="font-medium">
                sign-up/login
              </Link>
            </li>
            <li className="hidden md:flex">
              <Link to="/admin" className="font-medium">
                <i className="fa-solid fa-users-gear"></i>
              </Link>
            </li>
            <li>
              <Link to="/login" className="font-medium">
                <i className="fa-solid fa-cart-arrow-down"></i><span className="badge text-bg-secondary"><small> 0</small></span>
              </Link>
            </li>
          </ul>

          {/* Hamburger */}
          <div
            className="cursor-pointer md:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <Menu isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </nav>
      </header>
      <MobileNav isOpen={isOpen} />
    </>
  );
};

export default Navbar;
