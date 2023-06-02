import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const cartContext = createContext();

export default function CartProvider() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <cartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      <Outlet />
    </cartContext.Provider>
  );
}
