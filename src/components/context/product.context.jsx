import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";

export const productContext = createContext();

export default function ProductProvider() {
  const [productCount, setProductCount] = useState(0);
  const [productVal, setProductVal] = useState([]);

  return (
    <productContext.Provider value={{ productCount, setProductCount, productVal, setProductVal }}>
      <Outlet />
    </productContext.Provider>
  );
}
