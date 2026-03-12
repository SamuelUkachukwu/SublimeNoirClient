import React from "react";
import Navbar from "../components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Legal from "../pages/Legal";
import NoPage from "../pages/NoPage";

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        {/* legal Routes */}
        <Route path="/legal/:docType" element={<Legal />} />

        {/* 404 Routes */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
