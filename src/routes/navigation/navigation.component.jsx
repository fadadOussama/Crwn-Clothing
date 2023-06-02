// eslint-disable-next-line no-unused-vars
import React, { useContext } from "react";
import { Fragment } from "react";
import { Outlet, Link } from "react-router-dom";
import CrwnLogo from "../../assets/crown.svg";
import { userContext } from "../../components/context/user.context";
import { signOutUser } from "../../utils/firebase/firebase.utils";
import Swal from "sweetalert2";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.component";

export default function Navigation() {
  const { userValue } = useContext(userContext);

  const handleSignOut = () => {
    Swal.fire({
      title: "Do you want to sign out?",
      showCancelButton: true,
      icon: "warning",
      iconColor: "#526D82",
      width: "fit-content",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, sign out!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Sign out!", "You sign out successfully", "success");
        signOutUser();
      }
    });
  };

  return (
    <Fragment>
      <div className="flex justify-between items-center mx-[10px] h-[80px] relative">
        <Link to="/" className="">
          <img src={CrwnLogo} alt="logo" className="w-[45px]" />
        </Link>
        <div className="flex gap-x-4 items-center">
          <Link to="/shop" className="cursor-pointer">
            Shop
          </Link>
          {userValue ? (
            <span className="cursor-pointer" onClick={handleSignOut}>
              Sign Out
            </span>
          ) : (
            <Link to="/auth" className="cursor-pointer">
              Sign In
            </Link>
          )}
          <CartIcon />
        </div>
        <CartDropdown />
      </div>
      <Outlet />
    </Fragment>
  );
}
