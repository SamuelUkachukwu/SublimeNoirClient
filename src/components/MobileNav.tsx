import React from "react";
import { Link } from "react-router-dom";

type MobileNavProps = {
  isOpen: boolean;
};

const MobileNav: React.FC<MobileNavProps> = ({ isOpen }) => {
  return (
    <div
      className={`fixed left-0 bottom-0 w-screen h-dvh bg-[#4b0023] transform transition-transform duration-500 ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ backgroundImage: "url('/images/mobile_nav.webp')" }}
    >
      <div className="w-[74%] h-full bg-[#4b0023]/70 flex items-center p-10">
        <ul className="list-none">
          <li className="my-4">
            <Link to="/admin" className="text-white text-2xl"><i className="fas fa-users-cog"></i></Link>
          </li><li className="my-4">
            <Link to="/login" className="text-white text-2xl">sign-up/login</Link>
          </li>
          <li className="my-4">
            <Link to="/" className="text-white text-2xl">Products</Link>
          </li>         
          <li className="my-4">
            <Link to="/" className="text-white text-2xl">About</Link>
          </li>
          <li className="my-4">
            <Link to="/" className="text-white text-2xl">Tips</Link>
          </li>
          <li className="my-4">
            <Link to="/" className="text-white text-2xl">FAQ</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileNav;