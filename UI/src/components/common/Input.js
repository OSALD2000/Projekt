import React from "react";
import { useState} from "react";
import useInput from "../../util/hooks/use-input";



const Input = ({children, validationType, min_length, ohneAddon, name, art, placeholder, required, reference}) => {
  const [passwordType, setPasswordType] = useState("password");
  const type = validationType;

  const showPasswordHanlder = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else setPasswordType("password");
  };

  const {
    enteredInput,
    inputClasses,
    hasError,
    message,
    inputChangeHandler,
    inputOnBlurHandler,
  } = useInput(type, min_length);

  return (
    <>
      <div className={`input-group mb-3 ${inputClasses}`}>
        {!ohneAddon && (
          <span className="input-group-text" id="basic-addon1">
            {children}
          </span>
        )}
        <input
          id={name}
          name={name}
          type={art === "password" ? passwordType : art}
          className="form-control"
          placeholder={placeholder}
          onChange={inputChangeHandler}
          onBlur={inputOnBlurHandler}
          aria-label={enteredInput}
          value={enteredInput}
          aria-describedby="basic-addon1"
          required={required}
          ref={reference ? reference : null}
        ></input>

        {art === "password" && (
          <span
            className="input-group-text"
            id="showPassword"
            style={{ cursor: "pointer" }}
            onClick={showPasswordHanlder}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
            >
              <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
            </svg>
          </span>
        )}
      </div>
      {hasError && <div className="errorText">{message}</div>}
    </>
  );
};

export default Input;
