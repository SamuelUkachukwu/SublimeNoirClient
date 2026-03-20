import React from "react";

interface Product {
  productId: number;
  name: string;
  brand: string;
  price: number;
  sizeML: number;
  quantity: number;
}

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductDetailAdmin = ({ product, onClose }: Props) => {
  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black opacity-70 flex items-center justify-center z-50"
    >
      <div className="bg-white rounded-xl shadow-xl w-[80%] lg:w-[500px] p-6 relative">
        
        <button onClick={onClose} className="absolute top-2 right-2 w-4 h-4">
          <span className="absolute top-4 right-2 w-full h-0.5 bg-black rotate-45"></span>
          <span className="absolute top-4 right-2 w-full h-0.5 bg-black -rotate-45"></span>
        </button>

        <h2 className="text-xl font-semibold mb-4">{product.name}</h2>

        <div className="space-y-2">
          <p>
            <b>Brand:</b> {product.brand}
          </p>
          <p>
            <b>Price:</b> €{product.price}
          </p>
          <p>
            <b>Size:</b> {product.sizeML} ml
          </p>
          <p>
            <b>Stock:</b> {product.quantity}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailAdmin;
