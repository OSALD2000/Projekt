import React, { useEffect, useState } from "react";
import { getAuthToken } from "../auth/auth";
import { redirect, useLoaderData, json } from "react-router";
import Daten from "../../components/profile/daten";
import Quize from "../../components/profile/quize";
import Scoure from "../../components/profile/scoure";
import classes from "../../css/profile.module.css";
import { useNavigate } from "react-router";

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
            const token = getAuthToken();

            if (!token) {
                return redirect("/auth/signin");
            }
            
            const url = `http://localhost:8080/quiz/delete/${deleteQuiz.id}`;
            console.log(url);
            fetch(url, {
                method: "delete",
                headers: {
                    'authorization': token.toString(),
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.status === 401) {
                    return redirect('/auth/signin?mode=login')
                }
                navigate(0);
            });
        }
    }, [deleteQuiz.delete, deleteQuiz.id])


    return (
        <div className={classes.continer}>
            <h1>Profile Page</h1>
            <Daten username={data.username} email={data.email} id={data.id} />
            <div className={classes.quize}>
                {deleteQuiz.delete && <div className={classes.center}><div className={classes["lds-dual-ring"]}></div></div>}
                {!deleteQuiz.delete && <Quize quize={data.quize} onDeleteClick={onDeleteClickHandler} />}
            </div>
            <Scoure scoures={data.scoures}/>
        </div>
    );
}

export const loader = async () => {
    const token = getAuthToken();

    if (!token) {
        return redirect("/auth/signin");
    }

    const response = await fetch("http://localhost:8080/user/profile/daten", {
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        }
    });


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