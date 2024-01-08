import React from "react";
import classes from "./quiz.module.css";


const QuizCart = ({children}) => {
    return (<div className={classes["quiz-card"]}>
        {children}
    </div>)

}

export default QuizCart;