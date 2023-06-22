import { React, useEffect } from "react";
import SignUp from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in-form/sign-in-form.component";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Authentication() {
  const { data } = useSelector((state) => state.user);
  const nav = useNavigate();

  useEffect(() => {
    if (data) {
      nav("/");
    }
  });

  return (
    <div className="my-20 flex flex-col lg:items-start items-center lg:justify-between lg:flex-row lg:w-[1000px] mx-auto">
      <SignIn />
      <SignUp />
    </div>
  );
}
