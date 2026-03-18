import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MobileNavAdmin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const closeMenu = () => setIsOpen(false);

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
    <>
      <span
        onClick={() => setIsOpen(!isOpen)}
        className={`w-[30px] h-[19.5px] cursor-pointer flex flex-col justify-between items-end z-[60] lg:hidden ${
          isOpen ? "open" : ""
        }`}
      >
        <span className="w-full h-[3px] rounded bg-red-800 transition-all duration-300" />
        <span className="w-[80%] h-[3px] rounded bg-white transition-all duration-300" />
        <span className="w-[60%] h-[3px] rounded bg-white transition-all duration-300" />

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

      <div
        className={`fixed top-0 left-0 h-full w-56 bg-white shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="bg-red-200 flex-col flex p-6 h-full">
          <nav className="pt-30">
            <ul className="space-y-3">
                <li><Link onClick={closeMenu} to="/admin/products">Products</Link></li>
                <li><Link onClick={closeMenu} to="/admin/users">Users</Link></li>
                <li><Link onClick={closeMenu} to="/admin/orders">Orders</Link></li>
                <li><Link onClick={closeMenu} to="#">Order items</Link></li>
                <li><Link onClick={closeMenu} to="#/">Create an order</Link></li>
              </ul>
          </nav>
          <div className="mt-auto flex flex-col space-y-3">
            <span>User profile</span>
            <span className="mt-auto">Log Out</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileNavAdmin;
