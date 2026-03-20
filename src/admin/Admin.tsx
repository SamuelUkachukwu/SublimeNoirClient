import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import MobileNavAdmin from "./MobileNavAdmin";
import ProductPageAdmin from "./product_admin/ProductPageAdmin";
import UserPageAdmin from "./user_admin/UserPageAdmin";
import OrderPageAdmin from "./OrderPageAdmin";
import Search from "./Search";
import EditProduct from "./product_admin/EditProduct";
import AddProduct from "./product_admin/AddProduct";
import EditUser from "./user_admin/EditUser";
import AddUser from "./user_admin/AddUser";
import CreatOrderAdmin from "./CreatOrderAdmin";

const Admin = () => {
  const { activeMenuItem, id } = useParams<{
    activeMenuItem?: string;
    id?: string;
  }>();

  // render components based on the selected tab
  const renderActiveComponent = () => {
    switch (activeMenuItem) {
      case "products":
        return <ProductPageAdmin />;
      case "users":
        return <UserPageAdmin />;
      case "orders":
        return <OrderPageAdmin />;
      case "search":
        return <Search />;
      case "edit-product":
        return <EditProduct productId={id ? Number(id) : 0} />;
      case "edit-user":
        return <EditUser id={id ? Number(id) : 0} />;
      case "add-product":
        return <AddProduct />;
      case "add-user":
        return <AddUser />;
      case "create-order":
        return <CreatOrderAdmin />;
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

          <MobileNavAdmin />
        </nav>

        <div className="flex flex-1 overflow-hidden">
          <aside className="w-64 bg-red-200 flex-col p-6 hidden lg:flex">
            <nav className="pt-16">
              <ul className="space-y-3">
                <li>
                  <Link to="/admin/products">Products</Link>
                </li>
                <li>
                  <Link to="/admin/users">Users</Link>
                </li>
                <li>
                  <Link to="/admin/orders">Orders</Link>
                </li>
                {/* <li>
                  <Link to="#">Order items</Link>
                </li> */}
                <li>
                  <Link to="/admin/create-order">Create an order</Link>
                </li>
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

          {/* <aside className="w-100 bg-green-400 hidden lg:flex"></aside> */}
        </div>
      </div>
    </>
  );
};

export default Admin;
