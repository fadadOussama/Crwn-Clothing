import React, { useEffect } from "react";
import { createContext, useState } from "react";

import { Outlet } from "react-router-dom";
import { categoriesAndDocumentLoader } from "../../utils/firebase/firebase.utils";

export const shopContext = createContext();

export default function ShopProvider() {
  const [shopVal, setShopVal] = useState([]);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await categoriesAndDocumentLoader();
      setShopVal(categoryMap);
    };

    getCategoriesMap();
  }, []);

  return (
    <shopContext.Provider value={{ shopVal, setShopVal }}>
      <Outlet />
    </shopContext.Provider>
  );
}
