import { getAuthToken } from "../views/auth/auth";

export const fetch_function = async (subUrl, method, body) => {
    const token = getAuthToken();

    const response = await fetch("http://localhost:8888/" + subUrl, {
        method: method,
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
        body: (method.toLowerCase() === 'post' || method.toLowerCase() === 'put') ? JSON.stringify(body) : null,
    });

    return response;
}