import React from "react";
import classes from "../../css/profile.module.css"

const Scoure = ({ scoures }) => {
    return (
        <div className={classes.scoure}>
            <h2>Your Scoures:</h2>
            <br />
            {scoures && Array.isArray(scoures) && scoures.length > 0 ?
                <table>

                </table>
                :
                <h3>Keine Scoures</h3>
            }
        </div>
    )
}

export default Scoure;