import React from "react";
import { Form, json, redirect, useActionData } from "react-router-dom";
import Input from "../../components/common/Input";
import { TYPE } from "../../util/validation/Type";
import classes from "../../css/updatePassword.module.css"
import { fetch_function } from "../../util/fetch_function";

const UpdatePassWord = () => {
    const data = useActionData();
    return (
        <div className={classes.continer}>
            <h1>Update Password</h1>
            <br />
            <br />
            <Form method="post">
                <Input
                    name="oldPassword"
                    art="password"
                    placeholder="old password"
                    required={true}
                    ohneAddon={true}
                    validationType={TYPE.PASSWORD}
                    min_length={10}
                />
                <Input
                    name="newPassword"
                    art="password"
                    placeholder="new password"
                    required={true}
                    ohneAddon={true}
                    validationType={TYPE.NEWPASSWORD}
                    min_length={10}
                />
                <br />
                {data && <div className="errorText">{data.message}</div>}
                <br />
                <button className="btn" type="submit">Save</button>
            </Form>
        </div>
    )
}


export const action = async ({ request }) => {
    const data = await request.formData();
    const oldPassword = data.get('oldPassword');
    const newPassword = data.get('newPassword');

    const url = `user/update`;

    const response = await fetch_function(url, 'put', {
        oldPassword: oldPassword,
        newPassword: newPassword,
    });

    if (response.status === 401) {
        return {
            code: 401,
            message: "Worng Password"
        };
    }

    if (response.status === 442) {
        return {
            code: 442,
            message: "Try Again"
        };
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    return redirect('/');
}


export default UpdatePassWord;