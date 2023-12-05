import React from "react";

import classes from "../../css/profile.module.css"
import { NavLink } from "react-router-dom";


const Quize = ({ quize, onDeleteClick  }) => {

 
    return (

        <div>

            <h2>Your Quize:</h2>
            <br />
            {quize && Array.isArray(quize) && quize.length > 0 ?
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>visibility</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quize.map(q => {
                            return <tr key={q._id}>
                                <td className={classes.labels}>{q.title}</td>
                                <td className={classes.labels}>{q.category}</td>
                                <td className={classes.labels}>{q.visibility ? "Public" : "Private"}</td>
                                <td className={classes.action}><button className="btn"><NavLink to={`/quiz/view-statistic/${q._id}`}>Statistik</NavLink></button></td>
                                <td className={classes.action}><button className="btn" onClick={onDeleteClick.bind(null, q._id)}>l&ouml;schen</button></td>
                            </tr>
                        })}
                    </tbody>
                </table>
                : <h2>Keine Quizee</h2>

            }
        </div>

    )
}


export default Quize;