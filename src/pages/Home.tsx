// import axios from "axios";
import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";

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
      <section>
        {data.map((product) => (
          <div className="card" key={product.id}>
            <h2>{product.name}</h2>
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
