import React from "react";
import ViewQuiz from "../../components/quiz-elements/view/viewQuiz";
import { redirect, useLoaderData, json } from "react-router";
import { getAuthToken } from "../auth/auth";
import { fetch_function } from "../../util/fetch_function";


const ViewAnswerPage = () => {
    const data = useLoaderData();

    return (
        <ViewQuiz quizInfo={data} questions={data.questions} />
    );
}



export const loader = async ({ params }) => {
    const quizId = params.quizId;
    const token = getAuthToken();

    if (!token) {
        return redirect("/auth/signin");
    }

    if (!quizId) {
        alert('versuchen Sie es nochmal :)');
        return redirect('/');
    }

    const url = `user/quiz/${quizId}`;

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


export default ViewAnswerPage;