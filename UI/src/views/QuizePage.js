import React from "react";
import { useLoaderData, json } from "react-router";
import { Card } from "../components/common/card";
import Quiz from "../components/quiz-elements/quiz";

const QuizePage = () => {
    const quize = useLoaderData();

    return (<Card>
        {Array.isArray(quize) ? quize.map(quiz => <Quiz key={quiz._id} title={quiz.title} beschreibung={quiz.beschreibung} quizId={quiz._id}/>) : quize}
    </Card>)
}

export default QuizePage;


export const loader = async ({ params }) => {
    const category = params.category;

    const response = await fetch("http://localhost:8080/loader/quizes/" + category);

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const data = await response.json();

    if (data.quize.length === 0) {
        return data.message;
    }

    return data.quize
}
