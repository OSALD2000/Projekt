import React from "react";
import { useLoaderData } from "react-router";
import QuizCategory from "../components/quiz-elements/quizCategory";
import { json } from "react-router-dom";
import classes from "../css/homepage.module.css";

const Home = (props) => {
  const data = useLoaderData();
  return (
    <div className={classes.card}>
      {data ? data.map(category => <QuizCategory key={category} title={category} id={category}/>) :<h1>Kein Quizs</h1>}
    </div>
  );
};

export default Home;



export const loader = async () =>{
  const response = await fetch("http://localhost:8080/categorys");


  if (response.status === 442 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const {categotys} = await response.json();

  return categotys;
}
