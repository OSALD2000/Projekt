import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./lists.module.css";

const Users = ({ onDeleteHandler, useres }) => {
    return (<>  {Array.isArray(useres) && useres.length !== 0 && useres.map(user => {
        return (
            <div key={user._id} className={classes.container}>
                <div className={`${classes.user}`}>
                    <span>
                        {user._id}
                    </span>
                    <span>
                        {user.username}
                    </span>
                    <span>
                        {user.email}
                    </span>
                </div>
                <div className={classes.user_action}>
                    <button className="btn">
                        <NavLink to={"/admin/user/profile/" + user._id}>view Profile</NavLink>
                    </button>
                    <button onClick={onDeleteHandler.bind(null, user._id)} className="btn">
                        delete
                    </button>
                </div>
            </div>)
    }
    )}</>);
}

export default Users;