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



export const loadUserQuiz = async ({ params }) => {
    const token = getAuthToken();
    const userId = params.userId;
    const quizId = params.quizId;

    const url = `http://localhost:8080/admin/user/quiz/${userId}/${quizId}`

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

    return data.quiz;
}

export const loadStatistic = async ({ params }) => {
    const token = getAuthToken();
    const quizId = params.quizId;

    const url = `http://localhost:8080/admin/statistic/${quizId}`

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

    const { data } = await response.json();


    const data_doughnut = JSON.parse(data.chart_doughnut_data);
    const data_bar = JSON.parse(data.chart_bar_data);

    const parsed_data = { ...data, chart_doughnut_data: data_doughnut, chart_bar_data: data_bar }

    console.log(parsed_data);

    return parsed_data;
}