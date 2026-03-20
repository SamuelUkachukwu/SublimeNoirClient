import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

interface Product {
  name: string;
  brand: string;
  price: number;
  sizeML: number;
  quantity: number;
}


const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Product>({
    name: "",
    brand: "",
    price: 0,
    sizeML: 0,
    quantity: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) throw new Error("Error: Failed to add product");

    const newProduct = await response.json();
    console.log("Product added:", newProduct);
    // alert("Product added successfully!");
    navigate("/admin/products");
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="w-full h-full bg-red-300 flex flex-col items-center justify-center">
  <div className="mb-9">
    <h1 className="font-bold">Add Product</h1>
  </div>

  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-lg shadow-md w-[90%]"
  >
    <div className="mb-6">
      <label htmlFor="productName" className="block text-sm font-medium mb-1">
        Product Name
      </label>
      <input
        type="text"
        className="w-full border rounded border-black"
        id="productName"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
    </div>

    <div className="mb-6">
      <label htmlFor="productBrand" className="block text-sm font-medium mb-1">
        Product Brand
      </label>
      <input
        type="text"
        className="w-full border rounded border-black"
        id="productBrand"
        name="brand"
        value={formData.brand}
        onChange={(e) =>
          setFormData({ ...formData, brand: e.target.value })
        }
      />
    </div>

    <div className="mb-6">
      <label htmlFor="productPrice" className="block text-sm font-medium mb-1">
        Product Price
      </label>
      <input
        type="number"
        className="w-full border rounded border-black"
        id="productPrice"
        name="price"
        value={formData.price}
        onChange={(e) =>
          setFormData({ ...formData, price: Number(e.target.value) })
        }
      />
    </div>

    <div className="mb-6">
      <label htmlFor="productSize" className="block text-sm font-medium mb-1">
        Product Size (ML)
      </label>
      <input
        type="number"
        className="w-full border rounded border-black"
        id="productSize"
        name="sizeML"
        value={formData.sizeML}
        onChange={(e) =>
          setFormData({ ...formData, sizeML: Number(e.target.value) })
        }
      />
    </div>

    <div className="mb-6">
      <label htmlFor="productQuantity" className="block text-sm font-medium mb-1">
        Product Quantity
      </label>
      <input
        type="number"
        className="w-full border rounded border-black"
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
        className="rounded font-bold p-4 bg-green-400 cursor-pointer"
      >
        Add Product
      </button>
    </div>
  </form>
</div>
  )
}

export default AddProduct