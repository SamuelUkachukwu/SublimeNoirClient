import React from "react";

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

interface Props {
  order: Order;
  onClose: () => void;
}
const calculateTotal = (items: OrderItem[]) => {
  let total = 0;

  for (let i = 0; i < items.length; i++) {
    total += items[i].priceAtPurchase * items[i].quantity;
  }

  return total;
};

const OrderDetailAdmin = ({ order, onClose }: Props) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl w-[80%] lg:w-[500px] p-6 relative">
        <button onClick={onClose} className="absolute top-2 right-2 w-4 h-4">
          <span className="absolute top-4 right-2 w-full h-0.5 bg-black rotate-45"></span>
          <span className="absolute top-4 right-2 w-full h-0.5 bg-black -rotate-45"></span>
        </button>

        <h2 className="text-xl font-semibold mb-4">{order.username}'s order</h2><hr />

        <div className="space-y-2 pt-4">
          <p>
            <b>Order ID:</b> {order.orderId}
          </p>
          <p>
            <b>Order Date:</b> €{order.orderDate}
          </p>
          <p>
            <b>Order Status:</b> {order.status}
          </p>
          <hr />
          <p>
            <b>Products:</b>
          </p>
          {order.items.map((item) => (
            <>
              <div key={item.productId}>
                <h3>{item.productName}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: €{item.priceAtPurchase}</p>
              </div>
              <hr />
            </>
          ))}
          <p>
            <b>Total:</b> €{calculateTotal(order.items).toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailAdmin;
