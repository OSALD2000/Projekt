import React, { useRef, useState } from "react";

import Quizinfo from "../components/quiz-elements/quizInfo";
import QuizCart from "../components/quiz-elements/quizCart";
import Question from "../components/quiz-elements/questions/question";
import Accordion from 'react-bootstrap/Accordion';
import { QUESTIONTYPE_ARRAY } from "../util/enum/QUESTIONTYPE";

import { createQuestion } from "../util/createQuestionObject";

import "../css/createQuizPage.css";


const CreateQuiz = (props) => {
  const [questions, setQuestions] = useState([]);
  const [id, setId] = useState(1);
  
  const ref = useRef();

  const onUpdatehandler = (question) => {
    console.log(question);
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

  return (
    <QuizCart>
      <header>
        <h1>Create Quiz</h1>
      </header>
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

              <select className="form-select" name="category" ref={ref}>
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


    </QuizCart>
  );
};

export default CreateQuiz;
