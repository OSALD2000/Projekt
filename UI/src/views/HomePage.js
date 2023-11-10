import React from "react";
import { NavLink } from "react-router-dom";

const Home = (props) => {
  const loguthandler = () => {
    localStorage.clear();
  };

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "10%" }}>
        Erfolgreich Angemeldet
      </h1>
      <div className="logout">
        <NavLink onClick={loguthandler}>LogOut</NavLink>
      </div>
    </>
  );
};

export default Home;
