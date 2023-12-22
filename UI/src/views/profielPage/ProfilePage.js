import React, { useEffect, useState } from "react";
import { redirect, useLoaderData, json } from "react-router";
import Daten from "../../components/profile/daten";
import Quize from "../../components/common/lists/quize";
import Scoure from "../../components/common/lists/scoure";
import classes from "../../css/profile.module.css";
import { useNavigate } from "react-router";
import { fetch_function } from "../../util/fetch_function";

const ProfilePage = () => {
    const data = useLoaderData();
    const navigate = useNavigate();

    const [deleteQuiz, setDeleteQuiz] = useState({
        delete: false,
        id: "",
    });

    const onDeleteClickHandler = (id) => {
        setDeleteQuiz({
            delete: true,
            id: id,
        })
    }

    useEffect(() => {
        if (deleteQuiz.delete && deleteQuiz.id !== "") {

            const url = `quiz/delete/${deleteQuiz.id}`;

            fetch_function(url, 'delete').then(response => {
                if (response.status === 401) {
                    return redirect('/auth/signin?mode=login')
                }
                navigate(0);
            });
        }
    }, [deleteQuiz.delete, deleteQuiz.id, navigate])

    return (
        <div className={classes.continer}>
            <h1>Profile Page</h1>
            <Daten username={data.username} email={data.email} id={data.id} />
            {deleteQuiz.delete && <div className={classes.center}><div className={classes["lds-dual-ring"]}></div></div>}
            {!deleteQuiz.delete && <Quize admin={data.admin} quize={data.quize} onDeleteClick={onDeleteClickHandler} />}
            <Scoure admin={data.admin} scoures={data.scoures} />
        </div>
    );
}

export const loader = async () => {
    const url =  `user/profile/daten`;
    const response = await fetch_function(url, 'get');
   
    if (response.status === 401) {
        return redirect('/auth/signin?mode=login')
    }

    if (!response.ok) {
        throw json({ message: "Could not authenticate user" }, { status: 500 });
    }

    const { daten } = await response.json();

    return daten;
}

export default ProfilePage;