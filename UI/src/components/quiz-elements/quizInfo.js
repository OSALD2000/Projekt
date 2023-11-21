import React from "react";
import { QUIZART } from "../../util/enum/QUIZART";
import Input from "../common/Input";

const Quizinfo = (props) => {

  return (
    <>
      <Input
        name="title"
        art="text"
        placeholder="text"
        required={true}
        ohneAddon={true}
      />

      <select className="form-select" name="category">
        {QUIZART.entries().map(({ key, value }) => (
          <option value={key} id={key}>
            {value.toLowerCase()}
          </option>
        ))}
      </select>

      <textarea
        name="beschreibunf"
        id="beschreibunf"
        cols="30"
        rows="10"
      ></textarea>

      <Input
        name="winNote"
        art="number"
        placeholder="winNote"
        required={false}
        ohneAddon={true}
      />
    </>
  );
};

export default Quizinfo;