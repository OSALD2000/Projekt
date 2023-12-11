const User = require('../../module/auth/user');
const bcrypt = require("bcryptjs");
const create_quiz_object = require("../../util/quiz/create_quiz_object");
const requestErrorHandler = require("../../util/validation/requestValidation");


exports.loadUserDaten = async (req, res, next) => {
    try {
        const userId = req.userId;

        const user = await User.findByPk(userId);

        const _id = user.getDataValue('_id');
        const email = user.getDataValue('email');
        const username = user.getDataValue('username');

        const quize = await user.getQuizzes();
        const scoures = await user.getScoures();

        res.status(200).json({ message: "user information", daten: { id: _id, email: email, username: username, quize: quize, scoures: scoures } });

    } catch (err) {
        next(err)
    }
}


exports.userUpdatePassord = async (req, res, next) => {
    try {
        requestErrorHandler(req);
        const userId = req.userId;
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;

        const user = await User.findByPk(userId);

        const isEqual = await bcrypt.compare(oldPassword, user.dataValues.password);

        if (!isEqual) {
            const error = new Error("Worng old password");
            error.statusCode = 401;
            throw error;
        }

        const hashedPw = await bcrypt.hash(newPassword, 12);

        user.password = hashedPw;

        await user.save();

        res.status(200).json({ message: "user password updated" });

    } catch (err) {
        next(err)
    }
}


exports.loadQuiz = async (req, res, next) => {
    try {
        const userId = req.userId;
        const quizId = req.params.quizId;

        const user = await User.findByPk(userId);

        const quiz = await user.getQuizzes({
            where: {
                _id: quizId,
            }
        });

        if (quiz.length === 0) {
            res.status(404).json({ message: "keien Quiz unter dieses ID" });
        }

        const quiz_object = await create_quiz_object(quiz[0], true);

        res.status(200).json({
            message: "private quiz for creator",
            creator: true,
            quiz: quiz_object,
        })
    } catch (err) {
        next(err)
    }
}