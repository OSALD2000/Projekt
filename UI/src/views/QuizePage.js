import React from "react";
import { useLoaderData, json, redirect } from "react-router";
import { Card } from "../components/common/card";
import Quiz from "../components/quiz-elements/quiz";
import { getAuthToken } from "./auth/auth";

const QuizePage = () => {
    const quize = useLoaderData();

    return (<Card>
        {Array.isArray(quize) ? quize.map(quiz => <Quiz key={quiz._id} title={quiz.title} beschreibung={quiz.beschreibung} quizId={quiz._id}/>) : quize}
    </Card>)
}

export default QuizePage;


export const loader = async ({ params }) => {
    const token = getAuthToken();
    const category = params.category;

    const response = await fetch("http://localhost:8080/loader/quizes/" + category,{
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 401) {
        return redirect('/auth/signin?mode=login')
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const data = await response.json();

    if (data.quize.length === 0) {
        return data.message;
    }

    return data.quize
}
