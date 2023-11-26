import React, {useState } from "react";
import classes from "../quiz.module.css";


const ChoiceOne = (props) => {
    const [changed, setChanged] = useState(false);
    const [question, setQuestion] = useState(props.question);

    const [id, setId] = useState(() => {
        if (props.question.answers.length === 0) { return 1 }
        else
            return props.question.answers.sort((a, b) => a.id - b.id)[props.question.answers.length - 1].id + 1
    });


    const addAnswer = () => {
        setQuestion(curent => {
            return { ...curent, answers: [...curent.answers, { id: id, value: "" }] }
        });
        setId(curent => curent + 1);
        setChanged(true);
    }

    const deleteAnswer = (id, event) => {
        setQuestion(curent => {
            return { ...curent, answers: [...curent.answers.filter(a => a.id !== id)] }
        });
        setChanged(true);
    }

    const onAnswerUpdate = (id, event) => {
        setQuestion(curent => {
            return {
                ...curent, answers: [...curent.answers.filter(a => a.id !== id), {
                    id: id,
                    value: event.target.value,
                }
                ]
            }
        });
        setChanged(true);
    }


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

    const onRgihtAnswerChangeHandler = (id, event) => {
        setQuestion(curent => {
            return {
                ...curent, right_answer: {
                    id: id,
                }
            }
        });
        setChanged(true);
    }

    const saveChangesHandler = (event) => {
        event.preventDefault();

        if (question.answers.length < 2) {
            alert('geben sie mind. sie anwers ein!');
            return;
        }

        const right_answer = question.answers.filter(a => a.id === parseInt(question.right_answer.id));

        if (right_answer.length === 0) {
            alert('geben sie mind. eine richtge anwer ein!');
            return;
        }

        question.right_answer = right_answer[0];

        props.onUpdate(question);
    }

    return (
        <>
            {
                props.create

                    ?

                    <form onSubmit={saveChangesHandler}>
                        <h2 className={classes.question_title} >Choice One</h2>
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
                                {question.answers.sort((a, b) => a.id - b.id).map(a =>
                                    <div key={a.id} id={a.id} className={classes.choiceOne_answers_item}>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="radio" name="right_answer" value={a.id} checked={question.right_answer.id === a.id} onChange={onRgihtAnswerChangeHandler.bind(null, a.id)} />
                                            </div>
                                        </div>
                                        <input required type="text" name="test" value={a.value} onChange={onAnswerUpdate.bind(null, a.id)} />
                                        <div className="input-group-append">
                                            <button type="button" className="btn delete" onClick={deleteAnswer.bind(null, a.id)}>X</button>
                                        </div>
                                    </div>)}
                            </div>
                            <button type="button" className={`btn ${classes.add_choiceOne}`} onClick={addAnswer}>Add Answer</button>

                        </div>
                    </form>

                    :

                    <h1>answer</h1>

            }

        </>
    )
}

export default ChoiceOne;
