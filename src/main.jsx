import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";

// Components
import Navigation from "./routes/navigation/navigation.component";
import Home from "./routes/home/home.component";
import Authentication from "./routes/authentication/authentication.component";
import { store } from "./store/store";

// CSS File
import "./index.css";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";
import CategoryPreview from "./routes/category/category.component";

const router = createBrowserRouter([
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
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <Elements stripe={stripePromise}>
        <RouterProvider router={router} />
      </Elements>
    </Provider>
  </React.StrictMode>
);  
