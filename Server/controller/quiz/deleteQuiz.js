const User = require("../../module/auth/user");

// TODO: add validations for incomming quiz if EXISTS
const deleteQuiz = async (req, res, next) => {
  try {
    const userId = req.userId;
    const quizId = req.params.quizId;

    const user = await User.findByPk(userId);
    const quiz = await user.getQuizzes({
      where: {
        _Id: quizId,
      },
    });

    await quiz[0].destroy();

    res
      .status(200)
      .json({ message: "Quiz deleted successfully", quizId: quizId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = deleteQuiz;
