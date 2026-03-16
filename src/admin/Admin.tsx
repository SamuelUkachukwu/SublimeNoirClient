import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MobileNavAdmin from "./MobileNavAdmin";
import ProductPageAdmin from "./ProductPageAdmin";
import UserPageAdmin from "./UserPageAdmin";
import OrderPageAdmin from "./OrderPageAdmin";
import Search from "./Search";


const Admin = () => {
  
  const { activeMenuItem } = useParams();

    // render components based on the selected tab
    const renderActiveComponent = () => {
        switch (activeMenuItem) {
            case 'products':
                return <ProductPageAdmin />;
            case 'users':
                return <UserPageAdmin />;
            case 'orders':
                return <OrderPageAdmin />;
            case 'search':
                return <Search />;
            // case 'settings':
            //     return <CreatOrderAdmin />;
            default:
                return <ProductPageAdmin />;
        }
    };

  return (
    <>
      <div className="flex h-screen flex-col">
        <nav className="bg-blue-200 h-16 flex items-center px-8 py-4 justify-between">
          <Link to="/" className="text-black font-[kesiq] text-2xl lg:text-3xl">
            SublimeNoir
          </Link>
         
          <MobileNavAdmin/>
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 bg-red-200 flex-col p-6 hidden lg:flex">
            <nav className="pt-16">
              <ul className="space-y-3">
                <li><Link to="/admin/products">Products</Link></li>
                <li><Link to="/admin/users">Users</Link></li>
                <li><Link to="/admin/orders">Orders</Link></li>
                <li><Link to="#">Order items</Link></li>
                <li><Link to="#/">Create an order</Link></li>
              </ul>
            </nav>
            <div className="mt-auto flex flex-col space-y-3">
              <span>User profile</span>
              <span className="mt-auto">Log Out</span>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-10 bg-white">
            {renderActiveComponent()}
          </main>

          <aside className="w-100 bg-green-400 hidden lg:flex"></aside>
        </div>
      </div>
    </>
  );
};

export default Admin;
