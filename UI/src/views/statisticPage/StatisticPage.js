import React from "react";
import { json, redirect, useLoaderData } from "react-router";
import { Bar, Doughnut } from "react-chartjs-2";
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Participants from "../../components/common/lists/participants";
import { fetch_function } from "../../util/fetch_function";
import classes from "../../css/statisticPage.module.css";

const StatisticPage = () => {
    const data = useLoaderData();
    const { parsed_statistic: statistic, participants } = data;

    const infos = [
        { title: "Anzahl Teilnehmer", value: statistic.participants },

        { title: "Durchschnit", value: (statistic.average_scoure * 100) + "%" },

        { title: "Bestanden", value: statistic.success_Participants },

        { title: "Durchfallen", value: statistic.failed_Participants },

    ]
    return (
        <div className={classes.continer}>
            <div className={classes.bar}>
                <Bar data={statistic.chart_bar_data.data} />
            </div>

            <div className={classes.doughnut}>
                <Doughnut data={statistic.chart_doughnut_data} />
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
            {Array.isArray(participants) && participants.length !== 0 &&
            <div className={classes.participants}>
                    <Participants participants={participants} />
            </div>
            }
        </div>
    )
}



export const loader = async ({ params }) => {
    const quizId = params.quizId;

    const url = `statistics/info/charts/${quizId}`;
    const response = await fetch_function(url, 'get');

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

    const { statistic, participants } = data;

    const data_doughnut = JSON.parse(statistic.chart_doughnut_data);
    const data_bar = JSON.parse(statistic.chart_bar_data);

    const parsed_statistic = { ...statistic, chart_doughnut_data: data_doughnut, chart_bar_data: data_bar }
    return { participants, parsed_statistic };
}

export default StatisticPage;

