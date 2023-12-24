import React, { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { json, redirect, useLoaderData, useNavigate } from "react-router";
import { deleteUser, deleteQuiz } from "./admin_actions";
import Quize from "../../components/common/lists/quize";
import Users from "../../components/common/lists/users";
import useSearch from "../../util/hooks/use-search";
import { searchQuize, searchUsers } from "./admin_loaders";
import { fetch_function } from "../../util/fetch_function";
import classes from "../../css/controlePanel.module.css"

const ControlPanel = () => {
    const { useres, quizes:{rows: quizes} } = useLoaderData();

    const {
        onSearchInputChangeHandler: onSearchInputChangeHandlerUser,
        loader: loaderUser,
        data: dataUser,
        search: searchUser
    } = useSearch(searchUsers);

    const {
        onSearchInputChangeHandler: onSearchInputChangeHandlerQuiz,
        loader: loaderQuiz,
        data: dataQuiz,
        search: searchQuiz
    } = useSearch(searchQuize);


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
                    <Accordion.Item className={`${classes["accordion_item"]} accordion_item` }eventKey="0">
                        <Accordion.Header className="accordion_header">Users</Accordion.Header>
                        <Accordion.Body className="accordion_body">
                            <div className={classes.search}>
                                <InputGroup size="lg" className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-sm">Suche Email</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onSearchInputChangeHandlerUser}
                                    />
                                </InputGroup>
                            </div>
                            {
                                loaderUser ?

                                    <div className={classes.center}><div className={classes["lds-dual-ring"]}></div></div>

                                    :
                                    !searchUser.status ?
                                        <Users onDeleteHandler={onDeleteUserHandler} useres={useres} />
                                        :
                                        (Array.isArray(dataUser) ? <Users onDeleteHandler={onDeleteUserHandler} useres={dataUser} /> : <div className={classes.searchMessage}>{dataUser}</div>)
                            }

                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item className="accordion_item" eventKey="1">
                        <Accordion.Header className="accordion_header">Quize</Accordion.Header>
                        <Accordion.Body className="accordion_body">
                            <div className={classes.search}>
                                <InputGroup size="lg" className="mb-3">
                                    <InputGroup.Text id="inputGroup-sizing-sm">Suche Title</InputGroup.Text>
                                    <Form.Control
                                        aria-label="Large"
                                        aria-describedby="inputGroup-sizing-sm"
                                        onChange={onSearchInputChangeHandlerQuiz}
                                    />
                                </InputGroup>
                            </div>
                            {

                                loaderQuiz ?

                                    <div className={classes.center}><div className={classes["lds-dual-ring"]}></div></div>

                                    :

                                    !searchQuiz.status ?
                                        <Quize admin={true} adminView={true} onDeleteClick={onDeleteQuizHandler} quize={quizes} />
                                        :
                                        (Array.isArray(dataQuiz) ? <Quize admin={true} adminView={true} onDeleteClick={onDeleteQuizHandler} quize={dataQuiz} /> : <div className={classes.searchMessage}>{dataQuiz}</div>)
                            }

                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>
        </>
    )
}

export const loader = async () => {
    const url = `admin/controlerPanel/data`

    const response = await fetch_function(url, 'get');

    if (response.status === 401) {
        return redirect("/auth/signin");
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const data = await response.json();

    return data
}

export default ControlPanel;