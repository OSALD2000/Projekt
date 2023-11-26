import React, { useState } from "react";
import classes from "../quiz.module.css";


const TrueOrFalse = (props) => {
    const [changed, setChanged] = useState(false);
    const [question, setQuestion] = useState(props.question);


    const onQuestionChangeHandler = (event) => {
        setQuestion(curent => {
            return { ...curent, question_value: event.target.value }
        });
        setChanged(true);
    }

    const onWeightChangeHandler = (event) => {
        setQuestion(curent => {
            return { ...curent, weight: event.target.value }
        });
        setChanged(true);
    }

    const onRgihtAnswerChangeHandler = (answer, event) => {
        setQuestion(curent => {
            return {
                ...curent, right_answer: answer
            }
        });
        setChanged(true);
    }

    const saveChangesHandler = (event) => {
        event.preventDefault();

        props.onUpdate(question);
    }

    return (
        <>
            {
                props.create

                    ?

                    <form onSubmit={saveChangesHandler}>
                        <h2 className={classes.question_title} >True Or False</h2>
                        <div className={classes.choiceOne_grid}>

                            <div className={classes.question_value}>
                                <input placeholder="question" type="text" name="test" value={question.question_value} onChange={onQuestionChangeHandler} required />
                            </div>

                            <div className={classes.whight}>
                                <input placeholder="whight" type="text" name="test" value={question.weight} onChange={onWeightChangeHandler} required />
                            </div>

                            <div className={classes.choiceOne_action}>
                                <button type="submit" className={`btn`} disabled={!changed}>Save</button>
                                <button type="button" className="btn" onClick={props.onDeleteQuestion}>delete</button>
                            </div>
                            <div className={classes.choiceOne_answers}>

                                <div className={classes.choiceOne_answers_item}>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="right_answer" value={true} checked={question.right_answer ? true : false} onChange={onRgihtAnswerChangeHandler.bind(null, true)} />
                                        </div>
                                    </div>
                                    <label required type="text" name="test" value="Richtig" >Richtig</label>
                                </div>

                                <div className={classes.choiceOne_answers_item}>
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name="right_answer" value={false} checked={question.right_answer ? false : true} onChange={onRgihtAnswerChangeHandler.bind(null, false)} />
                                        </div>
                                    </div>
                                    <label required type="text" name="test" value="Falsch" >Falsch</label>
                                </div>

                            </div>

                        </div>
                    </form>

                    :

                    <h1>answer</h1>

            }

        </>
    )
}

export default TrueOrFalse;
