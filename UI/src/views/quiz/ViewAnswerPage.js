import React from "react";
import ShowResult from "../../components/quiz-elements/showResult/showResult";
import { redirect, useLoaderData, json } from "react-router";
import { fetch_function } from "../../util/fetch_function";


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

    if (!quizId) {
        alert('versuchen Sie es nochmal :)');
        return redirect('/');
    }

    const url = `loader/quiz/participant/${quizId}`;

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


export default ViewAnswerPage;