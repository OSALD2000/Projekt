import React from "react";
import "../../css/emailVerificationPage.css";
import { Form } from "react-router-dom";
import Input from "../../components/common/Input";
import { TYPE } from "../../util/validation/Type";
import { json, redirect } from "react-router-dom";
import { storeToken } from "../../util/storeToken";

const EmailVerification = (props) => {
  return (
    <Form method="POST">
      <div className={`card emailverification`}>
        <label
          htmlFor="mailverificationCode"
          className="emailverification-label"
        >
          Bitte Bestätigen Sie Ihre Email Addresse
        </label>
        <Input
          validationType={TYPE.EMAILVERIFICATION}
          name="mailverificationCode"
          placeholder="X   X   X   X   X"
          type="text"
          art="emailverification"
          ohneAddon={true}
        ></Input>
        <button type="submit" className={"btn btn-outline"}>
          Verify
        </button>
      </div>
    </Form>
  );
};

export default EmailVerification;

export const action = async ({ request }) => {
  const email = localStorage.getItem("email");

  if (!email) {
    return redirect("/signup?mode=signup");
  }

  const data = await request.formData();

  const verificationCode = data.mailverificationCode;

  const response = await fetch("http://localhost:8080/auth/emailverification", {
    method: "POST",
    body: JSON.stringify({
      email: email,
      verificationCode: verificationCode,
    }),
    headers: {
      "Content-Type": " application/json",
    },
  });

  if (response.status === 442 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  localStorage.removeItem("email");

  const resData = await response.json();
  const token = resData.token;
  storeToken(token, 1);
  
  return redirect("/");
};