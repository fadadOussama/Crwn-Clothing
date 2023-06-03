import React, { createContext, useReducer } from "react";
import { Outlet } from "react-router-dom";

const reducerFun = (isCartOpen, action) => {
  const { type } = action;

  switch (type) {
    case "click":
      return !isCartOpen;
    default:
      throw new Error(`unhandled type ${type} in reducer function`);
  }
};

export const cartContext = createContext();

export default function CartProvider() {
  const [isCartOpen, dispatch] = useReducer(reducerFun, false);

  const handleCartDropdown = () => {
    dispatch({
      type: "click",
    });
  };

  return (
    <cartContext.Provider value={{ isCartOpen, handleCartDropdown }}>
      <Outlet />
    </cartContext.Provider>
  );
}
