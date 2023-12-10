import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import classes from "../../css/controlePanel.module.css"
import { getAuthToken } from "../auth/auth";
import { json, redirect, useLoaderData, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { deleteUser } from "./admin_actions";

const ControlPanel = () => {
    const { useres, quizes } = useLoaderData();
    const navigate = useNavigate();

    const [message, setMessage] = useState({
        show: false,
        value: ""
    });

    useEffect(() => {
        if (message.show) {
            setTimeout(() => {
                setMessage({
                    show: false,
                    value: ""
                });
                navigate(0);
            }, 9000);
        }
    }, [message]);

    const onDeleteHandler = async (id) => {
        const respone = await deleteUser(id);
        if (respone) {
            setMessage({
                show: true,
                value: respone,
            });
        }
    }
    return (
        <div className={classes.card}>
            {message.show && <div className="successText">{message.value}</div>}

            <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
                <Accordion.Item className="accordion_item" eventKey="0">
                    <Accordion.Header className="accordion_header">Users</Accordion.Header>
                    <Accordion.Body className="accordion_body">
                        <>
                            <div className={classes.search}>
                                <InputGroup size="lg" className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-sm">Suche</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup>
                            </div>
                            {Array.isArray(useres) && useres.length !== 0 && useres.map(user => {
                                return (
                                    <div key={user._id} className={classes.container}>
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
                                                <NavLink to={"/admin/user/profile/" + user._id}>view Profile</NavLink>
                                            </button>
                                            <button onClick={onDeleteHandler.bind(null, user._id)} className="btn">
                                                delete
                                            </button>
                                        </div>
                                    </div>)
                            }
                            )}</>

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