import React, { useEffect, useState } from "react";
import { getAuthToken } from "../auth/auth";
import { redirect, json, useLoaderData, useActionData } from "react-router";
import Question from "../../components/quiz-elements/questions/question";
import { Form, useSubmit } from "react-router-dom";
import { answerValidtion } from "../../util/validation/answersValidtion";
import classes from "../../css/answer.module.css";

const AnswerQuiz = (props) => {
    const data = useLoaderData();
    const actionData = useActionData();
    const [valid, setValid] = useState(false);
    const [answers, setAnswers] = useState([]);
    const submit = useSubmit();

    useEffect(() => {
        console.log(answers);
        answerValidtion(answers, data.questions, setValid);
    }, [answers, data.questions]);

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
                {actionData && <p className="errorText">bitte versuchen Sie nochmal an <br /> bitte alle Frage beantworten</p>}

                {data.questions.map(question => <Question key={question.id} question={question} mode={false} onUpdate={updateAnswers} />)}

                <button disabled={!valid} type="submit" className="btn  w-100">Send Answers</button>
            </div>
        </Form>
    );
};

export default AnswerQuiz;






export const action = async ({ request }) => {
    const token = getAuthToken();

    const form_data = await request.formData();
    const answers = form_data.get('answers');


    const response = await fetch("http://localhost:8080/quiz/answer", {
        method: "POST",
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
        body: answers
    });

    if (response.status === 442) {
        return response;
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const data = await response.json();
    const url = `/quiz/view-answers/${data.quizId}`;

    return redirect(url);
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

    if (response.status === 403) {
        const url = `/quiz/view-answers/${quizId}`;
        return redirect(url);
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const data = await response.json();

    const { quiz } = data;

    return quiz;
}