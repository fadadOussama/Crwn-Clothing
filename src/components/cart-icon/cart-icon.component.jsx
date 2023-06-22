import React from "react";
import ShoppingIcon from "../../assets/shopping-bag.svg";
import { useDispatch, useSelector } from "react-redux";
import { click } from "../../store/cart/cartSlice";

export default function CartIcon() {
  const dispatch = useDispatch();
  const { counter } = useSelector((state) => state);

  return (
    <div className="w-[40px] h-[40px] relative ml-5 cursor-pointer" onClick={() => dispatch(click())}>
      <img src={ShoppingIcon} />
      <span className="absolute top-[15px] left-1/2 -translate-x-1/2 lining-nums select-none">{counter}</span>
    </div>
  );
}
