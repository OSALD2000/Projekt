import React, { useState } from "react";
import classes from "../quiz.module.css";


const FillInTheBlank = (props) => {
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

    const onRgihtAnswerChangeHandler = (event) => {
        setQuestion(curent => {
            return {
                ...curent, right_answer: event.target.value
            }
        });
        setChanged(true);
    }

    const saveChangesHandler = (event) => {
        event.preventDefault();
        if (question.right_answer.trim() === "") {
            alert("bitte geben Sie ein richtiges Answer ein!!");
        }
        props.onUpdate(question);
    }

    return (
        <>
            {
                props.create

                    ?

                    <form onSubmit={saveChangesHandler}>
                        <h2 className={classes.question_title} >Fill The Blank</h2>
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
                                <input className={classes.fillInTheBlank_answers} required type="text" name="right_answer" value={question.right_answer} onChange={onRgihtAnswerChangeHandler} />
                            </div>

                        </div>
                    </form>

                    :

                    <h1>answer</h1>

            }

        </>
    )
}

export default FillInTheBlank;
