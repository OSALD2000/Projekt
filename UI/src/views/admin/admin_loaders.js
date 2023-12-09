import { json, redirect } from "react-router";
import { getAuthToken } from "../auth/auth";

export const loadUserProfile = async ({ params }) => {
    const token = getAuthToken();
    const userId = params.userId;

    const url = `http://localhost:8080/admin/user/profile/${userId}`

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

    const data = await response.json();

    return data.daten;
}