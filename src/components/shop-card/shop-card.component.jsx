/* eslint-disable react/prop-types */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { calc } from "../../store/counter/counterSlice";
import { setData, setQuantity } from "../../store/product/productSlice";

export default function ShopCard({ product }) {
  const { id, name, imageUrl, price } = product;
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state);
  const storeProduct = useSelector((state) => state.product);

  const handleProduct = () => {
    const uuid = crypto.randomUUID();
    const existingProoduct = storeProduct.find((productItem) => productItem.id === id);

    if (!existingProoduct) {
      dispatch(setData([...storeProduct, { ...product, quantity: 1, uuid: uuid }]));
    } else {
      dispatch(setQuantity(id));
    }

    dispatch(calc(counter + 1));
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
