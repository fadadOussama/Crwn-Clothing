import React, { useContext } from "react";
import ShoppingIcon from "../../assets/shopping-bag.svg";
import { cartContext } from "../context/cart.context";
import { productContext } from "../context/product.context";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen } = useContext(cartContext);
  const { productCount } = useContext(productContext);

  const handleCartDropdown = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="w-[40px] h-[40px] relative ml-5 cursor-pointer" onClick={handleCartDropdown}>
      <img src={ShoppingIcon} />
      <span className="absolute top-[15px] left-1/2 -translate-x-1/2 lining-nums select-none">{productCount}</span>
    </div>
  );
}
