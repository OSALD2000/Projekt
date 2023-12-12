import React, { useState } from "react";
import classes from "../quiz.module.css";


const ChoiceOne = (props) => {

    const [question, setQuestion] = useState(props.question);

    const [answer, setAnswer] = useState({
        category: props.question.category,
        questionId: props.question.questionId,
        answer: "",
    })

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
    }

    const deleteAnswer = (id, event) => {
        setQuestion(curent => {
            return { ...curent, answers: [...curent.answers.filter(a => a.id !== id)] }
        });
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
    }


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

    const onRgihtAnswerChangeHandler = (id, event) => {
        setQuestion(curent => {
            return {
                ...curent, right_answer: {
                    id: id,
                }
            }
        });
    }

    const saveChangesHandler = (event) => {

        if (question.right_answer) {

            const right_answer = question.answers.filter(a => a.id === parseInt(question.right_answer.id));

            question.right_answer = right_answer[0];
        }

        props.onUpdate(question);
    }



    const onAnswerHandler = (id, event) => {
        const selected_answer = question.answers.filter(a => a.id === id)[0];

        setAnswer(curent => {
            return {
                ...curent,
                answer: selected_answer.value,
            }
        })
    }

    const onSaveAnswerHandler = () =>{
        props.onUpdate(answer);
    }

    return (
        <>
            {
                props.create

                    ?

                    <div onBlur={saveChangesHandler}>
                        <h2 className={classes.question_title} >Choice One</h2>
                        <div className={classes.choiceOne_grid}>

                            <div className={classes.question_value}>
                                <input placeholder="question" type="text" name="test" value={question.question_value} onChange={onQuestionChangeHandler} required />
                            </div>

                            <div className={classes.whight}>
                                <input placeholder="whight" type="number" name="test" value={question.weight} onChange={onWeightChangeHandler} required />
                            </div>

                            <div className={classes.choiceOne_action}>
                                <button type="button" className="btn" onClick={props.onDeleteQuestion}>delete</button>
                            </div>
                            <div className={classes.choiceOne_answers}>
                                {question.answers.sort((a, b) => a.id - b.id).map(a =>
                                    <div key={a.id} id={a.id} className={classes.choiceOne_answers_item}>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="radio" name={question.id} value={a.id} checked={question.right_answer ? question.right_answer.id === a.id : false} onChange={onRgihtAnswerChangeHandler.bind(null, a.id)} />
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
                    </div>

                    :

                    <div onBlur={onSaveAnswerHandler}>
                        <h2 className={classes.question_title} >Choice One</h2>
                        <div className={classes.answer_grid}>

                            <div className={classes.question_value}>
                                <input placeholder="question" type="text" name="test" value={question.question_value} readOnly={true}/>
                            </div>

                            <div className={classes.whight}>
                                <input placeholder="whight" type="number" name="test" value={question.weight}  readOnly={true}/>
                            </div>

                            <div className={classes.choiceOne_answers}>
                                {question.answers.sort((a, b) => a.id - b.id).map(a =>
                                    <div key={a.id} id={a.id} className={classes.choiceOne_answers_item}>
                                        <div className="input-group-prepend">
                                            <div className="input-group-text">
                                                <input type="radio" name={question.id}  onChange={onAnswerHandler.bind(null, a.id)} />
                                            </div>
                                        </div>
                                        <input required type="text" name="test" value={a.value} readOnly={true} />
                                    </div>)}
                            </div>
                    
                        </div>
                    </div>

            }

        </>
    )
}

export default ChoiceOne;
