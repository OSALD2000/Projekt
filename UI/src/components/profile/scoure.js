import React from "react";
import classes from "../../css/profile.module.css"
import { NavLink } from "react-router-dom";

const Scoure = ({ scoures }) => {
    
    return (
        <div className={classes.scoure}>
            <h2>Your Scoures:</h2>
            <br />
            {scoures && Array.isArray(scoures) && scoures.length > 0 ?
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Quiz Title</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scoures.map(scoure => {
                            return <tr key={scoure._id}>
                                <td className={classes.labels}>{scoure.quiz_title}</td>
                                <td className={classes.labels}>{scoure.result}</td>
                                <td className={classes.action}><button className="btn"><NavLink to={`/quiz/view-statistic/${scoure.quizId}`}>Statistik</NavLink></button></td>
                                <td className={classes.action}><button className="btn" type="button"><NavLink to={`/quiz/view-answers/${scoure.quizId}`}>meine Antwort</NavLink></button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                : <h2>Keine Quizee</h2>
            }
        </div>
    )
}

export default Scoure;