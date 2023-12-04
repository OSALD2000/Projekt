import React from "react";
import QUESTIONTYPE from "../../../util/enum/QUESTIONTYPE";
import classes from "./show_result.module.css";

const QuestionResult = ({ question_value, weight, category, answer, is_right, right_answer }) => {

    return (
        <div>
            <h2 className={classes.question_category} >{category}</h2>
            <div className={classes.question_grid}>

                <div className={classes.question_value}>
                    <input placeholder="question" type="text" name="test" value={question_value} readOnly={true} />
                </div>

                <div className={classes.whight}>
                    <input placeholder="whight" type="number" name="test" value={weight} readOnly={true} />
                </div>

                <div className={`${classes.answer} ${is_right ? classes.true : classes.false}`}>
                    <h2>Participant Answer</h2>
                    {
                        category === QUESTIONTYPE.MULTIPLECHOICE
                            ?
                            answer.split(',').map(mu_a => <input key={Math.random() * 1000} type="text" className={classes.show_answer_fild} value={mu_a} name="answer" readOnly={true} />
                            )
                            :
                            <input type="text" className={classes.show_answer_fild} value={answer} name="answer" readOnly={true} />
                    }
                </div>
                {!is_right &&   
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
                }
            </div>
        </div>);
}

export default QuestionResult;