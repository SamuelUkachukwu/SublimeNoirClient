import React, { useEffect, useState } from 'react'
import apiClient from '../api/axiosConfig';

interface Product {
  productId: number;
  name: string;
  brand: string;
  price: number;
  sizeML: number;
  quantity: number;
}

const ProductPageAdmin = () => {
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
    <div className="bg-white rounded-xl shadow-md border flex flex-col">
      
      {/* Table Title */}
      <div className="px-6 py-4 border-b flex justify-between items-center">
        <h2 className="text-lg font-semibold">Products</h2>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full text-sm">
          
          {/* Header */}
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Brand</th>
              <th className="px-4 py-3 text-left">Price</th>
              <th className="px-4 py-3 text-left">Size</th>
              <th className="px-4 py-3 text-left">Stock</th>
              <th className="px-4 py-3 text-left">Edit</th>
              <th className="px-4 py-3 text-left">Delete</th>
            </tr>
          </thead>

          {/* Rows */}
          <tbody>
            {data.map((product) => (
              <tr key={product.productId} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{product.productId}</td>
                <td className="px-4 py-3">{product.name}</td>
                <td className="px-4 py-3">{product.brand}</td>
                <td className="px-4 py-3">€{product.price}</td>
                <td className="px-4 py-3">{product.sizeML}</td>
                <td className="px-4 py-3">{product.quantity}</td>

                <td className="px-4 py-3">
                  <button className="text-blue-600 hover:underline">
                    Edit
                  </button>
                </td>

                <td className="px-4 py-3">
                  <button className="text-red-600 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default ProductPageAdmin