import React, { useState } from "react";
import classes from "../quiz.module.css";


const TrueOrFalse = ({question:init_question, onUpdate, create, onDeleteQuestion}) => {
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

    const onRgihtAnswerChangeHandler = (answer, event) => {
        setQuestion(curent => {
            return {
                ...curent, right_answer: answer
            }
        });
    }

    const saveChangesHandler = (event) => {
        onUpdate(question);
    }

    const onAnswerUpdate = (event) => {
        setAnswer(curent => {
            return { ...curent, answer: event.target.value === 'true' ? true : false }
        })
    }

    const saveAnswersHandler = () => {
        onUpdate(answer);
    }

    return (
        <>
            {
                create

                    ?

                    <div onBlur={saveChangesHandler}>
                        <h2 className={classes.question_title} >True Or False</h2>
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

                                <div className={classes.choiceOne_answers_item}>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name={question.id} value={true} checked={question.right_answer ? true : false} onChange={onRgihtAnswerChangeHandler.bind(null, true)} />
                                        </div>
                                    </div>
                                    <label required type="text" name="test" value="Richtig" >Richtig</label>
                                </div>

                                <div className={classes.choiceOne_answers_item}>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name={question.id} value={false} checked={question.right_answer ? false : true} onChange={onRgihtAnswerChangeHandler.bind(null, false)} />
                                        </div>
                                    </div>
                                    <label required type="text" name="test" value="Falsch" >Falsch</label>
                                </div>

                            </div>

                        </div>
                    </div>

                    :

                    <div onBlur={saveAnswersHandler}>
                        <h2 className={classes.question_title} >True Or False</h2>
                        <div className={classes.answer_grid}>

                            <div className={classes.question_value}>
                                <input placeholder="question" type="text" name="test" value={question.question_value} disabled={true} />
                            </div>

                            <div className={classes.whight}>
                                <input placeholder="whight" type="text" name="test" value={question.weight} onChange={onWeightChangeHandler} disabled={true} />
                            </div>

                            <div className={classes.choiceOne_answers}>

                                <div className={classes.choiceOne_answers_item}>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name={question.id} value={true} onClick={onAnswerUpdate} />
                                        </div>
                                    </div>
                                    <label type="text" name="test" value="Richtig" >Richtig</label>
                                </div>

                                <div className={classes.choiceOne_answers_item}>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name={question.id} value={false} onClick={onAnswerUpdate} />
                                        </div>
                                    </div>
                                    <label type="text" name="test" value="Falsch" >Falsch</label>
                                </div>

                            </div>
                        </div>
                    </div>


            }

        </>
    )
}

export default TrueOrFalse;
