import React from "react";

import classes from "./lists.module.css";
import { NavLink } from "react-router-dom";


const Quize = ({ admin, quize, onDeleteClick, adminView }) => {


    return (

        <div className={!adminView ? classes.quize : classes.adminView}>
            {!admin && <h2>Your Quize:</h2> &&
                <br />}
            {quize && Array.isArray(quize) && quize.length > 0 ?
                <table className={classes.table}>
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            {(adminView) && <th>Creator</th>}
                            {(adminView) && <th>Creator Email</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {quize.map(q => {
                            return <tr key={q._id}>
                                <td className={classes.labels}>{q.title}</td>
                                <td className={classes.labels}>{q.category}</td>
                                {(adminView) && <td className={classes.labels}>{q.user.username}</td>}
                                {(adminView) && <td className={classes.labels}>{q.user.email}</td>}
                                <td className={classes.action}><button className="btn"><NavLink to={!admin ? `/quiz/view-statistic/${q._id}` : `/admin/statistic/${q._id}`}>Statistik</NavLink></button></td>
                                <td className={classes.action}><button className="btn"><NavLink to={!admin ? `/user/view-quiz/${q._id}` : `/admin/user/quiz/${q.creator}/${q._id}`}>View</NavLink></button></td>
                                {(!admin || adminView) && <td className={classes.action}><button className="btn" onClick={onDeleteClick.bind(null, q._id)}>l&ouml;schen</button></td>}
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