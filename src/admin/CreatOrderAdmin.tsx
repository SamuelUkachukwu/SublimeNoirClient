import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";
import { useNavigate } from "react-router-dom";

interface User {
  id: number;
  username: string;
}

interface Product {
  productId: number;
  name: string;
  price: number;
}

interface OrderItem {
  productId: number;
  name: string;
  quantity: number;
  price: number;
}

const CreatOrderAdmin = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const [selectUser, setSelectUser] = useState<number | "">("");
  const [selectProduct, setSelectProduct] = useState<number | "">("");
  const [quantity, setQuantity] = useState(1);

  const [items, setItems] = useState<OrderItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const usersResponse = await apiClient.get("/users");
      const productsResponse = await apiClient.get("/products");

      setUsers(usersResponse.data);
      setProducts(productsResponse.data);
    };

    fetchData();
  }, []);

  // Add cart items
  const addItem = () => {
    if (!selectProduct || quantity <= 0) return;

    const product = products.find((p) => p.productId === selectProduct);
    if (!product) return;

    setItems((productList) => {
      const productIndex = productList.findIndex(
        (item) => item.productId === product.productId,
      );

      if (productIndex !== -1) {
        const updatedList = [...productList];
        // console.log(updatedList[productIndex].quantity)
        updatedList[productIndex] = {
          ...updatedList[productIndex],
          quantity: updatedList[productIndex].quantity + quantity,
        };
        return updatedList;
      }
      const allList = [
        ...productList,
        {
          productId: product.productId,
          name: product.name,
          quantity,
          price: product.price,
        },
      ];
      return allList;
    });

    setSelectProduct("");
    setQuantity(1);
  };

  const removeItem = (index: number) => {
    setItems((productList) => productList.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    if (!selectUser || items.length === 0) {
      alert("Please Add User and products");
      return;
    }

    const orderData = {
      userId: selectUser,
      items: items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    alert("order created successfully...redirecting you to order page");

    await apiClient.post("/orders", orderData);
    navigate("/admin/orders");
  };

  return (
    <div className="lg:w-[80%] mx-auto rounded-xl shadow p-6 bg-blue-200">
      <h1 className="text-xl font-bold mb-4">Create Order</h1>

      <div className="mb-6">
        <label className="mb-1 block">Select User</label>
        <select
          className="w-full  p-2 border rounded bg-white"
          value={selectUser}
          onChange={(e) => setSelectUser(Number(e.target.value))}
        >
          <option value="">Add a User...</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-3 mb-6 flex-wrap md:flex-nowrap">
        <select
          className="border p-2 rounded md:flex-1 bg-white w-full"
          value={selectProduct}
          onChange={(e) => setSelectProduct(Number(e.target.value))}
        >
          <option value="">Add Product</option>
          {products.map((p) => (
            <option key={p.productId} value={p.productId}>
              {p.name}
            </option>
          ))}
        </select>

        <div className="w-full md:w-[30%] flex gap-3">
          <input
            className="border p-2 w-[50%] rounded bg-white"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />

          <button
            onClick={addItem}
            className="bg-green-900 text-white px-4 rounded w-[50%]"
          >
            Add Product
          </button>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="font-medium mb-2">Order Items</h2>

        {items.length === 0 && (
          <p className="text-gray-500 text-sm">Your basket is empty</p>
        )}

        <ul className="space-y-2">
          {items.map((item, index) => (
            <li
              key={index}
              className="flex items-center p-2 gap-3 mb-6 flex-wrap md:flex-nowrap"
            >
              <div className="w-full md:w-[50%] flex justify-between">
                <span className="flex-1">
                  {index + 1}.&nbsp; &nbsp;
                  {item.name}
                </span>
                <span className="w-20 ">
                  <b>Qty:</b> {item.quantity}
                </span>
              </div>
              <div className="w-full md:w-[50%] flex justify-between">
                <span className="">
                  <b>Price:</b> &euro; {(item.price * item.quantity).toFixed(2)}
                </span>
                <button
                  className="border rounded relative w-6 h-6 flex items-center justify-center cursor-pointer"
                  onClick={() => removeItem(index)}
                >
                  <span className="absolute w-4 h-0.5 bg-black rotate-45"></span>
                  <span className="absolute w-4 h-0.5 bg-black -rotate-45"></span>
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* SUBMIT */}
      <button
        onClick={handleSubmit}
        className="w-full bg-green-600 text-white py-2 rounded"
      >
        Create Order
      </button>
    </div>
  );
};

export default CreatOrderAdmin;
