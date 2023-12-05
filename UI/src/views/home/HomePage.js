import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useLoaderData } from "react-router";
import QuizCategory from "../../components/quiz-elements/quizCategory";
import { json } from "react-router-dom";
import { Card } from "../../components/common/card";

const Home = (props) => {
  const data = useLoaderData();
  const [searchParams, setSearchParams] = useSearchParams();
  const created = searchParams.get('successful');

  useEffect(() => {
    if (created) {
      setTimeout(() => {
        setSearchParams("");
      }, 10000)
    }
  }, [created, setSearchParams]);

  return (
    <>
      {created && <h2 className="successText">Quiz Created </h2>}

      <Card>
        {data ? data.map(category => <QuizCategory key={category} title={category} id={category} />) : <h1>Kein Quizs</h1>}
      </Card>

    </>
  );
};

export default Home;



export const loader = async () => {
  const response = await fetch("http://localhost:8080/loader/categorys");


  if (response.status === 442 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user" }, { status: 500 });
  }

  const { categotys } = await response.json();

  return categotys;
}
