import React, { useEffect, useState } from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useLoaderData, json, redirect, useNavigate } from "react-router";
import { Card } from "../../components/common/card";
import Quiz from "../../components/quiz-elements/quiz";
import { getAuthToken } from "../auth/auth";

import classes from "../../css/quizpage.module.css";

const QuizePage = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState({
        status: false,
        value: ""
    });
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    const quize = useLoaderData();
    
    useEffect(() => {
        if (search.status) {
            setLoader(true);

            searchQuize(quize.category, search.value).then(
                (result) => {
                    if (result === 401) {
                        navigate('/auth/signin?mode=login');
                    } else if (!result) {
                        setData("try again");
                    } else {
                        setData(result);
                    }
                }
            ).then(() => {
                setLoader(false);
            });
        }
    }, [search])

    const onSearchInputChangeHandler = (event) => {
        if (event.target.value.trim() === "") {
            setSearch({
                status: false,
                value: ""
            })
        } else {
            setSearch({
                status: true,
                value: event.target.value
            })
        }
    }
    return (
        <>
            <div className={classes.search}>
                <InputGroup size="lg" className="mb-3">
                    <InputGroup.Text id="inputGroup-sizing-sm">Suche </InputGroup.Text>
                    <Form.Control
                        aria-label="Large"
                        aria-describedby="inputGroup-sizing-sm"
                        onChange={onSearchInputChangeHandler}
                    />
                </InputGroup>
            </div>

            <h1 className={classes.title}>{quize.category}</h1>
            <Card>

                {

                    loader ?

                        <div className={classes.center}><div className={classes["lds-dual-ring"]}></div></div>

                        :

                        (

                            !search.status ?

                                (Array.isArray(quize.data) ? quize.data.map(quiz => <Quiz key={quiz._id} title={quiz.title} beschreibung={quiz.beschreibung} quizId={quiz._id} />) : quize.message)

                                :

                                (Array.isArray(data) ? data.map(quiz => <Quiz key={quiz._id} title={quiz.title} beschreibung={quiz.beschreibung} quizId={quiz._id} />) : data)
                        )
                }
            </Card>
        </>
    )
}

const searchQuize = async (category, arg) => {
    const token = getAuthToken();
    const url = `http://localhost:8080/loader/search/quizes/${category}/${arg}`

    const response = await fetch(url, {
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 401) {
        return 401;
    }

    if (!response.ok) {
        return false;
    }

    const data = await response.json();

    if (data.quize.length === 0) {
        return data.message;
    }

    return data.quize
}



export const loader = async ({ params }) => {
    const token = getAuthToken();
    const category = params.category;

    const response = await fetch("http://localhost:8080/loader/quizes/" + category, {
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
    });

    if (response.status === 401) {
        return redirect('/auth/signin?mode=login')
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const data = await response.json();

    if (data.quize.length === 0) {
        return { message: data.message, category: category };
    }

    return { data: data.quize, category: category }
}


export default QuizePage;
