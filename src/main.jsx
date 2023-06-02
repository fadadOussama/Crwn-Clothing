import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

// Components
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import UserProvider from "./components/context/user.context";

// CSS File
import "./index.css";
import Shop from "./routes/shop/shop.component";
import ShopProvider from "./components/context/shop.context";
import CartProvider from "./components/context/cart.context";
import ProductProvider from "./components/context/product.context";
import Checkout from "./routes/checkout/checkout.component";
import CategoryPreview from "./routes/category/category.component";

const router = createBrowserRouter([
  {
    element: <UserProvider />,
    children: [
      {
        element: <ShopProvider />,
        children: [
          {
            element: <CartProvider />,
            children: [
              {
                element: <ProductProvider />,
                children: [
                  {
                    path: "/",
                    element: <Navigation />,
                    children: [
                      { index: true, element: <Home /> },
                      { path: "/:category", element: <CategoryPreview /> },
                      { path: "shop", element: <Shop /> },
                      { path: "shop/:category", element: <CategoryPreview /> },
                      { path: "checkout", element: <Checkout /> },
                      { path: "auth", element: <Authentication /> },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
