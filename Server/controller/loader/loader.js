const { Op } = require('sequelize');

const Quiz = require('../../module/quiz/quiz');
const User = require('../../module/auth/user');

const QUIZCATEGORY = require("../../module/enum/QUIZCATEGORY");
const create_quiz_object = require("../../util/quiz/create_quiz_object");
const question = require('../../module/quiz/question/question');


exports.loadCategory = (req, res, next) => {
    try {
        const list = [];
        for (const categoty in QUIZCATEGORY) {
            list.push(QUIZCATEGORY[categoty]);
        }

        res.status(200).json({
            categotys: list,
        })
    } catch (err) {
        console.log(err);
        next(err);
    }
}


exports.loadQuizes = async (req, res, next) => {
    try {
        const category = req.params.category;

        const quize = await Quiz.findAll({
            where: {
                category: category.toUpperCase(),
                creator: { [Op.notIn]: [req.userId] }
            },
            order: [
                ['title', 'ASC']
            ]
        });

        if (quize.length === 0) {
            res.status(200).json({
                message: "Keine Quiz unter deises Kategory",
                quize: [],
            });
        } else {
            res.status(200).json({
                message: "All Quize",
                quize: quize,
            })
        }
    } catch (err) {
        next(err)
    }

}


exports.loadQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        const quiz = await Quiz.findByPk(quizId);

        if (!quiz) {
            res.status(404).json({ message: "keien Quiz unter dieses ID" });
        }

        const userId = quiz.getDataValue('creator');

        if (userId === req.userId) {
            const quiz_object = await create_quiz_object(quiz, true);

            res.status(200).json({
                message: "private quiz for creator",
                creator: true,
                quiz: quiz_object,
            })
        } else {
            const quiz_object = await create_quiz_object(quiz, false);
            res.status(200).json({
                message: "private quiz for answer",
                creator: false,
                quiz: quiz_object,
            })
        }
    } catch (err) {
        next(err)
    }
}




exports.loadParticipants = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const userId = req.userId;

        const quiz = await Quiz.findByPk(quizId);

        if (!quiz) {
            res.json(442).message({ message: "keine Quiz unter dieses Id" });
        }

        const participants = await quiz.getParticipants();

        if (!quiz.getDataValue('creator') === userId) {
            if (!participants.some(p => p.getDataValue('userId') === userId)) {
                res.json(442).json({ message: "user muss teilnehmer sein um andere Teilnehmer zu sehen" });
            }
        }

        if (participants.length === 0) {
            res.status(200).json({
                message: "Kein Teilnehmer",
            });
        }

        const participants_array = [];

        for (const participant of participants) {

            const user = await participant.getUser();

            participants_array.push({
                userId: user.getDataValue('_id'),
                username: user.getDataValue('username'),
                result: participant.getDataValue('result'),
                passed: participant.getDataValue('passed'),
            })
        }

        res.status(200).json({
            message: "alle teilnehmer",
            participants: participants_array,
        });

    } catch (err) {
        next(err)
    }
}



exports.loadParticipant = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;
        const participantId = req.params.participantId;

        const userId = req.userId;

        const quiz = await Quiz.findByPk(quizId);

        if (!quiz) {
            res.json(442).message({ message: "keine Quiz unter dieses Id" });
        }

        const user_participant = await quiz.getParticipants({
            where: {
                userId: userId
            }
        });

        if (user_participant.length === 0) {
            res.json(442).message({ message: "user muss teilnehmer sein um andere Teilnehmer zu sehen" });
        }

        const participants = await quiz.getParticipants({
            where: {
                _id: participantId
            }
        });


        if (participants.length === 0) {
            res.json(442).json({ message: "keine Teilnehmer unter dieses Id" });
        }

        const participant = participants[0];

        const participant_info = await participant.getUser();
        const answers = await participant.getAnswers();
        const question_with_participant_answer = [];

        for (const answer of answers) {
            const question = await answer.getQuestion();
            question_with_participant_answer.push({
                question: question,
                answer: answer,
            })
        }


        const quiz_obj = await create_quiz_object(quiz, true, true);


        const question_with_participant_answer_and_right_answers =
            question_with_participant_answer.map(obj => {
                obj.right_answer = quiz_obj.questions
                    .filter(q => q.questionId === obj.question.getDataValue('_id'))[0].right_answer;
                return obj;
            })

        const participant_obj = {
            id: participantId,
            quizInfo: quiz,
            username: participant_info.getDataValue('username'),
            result: participant.getDataValue('result'),
            passed: participant.getDataValue('passed'),
            questions: question_with_participant_answer_and_right_answers,
        }

        res.status(200).json({ message: "Teilnehmer", participant: participant_obj });

    } catch (err) {
        next(err)
    }
}
