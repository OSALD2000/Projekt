import { json, redirect } from "react-router";
import { getAuthToken } from "../auth/auth"

export const deleteUser = async (id) => {
    const token = getAuthToken();

    const url = `http://localhost:8080/admin/user/delete/${id}`;

    const response = await fetch(url, {
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
    });

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
    const token = getAuthToken();

    const url = `http://localhost:8080/admin/quiz/delete/${id}`;

    const response = await fetch(url, {
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 401) {
        return redirect("/auth/signin");
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const { message } = await response.json();

    return message;  
}