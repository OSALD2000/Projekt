import React from "react";
import { useState } from "react";
import "../../css/emailVerificationPage.css";
import { Form, useActionData } from "react-router-dom";
import Input from "../../components/common/Input";
import { TYPE } from "../../util/validation/Type";
import { json, redirect } from "react-router-dom";
import { storeToken } from "../../util/storeToken";
import { fetch_function } from "../../util/fetch_function";

const EmailVerification = () => {
  const actionData = useActionData();
  const [many_try, setManyTry] = useState(false);
  const [loding, setLoding] = useState(false);

  const sendeNewEmail = async () => {
    const email = localStorage.getItem("email");

    if (!email) {
      return redirect("/signup?mode=signup");
    }

    setLoding(true);


    const url = `auth/again/emailverification/${email}`

    const response = await fetch_function(url, 'get');

    if (response.status === 442) {
      setManyTry(true);
    }
    setLoding(false)
  };

  return (
    <>
      <Form method="POST">
        <div className={`card emailverification`}>
          <label
            htmlFor="mailverificationCode"
            className="emailverification-label"
          >
            Bitte Bestätigen Sie Ihre Email Addresse
          </label>
          {loding ? <div className="lds-dual-ring"></div> : (
            <>
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
              <button
                type="button"
                onClick={sendeNewEmail}
                className={"btn btn-outline mt-2"}
              >
                Email again senden
              </button>
              {many_try && (
                <p className="errorText mt-2">
                  bitte versuchen Sie es zu einem späteren zeitpunkt erneut
                </p>
              )}
              {actionData && (
                <p className="errorText mt-2">{actionData.message}</p>
              )}
            </>
          )}
        </div>
      </Form>
    </>
  );
};

export default EmailVerification;

export const action = async ({ request }) => {
  const email = localStorage.getItem("email");

  if (!email) {
    return redirect("/signup?mode=signup");
  }

  const data = await request.formData();

  const verificationCode = data.get("mailverificationCode");

  const url = `auth/emailverification`
  const response = await fetch_function(url, 'POST', {
    email: email,
    verificationCode: verificationCode,
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

export const loader = async () => {
  const email = localStorage.getItem("email");
  if (!email) {
    return redirect("/signup?mode=signup");
  }

  const url = `auth/emailverification/${email}`
  const response = await fetch_function(url, 'get');
  
  if (response.status === 442 || response.status === 401) {
    return redirect("/signup?mode=signup");
  }

  if (!response.ok) {
    throw json({ message: "Could not send Email!" }, { status: 500 });
  }

  return true;
};