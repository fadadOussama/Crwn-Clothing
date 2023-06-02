import { React, useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { createUserDocFromAuth, signInWithGooglePopup, signInAuthWithEmailAndPassword } from "../../utils/firebase/firebase.utils";

// initial value of the inputs
const initialFormFields = {
  email: "",
  password: "",
};

export default function SignIn() {
  // form state
  const [formFields, setFormFields] = useState(initialFormFields);
  // destract the state value
  const { email, password } = formFields;

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // try & catch to test the auth info
    try {
      await signInAuthWithEmailAndPassword(email, password);
      // reset inputs
      handleInputReset();
    } catch (error) {
      switch (error.code) {
        case "auth/user-not-found":
          alert("user not found!");
          break;
        case "auth/wrong-password":
          alert("wrong password");
          break;
        default:
          console.log("error in sign in", error);
      }
    }
  };

  // Sign in with google pop
  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleChange = (e) => {
    // destract the name and value from e.target that's have inputs
    const { name, value } = e.target;
    // add values to separate the state obj then add the name & value that come from input
    setFormFields({ ...formFields, [name]: value });
  };

  const handleInputReset = () => {
    // set the state value to default
    setFormFields(initialFormFields);
  };

  return (
    <div className="mb-20">
      <h2 className="text-[24px] font-bold">Already have an account ?</h2>
      <span className="block text-[16px] mb-10">Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" required onChange={handleChange} name="email" id="email" value={email} autoComplete="off" />

        <label htmlFor="password">Password</label>
        <input type="password" required onChange={handleChange} name="password" id="password" value={password} autoComplete="off" />
        <button type="submit" className="bg-gray-800 hover:bg-gray-900 px-5 py-2.5">
          Sign in
        </button>
        <button type="button" className="text-center ml-6 bg-[#1da1f2] hover:bg-[#1da1f2]/90 px-5 py-2.5" onClick={signInWithGoogle}>
          <FaGoogle className="inline-flex  mr-2" />
          Sign in with google
        </button>
      </form>
    </div>
  );
}
