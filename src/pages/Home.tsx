// import axios from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";
import StreetLight from "../components/StreetLight";

interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  sizeML: number;
  quantity: number;
}

const Home = () => {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<Product[]>("/products");
        setData(response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      <section className="w-full h-screen overflow-hidden">
        <StreetLight />
        <div className="flex flex-col items-center justify-center w-full h-screen">
          <h1 className="text-white text-[205px] font-[kesiq] drop-shadow-lg">
            SublimeNoir
          </h1>
          <h2 className="text-white flex text-4xl text-center">
            Whispered allure, where elegance meets the exotic
          </h2>
        </div>
      </section>

      <section>
        {data.map((product) => (
          <div className="card" key={product.id}>
            <h2 className="text-3xl font-bold underline">{product.name}</h2>
            <p>
              <strong>Brand:</strong> {product.brand}
            </p>
            <p>
              <strong>Price:</strong> ${product.price}
            </p>
            <p>
              <strong>Size:</strong> {product.sizeML} ML
            </p>
            <p>
              <strong>Stock:</strong> {product.quantity}
            </p>
          </div>
        ))}
      </section>
    </>
  );
};

export default Home;
