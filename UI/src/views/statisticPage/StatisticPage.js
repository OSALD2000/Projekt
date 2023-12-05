import React from "react";
import { getAuthToken } from "../auth/auth";
import { json, redirect, useLoaderData } from "react-router";
import { Bar, Doughnut } from "react-chartjs-2";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';

import classes from "../../css/statisticPage.module.css";

const StatisticPage = (props) => {
    const loader = useLoaderData();

    const infos = [
        { title: "Anzahl Teilnehmer", value: loader.participants },

        { title: "Durchschnit", value: (loader.average_scoure * 100) + "%" },

        { title: "Bestanden", value: loader.success_Participants },

        { title: "Durchfallen", value: loader.failed_Participants },

    ]
    return (
        <div className={classes.continer}>
            <div className={classes.bar}>
                <Bar data={loader.chart_bar_data.data} />
            </div>

            <div className={classes.doughnut}>
                <Doughnut data={loader.chart_doughnut_data} />
            </div>
            <div className={classes.infos}>
                {infos.map(info =>
                    <div className={classes.info} key={info.title}>
                        <InputGroup size="lg" className="mb-3">
                            <InputGroup.Text id="inputGroup-sizing-sm">{info.title}</InputGroup.Text>
                            <Form.Control
                                aria-label="Large"
                                aria-describedby="inputGroup-sizing-sm"
                                value={info.value}
                                readOnly={true}
                            />
                        </InputGroup>
                    </div>
                )}
            </div>
        </div>
    )
}



export const loader = async ({ params }) => {
    const quizId = params.quizId;
    const token = getAuthToken();

    if (!token) {
        return redirect('/auth/signin?mode=login')
    }

    const response = await fetch("http://localhost:8080/statistics/info/charts/" + quizId, {
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
    })

    if (response.status === 401) {
        return redirect('/auth/signin?mode=login')
    }

    if (response.status === 442) {
        return redirect('/quiz/answerQuiz/' + quizId);
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const { data } = await response.json();


    const data_doughnut = JSON.parse(data.chart_doughnut_data);
    const data_bar = JSON.parse(data.chart_bar_data);

    const parsed_data = { ...data, chart_doughnut_data: data_doughnut, chart_bar_data: data_bar }

    console.log(parsed_data);

    return parsed_data;
}

export default StatisticPage;

