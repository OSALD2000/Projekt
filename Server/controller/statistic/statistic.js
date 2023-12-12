const User = require("../../module/auth/user");
const Quiz = require("../../module/quiz/quiz");

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

      const quiz = await Quiz.findByPk(quizId);

      if (!quiz) {
        res.status(442).json({ message: "keine Quiz unter dieses Id" });
      }

      const statistic = await quiz.getStatistic();

      res.status(200).json({ message: "Statistik", data: statistic });
    } else {
      const statistic = await user_quiz[0].getStatistic();

      res.status(200).json({ message: "Statistik", data: statistic });
    }
  } catch (err) {
    next(err);
  }
};
