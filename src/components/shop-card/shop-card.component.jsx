/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { productContext } from "../context/product.context";

export default function ShopCard({ product }) {
  const { id, name, imageUrl, price } = product;
  const { productVal, setProductVal, setProductCount } = useContext(productContext);

  const handleProduct = () => {
    const uuid = crypto.randomUUID();
    const existingProoduct = productVal.find((productItem) => productItem.id === id);

    if (!existingProoduct) {
      setProductVal([...productVal, { ...product, quantity: 1, uuid: uuid }]);
    } else {
      productVal.map((productItem) => {
        if (productItem.id === id) {
          productItem.quantity += 1;
        }
      });
    }

    setProductCount((prevVal) => prevVal + 1);
  };

  return (
    <div className="relative h-[450px] group">
      <img
        src={imageUrl}
        alt="product-img"
        className="object-cover w-full h-4/5 mb-2 rounded-t-[6px] group-hover:opacity-70 transition-opacity duration-300"
      />
      <div className="flex justify-between">
        <span className="text-[17px] font-medium">{name}</span>
        <span className="font-medium lining-nums">${price}</span>
      </div>
      <button
        className="text-black lg:text-[12px] text-[10px] font-bold bg-slate-200 absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg text-sm px-4 py-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={handleProduct}
      >
        ADD TO CART
      </button>
    </div>
  );
}
