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
const create_quiz_objekt = async (quiz) =>{
    try{
        const quiz_object = {}

        quiz_object.quizId = quiz.getDataValue('_id');
        quiz_object.quizCategory = quiz.getDataValue('quizCategory');
        quiz_object.question_number = quiz.getDataValue('question_number');
        quiz_object.questions = [];


        const quiz_questions = await quiz.getQuestions();

        for(const quiz_question of quiz_questions){
            const question_object = {}

            question_object.questionId = quiz_question.getDataValue('_id');
            question_object.question_value = quiz_question.getDataValue('question_value');
            question_object.category = quiz_question.getDataValue('category');
            question_object.answers = [];

            if(quiz_question.category === QUESTIONTYPE.TRUEORFALSE ||quiz_question.category === QUESTIONTYPE.FILLINTHEBLANK ){
                quiz_object.questions.push(question_object)
                continue;
            }
            
            const options = await quiz_question.getOptions();

            for(const option of options){
                question_object.answers.push({value: option.getDataValue("value")});
            }

            quiz_object.questions.push(question_object)
        }

        return quiz_object;
    }catch(error){
        throw error;
    }
}

module.exports = create_quiz_objekt;
