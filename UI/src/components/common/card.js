import React from "react";
import classes from "./card.module.css";

export const Card = (props) =>
    <div className={classes.card}>
        {props.children}
    </div>