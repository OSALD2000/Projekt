import React from "react";
import classes from "./lists.module.css";

const Participants = ({ participants }) => {
    return (
        <div  className={classes.container}>
            <table className={classes.table}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Score</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {participants.map(p => {
                        return <tr key={Math.random() * 100}>
                            <td className={classes.labels}>{p.user.username}</td>
                            <td className={classes.labels}>{p.result}</td>
                            <td className={`${classes.labels} ${p.passed ? classes.ja : classes.nein}`}>{p.passed ? "Ja" : "Nein"}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>)
}


export default Participants;