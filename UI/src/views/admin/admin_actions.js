import { json, redirect } from "react-router";
import { fetch_function } from "../../util/fetch_function";

export const deleteUser = async (id) => {

    const url = `admin/user/delete/${id}`;

    const response = await fetch_function(url, "delete");

    if (response.status === 401) {
        return redirect("/auth/signin");
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const { message } = await response.json();

    return message;
}

export const deleteQuiz = async (id) => {

    const url = `admin/quiz/delete/${id}`;

    const response = await fetch_function(url, "delete");

    if (response.status === 401) {
        return redirect("/auth/signin");
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const { message } = await response.json();

    return message;  
}