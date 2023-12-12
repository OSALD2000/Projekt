import React from "react";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import { useLoaderData, json, redirect } from "react-router";
import { Card } from "../../components/common/card";
import Quiz from "../../components/quiz-elements/quiz";
import useSearch from "../../util/hooks/use-search";
import { fetch_function } from "../../util/fetch_function";
import classes from "../../css/quizpage.module.css";

const QuizePage = () => {

    const quize = useLoaderData();
    const {onSearchInputChangeHandler, loader, data, search} = useSearch(searchQuize.bind(null, quize.category));

    
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

    const url = `loader/search/quizes/${category}/${arg}`
    const response = await fetch_function(url, 'get');

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
    const category = params.category;
    
    const url = `loader/quizes/${category}`;
    const response = await fetch_function(url, 'get');

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
