import QUESTIONTYPE from "../enum/QUESTIONTYPE";

export const answerValidtion = (answers, questions, setValid) => {
    let valid = true;

    if(answers.length !== questions.length){
        return
    }
    for (const answer of answers) {
        switch (QUESTIONTYPE.getType(answer.category.toUpperCase())) {

            case QUESTIONTYPE.TRUEORFALSE:
                if (typeof answer.answer !== "boolean") {
                    valid = false;
                    return
                }
                break;
            case QUESTIONTYPE.CHOICEONE:
                if (typeof answer.answer !== "string") {
                    valid = false;
                    return
                } else if (answer.answer === "") {
                    valid = false;
                    return
                }
                break;

            case QUESTIONTYPE.MULTIPLECHOICE:
                if (!Array.isArray(answer.answer)) {
                    valid = false;
                    return
                } else if (answer.answer.length < 1) {
                    valid = false;
                    return
                }
                break;

            case QUESTIONTYPE.FILLINTHEBLANK:
                if (typeof answer.answer !== "string") {
                    valid = false;
                    return
                } else if (answer.answer === "") {
                    valid = false;
                    return
                }
                break;

            default:
                alert('Falsche Category');

        }
    }

    if (valid) {
        setValid(true)
    }
}