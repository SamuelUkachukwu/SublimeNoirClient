import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "../pages/Home";
import Legal from "../pages/Legal";
import NoPage from "../pages/NoPage";
import Admin from "../admin/Admin";
// import ProductDetailAdmin from "../admin/ProductDetailAdmin";

const AppRoutes = () => {

  const location = useLocation();

  const hideNavbar = location.pathname.startsWith("/admin")  || location.pathname === "/profile";

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Admin  */}
        <Route path="/admin" element={<Admin />} />
        <Route path="/admin/:activeMenuItem" element={<Admin/>} />
        <Route path="/admin/:activeMenuItem/:id?" element={<Admin />} />
        {/* <Route path="/admin/products/:id" element={<ProductDetailAdmin />} /> */}

        {/* legal Routes */}
        <Route path="/legal/:docType" element={<Legal />} />

        {/* 404 Routes */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
