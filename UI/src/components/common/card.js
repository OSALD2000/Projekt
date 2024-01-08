import React from "react";
import classes from "./card.module.css";

export const Card = ({children}) =>
    <div className={classes.card}>
        {children}
    </div>