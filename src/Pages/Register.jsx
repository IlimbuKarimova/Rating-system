import React from "react";

import AuthForm from "../Components/Auth/AuthForm";
import { useAuth } from "../Context/AuthContextProvider";

const Register = () => {
  const { registerUser, signInWithGoogle } = useAuth();
  return (
    <div>
      <AuthForm
        title={"Register"}
        btnText={"Register"}
        link={"/login"}
        linkText={"Already have an accoun? Login"}
        handleSave={registerUser}
        signInWithGoogle={signInWithGoogle}
      />
    </div>
  );
};

export default Register;
