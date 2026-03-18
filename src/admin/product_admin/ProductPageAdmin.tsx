import React, { useEffect, useState } from "react";
import apiClient from "../../api/axiosConfig";
import { Link } from "react-router-dom";
import ProductDetailAdmin from "./ProductDetailAdmin";

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
  const [productDetail, setProductDetail] = useState<Product | null>(null);

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

  const handleDelete = async (productId: number) => {
    try {
      const response = await apiClient.delete(`/products/${productId}`);

      if (response.status === 204) {
        setData((prev) => prev.filter((p) => p.productId !== productId));
      }
      alert("product deleted succssefully");
    } catch (error: any) {
      console.log("Error deleting product", error);

      // found out products tied to an order will not delete
      if (error.response) {
        alert("Product cannot be deleted (it may be linked to orders)");
      } else {
        alert("Server error. Try again later.");
      }
    }
  };

  return (
    <>
      <div className="rounded-xl shadow-md border flex flex-col">
        <div className="px-6 py-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Products</h2>
          <Link
            to="/admin/add-product"
            className="bg-red-800 text-white p-2 rounded border border-black"
          >
            Add Product
          </Link>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
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

            <tbody>
              {data.map((product) => (
                <tr
                  key={product.productId}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-4 py-3">{product.productId}</td>
                  <td className="px-4 py-3">
                    <span
                      onClick={() => setProductDetail(product)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {product.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">{product.brand}</td>
                  <td className="px-4 py-3">€{product.price}</td>
                  <td className="px-4 py-3">{product.sizeML}</td>
                  <td className="px-4 py-3">{product.quantity}</td>

                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/edit-product/${product.productId}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      onClick={() => handleDelete(product.productId)}
                      className="text-red-600 hover:underline cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {productDetail && (
        <ProductDetailAdmin
          product={productDetail}
          onClose={() => setProductDetail(null)}
        />
      )}
    </>
  );
};

export default ProductPageAdmin;
