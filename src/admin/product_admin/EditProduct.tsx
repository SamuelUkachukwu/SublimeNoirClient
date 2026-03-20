import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Product {
  productId: number;
  name: string;
  brand: string;
  price: number;
  sizeML: number;
  quantity: number;
}

interface EditProductProps {
  productId: number;
}

const EditProduct: React.FC<EditProductProps> = ({ productId }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Product>({
    productId: 0,
    name: "",
    brand: "",
    price: 0,
    sizeML: 0,
    quantity: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      const res = await fetch(
        `http://localhost:8080/api/products/${productId}`,
      );
      if (res.ok) {
        const data = await res.json();
        setFormData({
          productId: data.productId,
          name: data.name,
          brand: data.brand,
          price: data.price,
          sizeML: data.sizeML,
          quantity: data.quantity,
        });
      }
    };

    fetchProduct();
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/api/products/${formData.productId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

      if (!response.ok) throw new Error("Failed to update product");

      const updatedProduct = await response.json();
      console.log("Updated product:", updatedProduct);
      // alert("Product updated successfully!");
      navigate("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Error updating product.");
    }
  };

  return (
    <div className="w-full h-full bg-red-300 flex flex-col items-center justify-center">
      <div className="mb-9">
        <h1 className="font-bold">Edit Product</h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md lg:w-[60%] bg-blue-200"
      >
        <input type="hidden" name="productId" value={formData.productId} />
        <div className="mb-6">
          <label
            htmlFor="productName"
            className="block text-sm font-medium mb-1"
          >
            Product Name
          </label>
          <input
            type="text"
            className="w-full border rounded border-black bg-white p-2"
            id="productName"
            name="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="productBrand"
            className="block text-sm font-medium mb-1"
          >
            Product Brand
          </label>
          <input
            type="text"
            className="w-full border rounded border-black bg-white p-2"
            id="productBrand"
            name="brand"
            value={formData.brand}
            onChange={(e) =>
              setFormData({ ...formData, brand: e.target.value })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium mb-1"
          >
            Product Price
          </label>
          <input
            type="text"
            className="w-full border rounded border-black bg-white p-2"
            id="productPrice"
            name="price"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="productSize"
            className="block text-sm font-medium mb-1"
          >
            Product Size
          </label>
          <input
            type="text"
            className="w-full border rounded border-black bg-white p-2"
            id="productSize"
            name="sizeML"
            value={formData.sizeML}
            onChange={(e) =>
              setFormData({ ...formData, sizeML: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="productQuantity"
            className="block text-sm font-medium mb-1"
          >
            Product Quantity
          </label>
          <input
            type="text"
            className="w-full border rounded border-black bg-white p-2"
            id="productQuantity"
            name="quantity"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({ ...formData, quantity: Number(e.target.value) })
            }
          />
        </div>
        <div className="mb-6">
          <button
            type="submit"
            className="rounded font-bold p-4 bg-green-900 cursor-pointer text-white hover:bg-green-500 hover:text-black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
