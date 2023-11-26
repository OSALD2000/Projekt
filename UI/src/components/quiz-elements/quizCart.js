import React from "react";
import classes from "./quiz.module.css";


const QuizCart = (props) => {
    return (<div className={classes["quiz-card"]}>
        {props.children}
    </div>)

}

export default QuizCart;