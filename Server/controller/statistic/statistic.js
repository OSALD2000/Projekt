const User = require("../../module/auth/user");
const Quiz = require("../../module/quiz/quiz");
const Statistics = require("../../module/chart/statistics");

const Participant = require("../../module/quiz/participant");

exports.loadStatistic = async (req, res, next) => {
  try {
    const userId = req.userId;
    const quizId = req.params.quizId;

    const user = await User.findByPk(userId);
    const user_quiz = await user.getQuizzes({
      where: {
        _Id: quizId,
      },
      attributes: [],
      include: [
        {
          model: Participant,
          attributes: ["result", "passed"],
          include: [{
            model: User,
            attributes: ["username"],
          }]
        },
        Statistics]
    });

    if (user_quiz.length === 0) {

      const participant = await Participant.findOne({
        where: {
          userId: userId,
          quizId: quizId,
        },
      });
      if (!participant) {
        res.status(442).json({ message: "Sie muessen erst Teilnehmen!!" });
      }

      const quiz_loaded = await Quiz.findAndCountAll({
        where: {
          _id: quizId
        },
        attributes: [],
        include: [
          {
            model: Participant,
            attributes: ["result", "passed"],
            include: [{
              model: User,
              attributes: ["username"],
            }]
          },
          Statistics
        ],
        order: [
          [{ model: Participant }, 'result', 'DESC']
        ]
      });

      if (quiz_loaded.rows.length === 0) {
        res.status(442).json({ message: "keine Quiz unter dieses Id" });
      }

      res.status(200).json({ message: "Statistik", data: quiz_loaded.rows[0] });
    } else {

      res.status(200).json({ message: "Statistik", data: user_quiz[0] });
    }
  } catch (err) {
    next(err);
  }
};
