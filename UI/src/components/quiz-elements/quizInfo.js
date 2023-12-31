import React from "react";
import { QUIZART } from "../../util/enum/QUIZART.js";
import { useEffect, useState } from "react";
import Input from "../common/Input";
import classes from "./quiz.module.css";
import { TYPE } from "../../util/validation/Type.js";

const Quizinfo = () => {

  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    const list = []
    for (const category in QUIZART) {
      list.push(QUIZART[category])
    }
    setCategorys(list);
  }, []
  )


  return (
    <>
      <div className={classes.info_card}>
        <div className={classes.title}>
          <Input
            name="title"
            art="text"
            placeholder="title"
            required={true}
            ohneAddon={true}
            validationType={TYPE.TEXT}
            min_length={10}
          />
        </div>
        <div className={classes.select}>
          <select className="form-select" name="category">
            {categorys.map(category => {
              return <option value={category} key={category}>{category.toLowerCase()}</option>
            })}
          </select>
        </div>
        <div className={classes.textarea}>
          <textarea
            name="beschreibung"
            id="beschreibung"
            placeholder="Beschreibung"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <div className={classes.win}>
          <Input
            name="win"
            art="number"
            placeholder="win percent %"
            required={true}
            validationType={TYPE.NUMBER}
          >%</Input>
        </div>
      </div>
    </>
  );
};

export default Quizinfo;