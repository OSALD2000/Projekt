import React from "react";
import Accordion from 'react-bootstrap/Accordion';
import classes from "../../css/controlePanel.module.css"
import { getAuthToken } from "../auth/auth";
import { json, redirect, useLoaderData } from "react-router";
import { NavLink } from "react-router-dom";

const ControlPanel = () => {
    const { useres, quizes } = useLoaderData();
    return (
        <div className={classes.card}>
            <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
                <Accordion.Item className="accordion_item" eventKey="0">
                    <Accordion.Header className="accordion_header">Users</Accordion.Header>
                    <Accordion.Body className="accordion_body">
                        {
                            Array.isArray(useres) && useres.length !== 0 && useres.map(user => {
                                return (
                                    <div key={user._id}  className={classes.container}>
                                        <div className={classes.user}>
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
                                        <div className={classes.action}>
                                            <button className="btn">
                                                <NavLink to={"/admin/user/profile/"+user._id}>view Profile</NavLink>
                                            </button>
                                            <button className="btn">
                                                delete
                                            </button>
                                        </div>
                                    </div>)
                            })
                        }
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item className="accordion_item" eventKey="1">
                    <Accordion.Header className="accordion_header">Quize</Accordion.Header>
                    <Accordion.Body className="accordion_body">
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </div>
    )
}

export const loader = async () => {
    const token = getAuthToken();
    const url = `http://localhost:8080/admin/controlerPanel/data`

    const response = await fetch(url, {
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 401) {
        return redirect("/auth/signin");
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const data = await response.json();

    console.log(data);
    return data
}

export default ControlPanel;