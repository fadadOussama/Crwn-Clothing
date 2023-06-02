import React, { useContext } from "react";
import { cartContext } from "../context/cart.context";
import { productContext } from "../context/product.context";
import { Link } from "react-router-dom";

export default function CartDropdown() {
  const { isCartOpen } = useContext(cartContext);
  const { productVal } = useContext(productContext);

  return (
    <div
      className={`${
        isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      } mt-[300px] z-40 absolute -right-[10px] -top-[220px] flex gap-x-4 flex-col border-2 border-black w-[240px] h-[340px] bg-white p-5 transition duration-200`}
    >
      <div className="overflow-x-auto h-[240px]">
        {productVal.length === 0 ? (
          <p className="text-center">no item in the cart</p>
        ) : (
          productVal.map(({ name, id, quantity, imageUrl, price }) => (
            <div key={id} className="flex gap-x-4 items-center mb-4">
              <img src={imageUrl} alt="product-img" className="w-[80px]" />
              <div>
                <p className="text-[14px] font-medium">{name}</p>
                <span className="text-[14px] lining-nums">
                  {quantity} x ${price}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <Link
        className="absolute bottom-[20px] left-1/2 -translate-x-1/2 text-black text-[11px] font-bold bg-slate-200  focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-lg px-2 py-2"
        to="checkout"
      >
        GO TO CHECKOUT
      </Link>
    </div>
  );
}
