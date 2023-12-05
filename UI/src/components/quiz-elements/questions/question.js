import React from "react";
import QUESTIONTYPE from "../../../util/enum/QUESTIONTYPE";

import TrueOrFalse from "./trueOrFalse";
import ChoiceOne from "./choiceOne";
import FillInTheBlank from "./fillInTheBlank";
import MultipleChoice from "./multipleChoice";

const Question = ({ mode, question, onUpdate, onDeleteQuestion }) => {
    //TODO: css classen namen in unter Questions anpassen
    switch (QUESTIONTYPE.getType(question.category.toUpperCase())) {

        case QUESTIONTYPE.TRUEORFALSE:
            return <TrueOrFalse create={mode} onDeleteQuestion={onDeleteQuestion || null} question={question} onUpdate={onUpdate} />;

        case QUESTIONTYPE.CHOICEONE:
            return <ChoiceOne create={mode} onDeleteQuestion={onDeleteQuestion || null} question={question} onUpdate={onUpdate} />;

        case QUESTIONTYPE.MULTIPLECHOICE:
            return <MultipleChoice create={mode} onDeleteQuestion={onDeleteQuestion || null} question={question} onUpdate={onUpdate} />;

        case QUESTIONTYPE.FILLINTHEBLANK:
            return <FillInTheBlank create={mode} onDeleteQuestion={onDeleteQuestion || null} question={question} onUpdate={onUpdate} />;

        default:
            alert('Falsche Category');
    }
}

export default Question;