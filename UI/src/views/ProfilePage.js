import React, { useState } from "react";
import { getAuthToken } from "./auth/auth";
import { redirect, useLoaderData, json } from "react-router";
import Daten from "../components/profile/daten";
import Quize from "../components/profile/quize";
import Scoure from "../components/profile/scoure";
import classes from "../css/profile.module.css";

const ProfilePage = () => {
    const data = useLoaderData();
    const [loader, setLoader] = useState(false);

    const onDeleteClickHandler = async (id) => {
        const token = getAuthToken();

        if (!token) {
            return redirect("/auth/signin");
        }

        setLoader(true);

        const response = await fetch("http://localhost:8080/quiz/delete/" + id, {
            method: "delete",
            headers: {
                'authorization': token.toString(),
                'Content-Type': 'application/json'
            }
        });


        if (response.status === 401) {
            return redirect('/auth/signin?mode=login')
        }

        setLoader(false);
    }


    return (
        <div className={classes.continer}>
            <h1>Profile Page</h1>
            <Daten username={data.username} email={data.email} id={data.id} />
            <div className={classes.quize}>
                {loader && <div className={classes.center}><div className={classes["lds-dual-ring"]}></div></div>}
                {!loader && <Quize quize={data.quize} setLoader={setLoader} onDeleteClick={onDeleteClickHandler} />}
            </div>
            <Scoure />
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

    console.log(daten);

    return daten;
}

export default ProfilePage;