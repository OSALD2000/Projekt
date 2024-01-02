import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import QuestionResult from "./question_result";
import classes from "./show_result.module.css";

const ShowResult = ({ quizInfo, username, result, passed, questions }) => {
    const info_list = [
        {
            title: "Quiz Title",
            value: quizInfo.title,
        }, {
            title: "Quiz Category",
            value: quizInfo.category,
        }, {
            title: "Quiz required points",
            value: quizInfo.required_points,
        }, {
            title: "Username der Teilnehmer",
            value: username,
        },
        {
            title: "Result",
            value: result,
        },
        {
            title: "Bestanden",
            value: passed ? "JA" : "NEIN",
            class: passed ? true : false,
        }
    ]

    return (<div className={classes["show-answer-card"]}>
        {info_list.map(info => <div key={Math.random() * 1000}>
            <InputGroup size="lg" className="mb-3">
                <InputGroup.Text id="inputGroup-sizing-sm">{info.title}</InputGroup.Text>
                    <Form.Control
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        value={info.value}
                        readOnly={true}
                    />
            </InputGroup>
        </div>)}
        {
            questions.sort((a, b) => a.question._id.localeCompare(b.question._id)).map(({ question, answer, right_answer }) =>
                <div key={Math.random() * 1000}>
                    <QuestionResult
                        question_value={question.question_value}
                        weight={question.weight}
                        category={question.category}
                        answer={answer.answer}
                        is_right={answer.is_right}
                        right_answer={right_answer}
                    />
                </div>)
        }
    </div>);
}

export default ShowResult;
