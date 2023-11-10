import { useReducer } from "react";
import validation  from "../validation/validation"

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputStateReducer = (state, action) => {
  if (action.type === "INPUT") {
    return {
      value: action.value,
      isTouched: state.isTouched,
    };
  } else if (action.type === "BLUR") {
    return { value: state.value, isTouched: true};
  }

  return inputStateReducer
};

const useInput = (type) => {
  const [input, dispatch] = useReducer(inputStateReducer, initialInputState);

  const {status:enteredInputIsValid, message} = validation(type, input.value);
  const hasError = !enteredInputIsValid && input.isTouched;

  const inputClasses = hasError ? "invalid" : "";

  const inputChangeHandler = (event) => {
    dispatch({
      type: "INPUT",
      value: event.target.value,
    });
  };

  const inputOnBlurHandler = (event) => {
    dispatch({
      type: "BLUR",
    });
  };

  return {
    enteredInput: input.value,
    message,
    inputClasses,
    hasError,
    inputChangeHandler,
    inputOnBlurHandler,
  };
};

export default useInput;
