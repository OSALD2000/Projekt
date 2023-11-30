import React, { useState } from "react";
import { getAuthToken } from "./auth/auth";
import { redirect, json, useLoaderData } from "react-router";
import Question from "../components/quiz-elements/questions/question";

import classes from "../css/answer.module.css";
import { Form, useSubmit } from "react-router-dom";

const AnswerQuiz = (props) => {
    const data = useLoaderData();
    const [answers, setAnswers] = useState([]);
    const submit = useSubmit();


    const updateAnswers = (answer) => {
        setAnswers(curent => {
            return [...curent.filter(a => a.questionId !== answer.questionId), answer]
        })
    }

    const onSubmitAnswerHandler = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('answers', JSON.stringify({
            quizId: data.quizId,
            questions: answers
        }));

        submit(formData, { action: "/quiz/answerQuiz/" + data.quizId, method: "POST" });

    }

    return (
        <Form method="post" onSubmit={onSubmitAnswerHandler}>
            <div className={classes.answer_continer}>
                <header>
                    <h1>{data.title}</h1>
                    <h2>required points :</h2> <p>{data.required_points}</p>
                    <h2>Beschreibung :</h2>  <p>{data.beschreibung}</p>
                </header>

                {data.questions.map(question => <Question key={question.id} question={question} mode={false} onUpdate={updateAnswers} />)}

                <button type="submit" className="btn  w-100">Send Answers</button>
            </div>
        </Form>
    );
};

export default AnswerQuiz;






export const action = async ({ request }) => {
    const token = getAuthToken();

    const data = await request.formData();
    const answers = data.get('answers');


    const response = await fetch("http://localhost:8080/quiz/answer", {
        method: "POST",
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
        body: answers
    });

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    return true;
}

export const loader = async ({ params }) => {
    const token = getAuthToken();
    const quizId = params.quizId;

    const response = await fetch("http://localhost:8080/loader/quiz/" + quizId, {
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

    console.log(data);
    
    const { quiz } = data;

    return quiz;
}