import React from "react";
import Form from "../../components/forms/authForm";
import "../../css/loginPage.css"


const LoginPage = (props, req, res) => {
  return (
    <div className="loginpage">
        <div className="loginpage-form"><Form></Form></div>
    </div>
  );
};

export default LoginPage;
