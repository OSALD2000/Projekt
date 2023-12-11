import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import classes from "../../css/controlePanel.module.css"
import { getAuthToken } from "../auth/auth";
import { json, redirect, useLoaderData, useNavigate } from "react-router";
import { deleteUser, deleteQuiz } from "./admin_actions";
import Quize from "../../components/common/lists/quize";
import Users from "../../components/common/lists/users";

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
            }, 3000);
        }
    }, [message, navigate]);

    const onDeleteUserHandler = async (id) => {
        const respone = await deleteUser(id);
        if (respone) {
            setMessage({
                show: true,
                value: respone,
            });
        }
    }

    const onDeleteQuizHandler = async (id) => {
        const respone = await deleteQuiz(id);
        if (respone) {
            setMessage({
                show: true,
                value: respone,
            });
        }
    }
    return (
        <>
            {message.show && <div className="successText">{message.value}</div>}
            <div className={classes.card}>
                <Accordion defaultActiveKey={['0', '1', '2']} alwaysOpen>
                    <Accordion.Item className="accordion_item" eventKey="0">
                        <Accordion.Header className="accordion_header">Users</Accordion.Header>
                        <Accordion.Body className="accordion_body">
                                <div className={classes.search}>
                                    <InputGroup size="lg" className="mb-3">
                                        <InputGroup.Text id="inputGroup-sizing-sm">Suche</InputGroup.Text>
                                        <Form.Control
                                            aria-label="Large"
                                            aria-describedby="inputGroup-sizing-sm"
                                        />
                                    </InputGroup>
                                </div>
                                <Users onDeleteHandler={onDeleteUserHandler} useres={useres} />
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className="accordion_item" eventKey="1">
                        <Accordion.Header className="accordion_header">Quize</Accordion.Header>
                        <Accordion.Body className="accordion_body">
                            <div className={classes.search}>
                                <InputGroup size="lg" className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-sm">Suche</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                    />
                                </InputGroup>
                            </div>
                            <Quize adminView={true} onDeleteClick={onDeleteQuizHandler} quize={quizes} />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
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