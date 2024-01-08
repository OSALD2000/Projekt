import React, { useState } from "react";
import classes from "../quiz.module.css";


const FillInTheBlank = ({question:init_question, onUpdate, create, onDeleteQuestion}) => {
    const [question, setQuestion] = useState(init_question);
    const [answer, setAnswer] = useState({
        category: init_question.category,
        questionId: init_question.questionId,
        answer: "",
    })


    const onQuestionChangeHandler = (event) => {
        setQuestion(curent => {
            return { ...curent, question_value: event.target.value }
        });
    }

    const onWeightChangeHandler = (event) => {
        setQuestion(curent => {
            return { ...curent, weight: event.target.value }
        });
    }

    const onRgihtAnswerChangeHandler = (event) => {
        if (create) {
            setQuestion(curent => {
                return {
                    ...curent, right_answer: event.target.value
                }
            });
        } else {
            setAnswer(curent => {
                return {
                    ...curent, answer: event.target.value
                }
            })
        }
    }

    const saveChangesHandler = (event) => {
        onUpdate(question);
    }

    const onSaveAnswerHandler = () => {
        onUpdate(answer);
    }


    return (
        <>
            {
                create

                    ?

                    <div onBlur={saveChangesHandler}>
                        <h2 className={classes.question_title} >Fill The Blank</h2>
                        <div className={classes.choiceOne_grid}>

                            <div className={classes.question_value}>
                                <input placeholder="question" type="text" name="test" value={question.question_value} onChange={onQuestionChangeHandler} required />
                            </div>

                            <div className={classes.whight}>
                                <input placeholder="whight" type="number" name="test" value={question.weight} onChange={onWeightChangeHandler} required />
                            </div>

                            <div className={classes.choiceOne_action}>
                                <button type="button" className="btn" onClick={onDeleteQuestion}>delete</button>
                            </div>
                            <div className={classes.choiceOne_answers}>
                                <input className={classes.fillInTheBlank_answers} required type="text" name="right_answer" value={question.right_answer} onChange={onRgihtAnswerChangeHandler} />
                            </div>

                        </div>
                    </div>

                    :

                    <div onBlur={onSaveAnswerHandler}>
                        <h2 className={classes.question_title} >Fill The Blank</h2>
                        <div className={classes.answer_grid}>

                            <div className={classes.question_value}>
                                <input placeholder="question" type="text" name="test" value={question.question_value} readOnly={true} />
                            </div>

                            <div className={classes.whight}>
                                <input placeholder="whight" type="number" name="test" value={question.weight} readOnly={true} />
                            </div>

                            <div className={classes.choiceOne_answers}>
                                <input type="text"  className={classes.fillInTheBlank_answers}  name="answer"  onChange={onRgihtAnswerChangeHandler} required/>
                            </div>

                        </div>
                    </div>

            }

        </>
    )
}

export default FillInTheBlank;
