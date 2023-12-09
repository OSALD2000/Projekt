import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import QUESTIONTYPE from "../../../util/enum/QUESTIONTYPE";
import classes from "../showResult/show_result.module.css";


const ViewQuiz = ({ quizInfo, questions }) => {
    const info_list = [
        {
            title: "Quiz Title",
            value: quizInfo.title,
        }, {
            title: "Quiz Category",
            value: quizInfo.quizCategory,
        }, {
            title: "Quiz required points",
            value: quizInfo.required_points,
        }
    ]
    return (
        <div className={classes['show-answer-card']}>
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
            {questions.map(({ question_value, weight, category, right_answer }) => {
                return (
                    <div key={question_value}>
                        <h2 className={classes.question_category} >{category}</h2>
                        <div className={classes.question_grid}>

                            <div className={classes.question_value}>
                                <input placeholder="question" type="text" name="test" value={question_value} readOnly={true} />
                            </div>

                            <div className={classes.whight}>
                                <input placeholder="whight" type="number" name="test" value={weight} readOnly={true} />
                            </div>
                            <div className={`${classes.answer}`}>
                                <h2>Right Answer</h2>
                                {
                                    category === QUESTIONTYPE.MULTIPLECHOICE
                                        ?
                                        right_answer.map(mu_a => <input key={Math.random() * 1000} type="text" className={classes.show_answer_fild} value={mu_a} name="answer" readOnly={true} />
                                        )
                                        :
                                        <input type="text" className={classes.show_answer_fild} value={right_answer} name="answer" readOnly={true} />
                                }
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>)
}

export default ViewQuiz;