import { TYPE } from "./Type";
import { json } from "react-router-dom";


const usernameInputValidation = (username) => {
  if (username.trim() === "") {
    return {
      status: false,
      message: "bitte geben Sie eine Username an!!",
    };
  } else if (username.length < 5) {
    return {
      status: false,
      message: "Username name soll mind. 5 Zeichen sein!!",
    };
  }

  return {
    status: true,
    message: "Erfolgreich!!",
  };
};

const emailInputValidation = (email) => {
  if (email === "") {
    return {
      status: false,
      message: "bitte geben Sie eine Email an!!",
    };
  } else if (
    !email
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
  ) {
    return {
      status: false,
      message: "Ungültige Email Addresse!!",
    };
  }

  return {
    status: true,
    message: "Erfolgreich!!",
  };
};

const newPasswordInputValidation = (password) => {
  return {
    status: password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)().{8,50}$/),
    message: (
      <div className="password">
        <span>Password muss :</span>
        <ul>
          <li> mind. eine Kleine Buchstabe haben</li>
          <li> mind. eine Große Buchstabe haben</li>
          <li> mind. eine Nummer haben </li>
          <li> mind. 8 max. 50 Zeichnen haben</li>
        </ul>
      </div>
    ),
  };
};

const passwordInputValidation = (password) => {
  return {
    status: password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,50}$/),
    message: "Bitte geben Sie das korrekte Passwort ein.",
  };
};

const emailVerificationValidation = (verificationCode) => {
  return {
    status: verificationCode.length === 5,
    message: "bitte ein valider Code eingeben!",
  };
};

const textValidation = (text, length) => {
  if (text.trim() === "") {
    return {
      status: false,
      message: "bitte titel angeben!",
    };
  } else if (text.length < length) {
    return {
      status: false,
      message: "text soll mind." + length + " Zeichen sein!!",
    };
  }

  return {
    status: true,
    message: "Erfolgreich!!",
  };
}

const numberValidation = (value) => {
  if (!parseInt(value)) {
    return {
      status: false,
      message: "muss eine zahl sein!",
    }
  }
  if (value < 0 || value > 100) {
    return {
      status: false,
      message: "muss zwischen 0 und 100 sein",
    }
  }

  return {
    status: true,
    message: "Erfolgreich!!",
  };
}

const validierung = (type, value, length) => {
  switch (type) {
    case TYPE.USERNAME:
      return usernameInputValidation(value);

    case TYPE.EMAIL:
      return emailInputValidation(value);

    case TYPE.NEWPASSWORD:
      return newPasswordInputValidation(value);

    case TYPE.PASSWORD:
      return passwordInputValidation(value);

    case TYPE.EMAILVERIFICATION:
      return emailVerificationValidation(value);

    case TYPE.TEXT:
      return textValidation(value, length);

    case TYPE.NUMBER:
      return numberValidation(value);

    default:
      throw json({ message: " Fehler beim Valiedierung" }, { status: 422 });
  }
}


export default validierung;