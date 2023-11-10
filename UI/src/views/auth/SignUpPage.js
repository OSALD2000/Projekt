import React from "react";
import Form from "../../components/forms/authForm";
import "../../css/loginPage.css"


const SignUpPage = () => {
  return (
    <div className="loginpage">
        <div className="loginpage-form"><Form signup={true}></Form></div>
    </div>
  );
};

export default SignUpPage;
