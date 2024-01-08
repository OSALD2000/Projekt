import React, { useRef, useState } from "react";

import Quizinfo from "../../components/quiz-elements/quizInfo";
import QuizCart from "../../components/quiz-elements/quizCart";
import Question from "../../components/quiz-elements/questions/question";
import Accordion from 'react-bootstrap/Accordion';
import { QUESTIONTYPE_ARRAY } from "../../util/enum/QUESTIONTYPE";

import { createQuestion } from "../../util/createQuestionObject";

import { redirect, useActionData } from "react-router";
import { Form, useSubmit, json } from "react-router-dom";

import "../../css/createQuizPage.css";
import { fetch_function } from "../../util/fetch_function";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [id, setId] = useState(1);
  const submit = useSubmit();
  const actionData = useActionData();

  const ref = useRef();

  const onUpdatehandler = (question) => {
    setQuestions(current => [...current.filter(q => q.id !== question.id), question]);
  }

  const onDeleteHanlder = (id, event) => {
    setQuestions(current => [...current.filter(q => q.id !== id)]);
  }

  const onClickHanlder = (event) => {
    const question = createQuestion(ref.current.value, id);
    setQuestions((current) => [...current, question]);
    setId((current) => current + 1);
  }

  const onSubmitHandler = (event) => {

    event.preventDefault();

    const title = event.target['title'].value;
    const category = event.target['category'].options[event.target['category'].selectedIndex].value;
    const beschreibung = event.target['beschreibung'].value;
    const required_points = parseFloat(event.target['win'].value) / 100.0;

    const quiz = {
      title: title,
      quizCategory: category,
      beschreibung: beschreibung,
      required_points: required_points,
      visibility: "private",
      questions: questions
    }

    const formData = new FormData();
    formData.append('quiz', JSON.stringify(quiz));

    submit(formData, { action: "/quiz/create", method: "POST" });
  }

  return (
    <Form method="post" onSubmit={onSubmitHandler}>
      <QuizCart>
        <header>
          <h1>Create Quiz</h1>
        </header>
        {
          actionData && <h3 className="errorText mb-5"> bitte versuchen Sie nochmal ein!! </h3>
        }
        <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
          <Accordion.Item className="accordion_item" eventKey="0">
            <Accordion.Header className="accordion_header">Quiz Info</Accordion.Header>
            <Accordion.Body className="accordion_body">
              <Quizinfo />
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item className="accordion_item" eventKey="1">
            <Accordion.Header className="accordion_header">Add Question</Accordion.Header>
            <Accordion.Body className="accordion_body">
              <div className="add_question_div">

                <select className="form-select" name="category_question" ref={ref}>
                  {QUESTIONTYPE_ARRAY.map(category => {
                    return <option value={category} key={category}>{category.toLowerCase()}</option>
                  })}
                </select>

                <button type="button" className="btn" onClick={onClickHanlder}>Add</button>

              </div>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className="accordion_item questions" eventKey="2">
            <Accordion.Header className="accordion_header">Questions</Accordion.Header>
            <Accordion.Body className="accordion_body">
              {questions.length === 0 ? <h2>Keine Fragen</h2> : questions.sort((a, b) => a.id - b.id).map(q => <Question key={Math.random() * q.id ** 100} onDeleteQuestion={onDeleteHanlder.bind(null, q.id)} question={q} mode={true} onUpdate={onUpdatehandler} />)}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        <button type="submit" className="btn">Add Quiz</button>
      </QuizCart>
    </Form>
  );
};

export default CreateQuiz;






export const action = async ({ request }) => {
  
  const data = await request.formData();
  const quiz = JSON.parse(data.get('quiz'));

  
  const url = `quiz/create`;
  const response = await fetch_function(url, 'POST', quiz);

  if (response.status === 401) {
    return redirect("/auth/signin?mode=login");
  }

  if (response.status === 442) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  return redirect("/?successful=true")
}