const QUESTIONTYPE = require("../../module/enum/QUESTIONTYPE")
/** 
 {
    "quizId":""
    "quizCategory":,
    "question_number":,
    "questions": [
        {
            "value": ,
            "category": ,
            "weight": ,
            "right_answer": ,
            "answers": []
        }
    ]
}
*/
// TODO : creator zu quiz_object hinzufügen
const create_quiz_objekt = async (quiz, with_answer, view) => {
    try {
        const quiz_object = {}

        quiz_object.quizId = quiz.getDataValue('_id');
        quiz_object.title = quiz.getDataValue('title');
        quiz_object.beschreibung = quiz.getDataValue('beschreibung');
        quiz_object.quizCategory = quiz.getDataValue('quizCategory');
        quiz_object.question_number = quiz.getDataValue('question_number');
        quiz_object.required_points = quiz.getDataValue('required_points') * 100 + " %"
        quiz_object.questions = [];


        const quiz_questions = await quiz.getQuestions();

        let question_idx = 1;

        for (const quiz_question of quiz_questions) {
            const question_object = {}
            
            if (!view) {
                question_object.id = question_idx;
                question_object.question_value = quiz_question.getDataValue('question_value');
                question_object.category = quiz_question.getDataValue('category');
                question_object.weight = quiz_question.getDataValue('weight');
            }
            question_object.questionId = quiz_question.getDataValue('_id');

            question_idx += 1;

            if (with_answer) {
                switch (quiz_question.category.toUpperCase()) {

                    case QUESTIONTYPE.TRUEORFALSE:
                        const q1 = await quiz_question.getTrueorfalse();
                        question_object.right_answer = q1.getDataValue('right_answer') ? "true" : "false";
                        break;

                    case QUESTIONTYPE.CHOICEONE:
                        const q2 = await quiz_question.getChoiceone();
                        question_object.right_answer = q2.getDataValue('right_answer');
                        break;

                    case QUESTIONTYPE.MULTIPLECHOICE:
                        const q3 = await quiz_question.getMultipleChoice();
                        question_object.right_answer = q3.getDataValue('right_answer').split(",").filter(t => t);;
                        break;

                    case QUESTIONTYPE.FILLINTHEBLANK:
                        const q4 = await quiz_question.getFillInTheBlank();
                        question_object.right_answer = q4.getDataValue('right_answer');
                        break;

                    default:
                        throw Error('Type not supported!')
                }
            }

            if (quiz_question.category === QUESTIONTYPE.TRUEORFALSE || quiz_question.category === QUESTIONTYPE.FILLINTHEBLANK) {
                quiz_object.questions.push(question_object)
                continue;
            }

            question_object.answers = [];

            const options = await quiz_question.getOptions();

            let idx = 1;

            for (const option of options) {
                question_object.answers.push({ id: idx, value: option.getDataValue("value") });
                idx += 1;
            }

            quiz_object.questions.push(question_object)
        }

        return quiz_object;
    } catch (error) {
        throw error;
    }
}

module.exports = create_quiz_objekt;
