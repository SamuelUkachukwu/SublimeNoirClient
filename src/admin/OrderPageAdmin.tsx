import React, { useEffect, useState } from "react";
import apiClient from "../api/axiosConfig";
import OrderDetailAdmin from "./OrderDetailAdmin";

interface OrderItem {
  productId: number;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
}

interface Order {
  orderId: number;
  orderDate: string;
  status: string;
  username: string;
  items: OrderItem[];
}

const OrderPageAdmin = () => {
  const [data, setData] = useState<Order[]>([]);
  const [orderDetail, setOrderDetail] = useState<Order | null>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiClient.get<Order[]>("/orders");
        setData(response.data);
        console.log(response.data);
      } catch (error) {
        console.log("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const calculateTotal = (items: OrderItem[]) => {
    let total = 0;

    for (let i = 0; i < items.length; i++) {
      total += items[i].priceAtPurchase * items[i].quantity;
    }

    return total;
  };

  const handleDelete = async (orderId: number) => {
    try {
      const response = await apiClient.delete(`/orders/${orderId}`);

      if (response.status === 204) {
        setData((prev) => prev.filter((p) => p.orderId !== orderId));
      }
      alert("order deleted succssefully");
    } catch (error: any) {
      console.log("Error deleting order", error);

      // found out products tied to an order will not delete
      if (error.response) {
        alert("Order cannot be deleted ");
      } else {
        alert("Server error. Try again later.");
      }
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md border flex flex-col">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold">Orders</h2>
        </div>

        <div className="flex-1 overflow-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Items</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Edit</th>
                <th className="px-4 py-3 text-left">Delete</th>
              </tr>
            </thead>

            <tbody>
              {data.map((order) => (
                <tr key={order.orderId} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-3">{order.orderId}</td>
                  <td className="px-4 py-3">{order.orderDate}</td>
                  <td className="px-4 py-3">{order.username}</td>
                  {/* <td className="px-4 py-3">{order.items.length}</td> */}
                  <td className="px-4 py-3">
                    <span
                      onClick={() => setOrderDetail(order)}
                      className="text-blue-600 hover:underline cursor-pointer"
                    >
                      {order.items.length}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    €{calculateTotal(order.items).toFixed(2)}
                  </td>
                  <td className="px-4 py-3">{order.status}</td>

                  <td className="px-4 py-3">
                    <button className="text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(order.orderId)}
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
      {orderDetail && (
        <OrderDetailAdmin
          order={orderDetail}
          onClose={() => setOrderDetail(null)}
        />
      )}
    </>
  );
};

export default OrderPageAdmin;
