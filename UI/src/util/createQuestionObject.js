import QUESTIONTYPE from "./enum/QUESTIONTYPE"

export const createQuestion = (type, id) => {
    switch (QUESTIONTYPE.getType(type.toUpperCase())) {

        case QUESTIONTYPE.TRUEORFALSE:
            return {
                id:id,
                question_value: "",
                category: "TRUEORFALSE",
                weight: 1,
                right_answer: true,
            }

        case QUESTIONTYPE.CHOICEONE:
            return {
                id:id,
                question_value: "",
                category: "CHOICEONE",
                weight: 1,
                right_answer: "",
                answers: []
            }

        case QUESTIONTYPE.MULTIPLECHOICE:
            return {
                id:id,
                question_value: "",
                category: "MULTIPLECHOICE",
                weight: 1,
                right_answer: [],
                answers: []
            }

        case QUESTIONTYPE.FILLINTHEBLANK:
            return {
                id:id,
                question_value: "",
                category: "FILLINTHEBLANK",
                weight: 1,
                right_answer: "",
            }

        case QUESTIONTYPE.ORDERING:
            return {
                id:id,
                question_value: "",
                category: "ORDERING",
                weight: 1,
                right_answer: [],
                answers: []
            }

        default:
            alert("try again ! : )");

    }
}

