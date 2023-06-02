import { React, useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";

// initial value of the inputs
const initialFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function SignUp() {
  // form state
  const [formFields, setFormFields] = useState(initialFormFields);
  // destract the state value
  const { displayName, email, password, confirmPassword } = formFields;

  // submit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    // check password
    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }
    // try & catch to test the auth info
    try {
      // send the email & password values from input then destract to get user value only
      const { user } = await createAuthUserWithEmailAndPassword(email, password);
      // send user info with addition value if you have like displayName in this case
      await createUserDocFromAuth(user, { displayName });
      // reset inputs
      handleInputReset();
    } catch (error) {
      // check the error code that get from firebase
      if (error.code === "auth/email-already-in-use") {
        return alert("This email is already used!");
      }
      console.log("error creating account", error);
    }
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
    <div>
      <h2 className="text-[24px] font-bold">Don&#39;t have an account ?</h2>
      <span className="block text-[16px] mb-10">Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Username</label>
        <input type="text" required onChange={handleChange} name="displayName" value={displayName} autoComplete="off" />

        <label htmlFor="">Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email} autoComplete="off" />

        <label htmlFor="">Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password} autoComplete="off" />

        <label htmlFor="">Confirm Password</label>
        <input type="password" required onChange={handleChange} name="confirmPassword" autoComplete="off" value={confirmPassword} />
        <button type="submit" className="bg-gray-800 hover:bg-gray-900 px-5 py-2.5">
          Sign up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
