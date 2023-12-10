const User = require('../../module/auth/user');
const Quiz = require('../../module/quiz/quiz');
const mail = require("../../util/mail");
const create_quiz_object = require("../../util/quiz/create_quiz_object");

exports.loadData = async (req, res, next) => {
    try {
        const useres = await User.findAll({
            where: {
                roll: null,
            },
            attributes: ['_id', 'email', 'username']
        });

        const quizes = await Quiz.findAll();


        res.status(200).json({ useres: useres, quizes: quizes });
    } catch (err) {
        next(err);
    }
}

exports.deleteQuiz = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        const quiz = await Quiz.destroy({
            where: {
                _id: quizId,
            }
        });

        const user = await User.findByPk(quiz.getDataValue('creator'));
        const email = user.getDataValue('email');
        const userName = user.getDataValue('username');

        const emailContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="color: #333;">Löschung des Quiz</h2>
            <p style="color: #555;">Sehr geehrter ${userName},</p>
            <p style="color: #555;">ich möchte Sie darüber informieren, dass das Quiz mit dem Titel "[Quiztitel]" gelöscht wurde. Falls Sie Fragen dazu haben oder weitere Informationen benötigen, stehe ich Ihnen gerne zur Verfügung.</p>
            <p style="color: #555;">Vielen Dank für Ihr Verständnis.</p>
            <p style="color: #555;">Mit freundlichen Grüßen,<br>Osama</p>
            <div style="margin-top: 30px; text-align: center; color: #777; font-size: 12px;">
              <p>Diese Nachricht wurde automatisch generiert. Bitte antworten Sie nicht darauf.</p>
            </div>
          </div>
        </div>
        `;

        mail.sendeEmailfromAdminToUser(email, "Löschung des Quiz", emailContent);

        res.status(200).json({ message: 'Quiz Deleted!' });
    } catch (err) {
        next(err);
    }
}


exports.deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await User.findByPk(userId);

        await User.destroy({
            where: {
                _id: userId,
            }
        });

        const email = user.getDataValue('email');
        const userName = user.getDataValue('username');

        const emailContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; background-color: #f4f4f4; margin: 0; padding: 20px;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <h2 style="color: #333;">Löschung des Benutzerkontos</h2>
                <p style="color: #555;">Sehr geehrter ${userName},</p>
                <p style="color: #555;">Ihr Benutzerkonto wurde von unserem Administrator gelöscht.</p>
                <p style="color: #555;">Falls Sie weitere Informationen oder Unterstützung benötigen, kontaktieren Sie uns bitte.</p>
                <p style="color: #555;">Mit freundlichen Grüßen,<br>Das Support-Team</p>
                <div style="margin-top: 30px; text-align: center; color: #777; font-size: 12px;">
                <p>Diese Nachricht wurde automatisch generiert. Bitte antworten Sie nicht darauf.</p>
                </div>
            </div>
        </div>
        `;

        mail.sendeEmailfromAdminToUser(email, "Löschung des Benutzerkontos", emailContent);

        res.status(200).json({ message: 'User Deleted!' });

    } catch (err) {
        next(err);
    }
}


exports.searchUser = async (req, res, next) => {
    try {
        const arg = req.params.arg;

        const users = await User.findAll({
            where: {
                email: { [Op.startsWith]: [arg] }
            },
            order: [
                ['title', 'ASC']
            ]
        });

        if (users.length === 0) {
            res.status(200).json({
                message: "Keine User unter dieses Email :  " + arg,
                quize: [],
            });
        } else {
            res.status(200).json({
                message: "All User",
                quize: users,
            })
        }
    } catch (err) {
        next(err);
    }
}


exports.searchQuiz = async (req, res, next) => {
    try {
        const arg = req.params.arg;
        const quize = await Quiz.findAll({
            where: {
                title: { [Op.startsWith]: [arg] }
            },
            order: [
                ['title', 'ASC']
            ]
        });

        if (quize.length === 0) {
            res.status(200).json({
                message: "Keine Quiz unter dieses Title " + arg,
                quize: [],
            });
        } else {
            res.status(200).json({
                message: "All Quize",
                quize: quize,
            })
        }
    } catch (err) {
        next(err);
    }
}


exports.viewUserProfiel = async (req, res, next) => {
    try {
        const userId = req.params.userId;

        const user = await User.findByPk(userId);

        const _id = user.getDataValue('_id');
        const email = user.getDataValue('email');
        const username = user.getDataValue('username');

        const quize = await user.getQuizzes();
        const scoures = await user.getScoures();

        res.status(200).json({ message: "user information", daten: { id: _id, email: email, username: username, quize: quize, scoures: scoures, admin: true } });

    } catch (err) {
        next(err)
    }
}

exports.loadUserQuiz = async (req, res, next) => {
    try {
        const userId = req.params.userId;
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

exports.loadQuizStatic = async (req, res, next) => {
    try {
        const quizId = req.params.quizId;

        const quiz = await Quiz.findByPk(quizId);

        const statistic = await quiz.getStatistic();

        res.status(200).json({ message: "Statistik", data: statistic });
    } catch (err) {
        next(err)
    }
}