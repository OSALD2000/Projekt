import React from "react";
import ShowResult from "../components/quiz-elements/showResult/showResult";
import { redirect, useLoaderData, json } from "react-router";
import { getAuthToken } from "./auth/auth";


const ViewAnswerPage = () => {
    const data = useLoaderData();

    return (
        <ShowResult
            quizInfo={data.quizInfo}
            username={data.username}
            result={data.result}
            passed={data.passed}
            questions={data.questions}
        />
    );
}



export const loader = async ({ params }) => {
    const quizId = params.quizId;
    const participantId = params.participantId;
    const token = getAuthToken();

    if (!participantId || !quizId) {
        alert('versuchen Sie es nochmal :)');
        return redirect('/');
    }
    const url = `http://localhost:8080/loader/quiz/participant/${quizId}/${participantId}`;

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

    return data.participant;

}


export default ViewAnswerPage;