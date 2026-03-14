import React from "react";
import { Link } from "react-router-dom";

const NoPage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black relative">
        <div className="text-white text-center">
          <h1 className="text-5xl mb-10 font-bold font-[kesiq]">SublimeNoir</h1>

          <h1 className="text-3xl mb-10">404 PAGE NOT FOUND</h1>

          <Link
            to="/"
            className="inline-block no-underline border border-white px-6 py-3 rounded hover:bg-white hover:text-black transition"
          >
            Head Back to Home Page
          </Link>
        </div>
      </div>
    </>
  );
};

export default NoPage;
