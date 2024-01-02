const QUIZCATEGORY = require("../../module/enum/QUIZCATEGORY");
const QUESTIONTYPE = require("../../module/enum/QUESTIONTYPE");

const QUIZCATEGORY_ARRAY = [];

for (const CATEGORY in QUIZCATEGORY) {
  QUIZCATEGORY_ARRAY.push(QUIZCATEGORY[CATEGORY].toLowerCase());
}

const create_validation = {
  category: {
    in: ["body"],
    isIn: {
      options: QUIZCATEGORY_ARRAY,
    },
  },

  required_points: {
    in: ["body"],
    isFloat: true,
    custom: {
      options: (value) => {
        if (0 < value && value <= 1) {
          return true;
        }
      },
    },
  },

  title: {
    in: ["body"],
    isString: true,
    custom: {
      options: (title) => {
        if (title?.trim().length > 2) {
          return true;
        }
        throw new Error("title muss mind 3 Zeichen lang sein");
      },
    },
  },

  visibility: {
    in: ["body"],
    isIn: {
      options: ["private", "public"],
    },
  },

  questions: {
    in: ["body"],
    isArray: true,
    errorMessage: "Questions should be an array",

    custom: {
      options: (questions) => {
        const errors = [];

        if (questions.length === 0) {
          throw new Error("At least one question is required");
        } else if (questions.length > 50) {
          throw new Error("max number of questions is 50 question");
        } else {
          questions.forEach((question, index) => {
            let answers = "";
            if (question.question_value.length < 2) {
              errors.push({
                index,
                message: "Question value should be min. 3 character long",
              });
            }

            if (!Number.isInteger(parseInt(question.weight))) {
              errors.push({ index, message: "Weight should be an integer" });
            }

            switch (question.category.toUpperCase()) {
              case QUESTIONTYPE.CHOICEONE:
                if (Array.isArray(question?.answers) && question.answers.length >= 2) {
                  answers = question.answers.map((answer) =>
                    answer.value.trim().toLowerCase(),
                  );

                  if (
                    !answers.includes(
                      question.right_answer.value.trim().toLowerCase(),
                    )
                  ) {
                    errors.push({
                      index,
                      category: QUESTIONTYPE.CHOICEONE,
                      message: "Right answer should be in answers array",
                    });
                  }
                } else {
                  errors.push({
                    index,
                    category: QUESTIONTYPE.CHOICEONE,
                    message: "question should have mind. two answers",
                  });
                }
                break;

              case QUESTIONTYPE.FILLINTHEBLANK:
                if (
                  typeof question.right_answer !== "string" ||
                  question.right_answer?.trim().length === 0
                ) {
                  errors.push({
                    index,
                    category: QUESTIONTYPE.FILLINTHEBLANK,
                    message: "FILLINTHEBLANK right_answer should be a string",
                  });
                }
                if (question.answers) {
                  errors.push({
                    index,
                    category: QUESTIONTYPE.FILLINTHEBLANK,
                    message:
                      "FILLINTHEBLANK should not have any answers options",
                  });
                }
                break;
              case QUESTIONTYPE.MULTIPLECHOICE:
                if (Array.isArray(question?.answers) &&  question.answers.length >= 2) {
                  answers = question.answers.map((answer) =>
                    answer.value.trim().toLowerCase(),
                  );

                  if (Array.isArray(question.right_answer)) {
                    question.right_answer.forEach((ra) => {
                      if (
                        !answers.some(
                          (answer) =>
                            ra.value.trim().toLowerCase() ===
                            answer.trim().toLowerCase(),
                        )
                      ) {
                        errors.push({
                          index,
                          category: QUESTIONTYPE.MULTIPLECHOICE,
                          value: value,
                          message:
                            "MULTIPLECHOICE one of the value of right_answer array is not in answers array!",
                        });
                      }
                    });
                  } else {
                    errors.push({
                      index,
                      category: QUESTIONTYPE.MULTIPLECHOICE,
                      message:
                        "MULTIPLECHOICE right_answer should be a array of answer",
                    });
                  }
                } else {
                  errors.push({
                    index,
                    category: QUESTIONTYPE.MULTIPLECHOICE,
                    message: "question should have mind. two answers",
                  });
                }
                break;

              case QUESTIONTYPE.TRUEORFALSE:
                if (typeof question.right_answer !== "boolean") {
                  errors.push({
                    index,
                    category: QUESTIONTYPE.FILLINTHEBLANK,
                    message: "TRUEORFALSE right_answer should be a boolean",
                  });
                }

                if (question.answers) {
                  errors.push({
                    index,
                    category: QUESTIONTYPE.FILLINTHEBLANK,
                    message: "TRUEORFALSE should not have any answer options",
                  });
                }
                break;

              default:
                errors.push({ index, message: "Category not supported" });
                break;
            }
          });
        }

        if (errors.length > 0) {
          throw new Error(JSON.stringify(errors));
        }

        return true;
      },
    },
  },
};

module.exports = create_validation;
