import { json, redirect } from "react-router";
import { fetch_function } from "../../util/fetch_function";

export const loadUserProfile = async ({ params }) => {
    const userId = params.userId;

    const url = `admin/user/profile/${userId}`

    const response = await fetch_function(url, 'get');

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
    const userId = params.userId;
    const quizId = params.quizId;

    const url = `admin/user/quiz/${userId}/${quizId}`

    const response = await fetch_function(url, 'get');

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
    const quizId = params.quizId;

    const url = `admin/statistic/${quizId}`

    const response = await fetch_function(url, 'get');

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


    return parsed_data;
}


export const loadAnswer = async ({ params }) => {
    const quizId = params.quizId;
    const userId = params.userId;

    const url = `admin/user/answer/${userId}/${quizId}`

    const response = await fetch_function(url, 'get');

    if (response.status === 401) {
        return redirect("/auth/signin");
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const data = await response.json();

    return data.participant;
}


export const searchQuize = async (arg) => {
  
    const url = `admin/search/quiz/${arg}`

    const response = await fetch_function(url, 'get');

    if (response.status === 401) {
        return 401;
    }

    if (!response.ok) {
        return false;
    }

    const data = await response.json();

    if (data.quize.length === 0) {
        return data.message;
    }

    return data.quize
}

export const searchUsers = async (arg) => {

    const url = `admin/search/user/${arg}`

    const response = await fetch_function(url, 'get');

    if (response.status === 401) {
        return 401;
    }

    if (!response.ok) {
        return false;
    }

    const data = await response.json();

    if (data.users.length === 0) {
        return data.message;
    }

    return data.users
}