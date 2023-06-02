import { React } from "react";
import SignUp from "../../components/sign-up-form/sign-up-form.component";
import SignIn from "../../components/sign-in-form/sign-in-form.component";

export default function Authentication() {
  return (
    <div className="my-20 flex flex-col lg:items-start items-center lg:justify-between lg:flex-row lg:w-[1000px] mx-auto">
      <SignIn />
      <SignUp />
    </div>
  );
}
