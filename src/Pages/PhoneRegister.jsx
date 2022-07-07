import React from "react";

import LoginWithNumber from "../Components/Auth/LoginWithNumber";
import { useAuth } from "../Context/AuthContextProvider";

const PhoneRegister = () => {
  const { signInWithNumber, verifyOTP, signInWithGoogle } = useAuth();
  return (
    <div>
      <LoginWithNumber
        title={"Login"}
        link={"/login"}
        linkText={"Already have an accoun? Login"}
        signInWithNumber={signInWithNumber} 
        signInWithGoogle={signInWithGoogle}
        verifyOTP={verifyOTP}
      />
    </div>
  );
};

export default PhoneRegister;
