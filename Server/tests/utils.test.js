import { it, expect, beforeAll, afterAll } from "vitest";

const Quiz = require("../module/quiz/quiz");
const app = require("../app");
const calculate_score = require("../util/quiz/calculat_score");
const create_quiz_objekt = require("../util/quiz/create_quiz_object");

let server;
let token;
let quiz_Id;
beforeAll(async () => {
  server = app.listen(7003);
  const userData = {
    email: "1-user@test.de",
    password: "root",
  };

  const response = await fetch("http://localhost:7003/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  token = data.token;
  const test_quiz = {
    title: "Unit Test Create Quiz ",
    quizCategory: "ALLGEMEIN",
    beschreibung: "Unit Test Create Quiz ",
    required_points: 0.5,
    visibility: "private",
    questions: [
      {
        id: 1,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: 1,
        right_answer: true,
      },
      {
        id: 2,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: "2",
        right_answer: false,
      },
      {
        id: 3,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "2",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz tow",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz one",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz tow",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz three",
          },
        ],
      },
      {
        id: 4,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "3",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz  2",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz  1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz  2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz  3",
          },
        ],
      },
      {
        id: 5,
        question_value: "Unit Test Create Quiz JA",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Ja",
      },
      {
        id: 6,
        question_value: "Unit Test Create Quiz Nein",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Nein",
      },
      {
        id: 7,
        question_value: "Unit Test Create Quiz 1",
        category: "MULTIPLECHOICE",
        weight: "6",
        right_answer: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4",
          },
        ],
      },
      {
        id: 8,
        question_value: "Unit Test Create Quiz 2",
        category: "MULTIPLECHOICE",
        weight: "7",
        right_answer: [
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
      },
    ],
  };

  const response_tow = await fetch("http://localhost:7003/quiz/create", {
    method: "POST",
    headers: {
      authorization: token.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test_quiz),
  });
  const { quizId } = await response_tow.json();

  quiz_Id = quizId;
});

it("calculate_score", () => {
  const first_testData = [
    { is_right: false, weight: 2 },
    { is_right: true, weight: 7 },
    { is_right: false, weight: 5 },
    { is_right: false, weight: 1 },
    { is_right: true, weight: 4 },
    { is_right: false, weight: 9 },
    { is_right: false, weight: 3 },
    { is_right: true, weight: 8 },
    { is_right: false, weight: 6 },
    { is_right: false, weight: 10 },
    { is_right: true, weight: 1 },
    { is_right: false, weight: 4 },
    { is_right: false, weight: 3 },
    { is_right: true, weight: 7 },
    { is_right: false, weight: 5 },
    { is_right: false, weight: 2 },
    { is_right: true, weight: 6 },
    { is_right: false, weight: 8 },
    { is_right: false, weight: 9 },
    { is_right: false, weight: 10 },
    { is_right: false, weight: 1 },
    { is_right: true, weight: 4 },
    { is_right: false, weight: 9 },
    { is_right: false, weight: 3 },
    { is_right: true, weight: 8 },
    { is_right: true, weight: 6 },
    { is_right: true, weight: 10 },
    { is_right: true, weight: 1 },
    { is_right: true, weight: 4 },
    { is_right: true, weight: 3 },
    { is_right: true, weight: 7 },
    { is_right: true, weight: 5 },
    { is_right: false, weight: 2 },
    { is_right: false, weight: 6 },
    { is_right: false, weight: 8 },
    { is_right: false, weight: 9 },
    { is_right: false, weight: 10 },
  ];

  // summe_weight: 206  && summe_right_answer : 81
  // =>
  const first_score = 0.39;

  expect(calculate_score(first_testData, 0.4)).toMatchObject({
    score: first_score,
    bestanden: false,
  });

  expect(calculate_score(first_testData, 0.39)).toMatchObject({
    score: first_score,
    bestanden: true,
  });

  const second_testData = [
    { is_right: true, weight: 2 },
    { is_right: true, weight: 7 },
    { is_right: true, weight: 5 },
    { is_right: false, weight: 1 },
    { is_right: true, weight: 4 },
    { is_right: false, weight: 9 },
    { is_right: false, weight: 3 },
    { is_right: true, weight: 8 },
    { is_right: false, weight: 6 },
    { is_right: false, weight: 10 },
    { is_right: true, weight: 1 },
    { is_right: false, weight: 4 },
    { is_right: false, weight: 3 },
    { is_right: true, weight: 7 },
    { is_right: false, weight: 5 },
    { is_right: false, weight: 2 },
    { is_right: true, weight: 6 },
    { is_right: false, weight: 8 },
    { is_right: false, weight: 9 },
    { is_right: false, weight: 10 },
    { is_right: false, weight: 1 },
    { is_right: true, weight: 4 },
    { is_right: true, weight: 9 },
    { is_right: false, weight: 3 },
    { is_right: true, weight: 8 },
    { is_right: true, weight: 6 },
    { is_right: true, weight: 10 },
    { is_right: true, weight: 1 },
    { is_right: true, weight: 4 },
    { is_right: true, weight: 3 },
    { is_right: true, weight: 7 },
    { is_right: true, weight: 5 },
    { is_right: false, weight: 2 },
    { is_right: false, weight: 6 },
    { is_right: false, weight: 8 },
    { is_right: false, weight: 9 },
    { is_right: true, weight: 10 },
  ];

  // summe_weight: 206  && summe_right_answer : 107
  // =>
  const second_score = 0.52;

  expect(calculate_score(second_testData, 0.53)).toMatchObject({
    score: second_score,
    bestanden: false,
  });

  expect(calculate_score(second_testData, 0.52)).toMatchObject({
    score: second_score,
    bestanden: true,
  });
});

it("create Validation", async () => {
  const test_quiz_all_right = {
    title: "Unit Test Create Quiz ",
    quizCategory: "ALLGEMEIN",
    beschreibung: "Unit Test Create Quiz ",
    required_points: 0.5,
    visibility: "private",
    questions: [
      {
        id: 1,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: 1,
        right_answer: true,
      },
      {
        id: 2,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: "2",
        right_answer: false,
      },
      {
        id: 3,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "2",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz tow",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz one",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz tow",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz three",
          },
        ],
      },
      {
        id: 4,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "3",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz  2",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz  1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz  2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz  3",
          },
        ],
      },
      {
        id: 5,
        question_value: "Unit Test Create Quiz JA",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Ja",
      },
      {
        id: 6,
        question_value: "Unit Test Create Quiz Nein",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Nein",
      },
      {
        id: 7,
        question_value: "Unit Test Create Quiz 1",
        category: "MULTIPLECHOICE",
        weight: "6",
        right_answer: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4",
          },
        ],
      },
      {
        id: 8,
        question_value: "Unit Test Create Quiz 2",
        category: "MULTIPLECHOICE",
        weight: "7",
        right_answer: [
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
      },
    ],
  };

  const response_one = await fetch("http://localhost:7003/quiz/create", {
    method: "POST",
    headers: {
      authorization: token.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test_quiz_all_right),
  });

  expect(response_one.status).toBe(201);

  const test_quiz_missing_title = {
    title: "",
    quizCategory: "ALLGEMEIN",
    beschreibung: "Unit Test Create Quiz ",
    required_points: 0.5,
    visibility: "private",
    questions: [
      {
        id: 1,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: 1,
        right_answer: true,
      },
      {
        id: 2,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: "2",
        right_answer: false,
      },
      {
        id: 3,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "2",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz tow",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz one",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz tow",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz three",
          },
        ],
      },
      {
        id: 4,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "3",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz  2",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz  1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz  2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz  3",
          },
        ],
      },
      {
        id: 5,
        question_value: "Unit Test Create Quiz JA",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Ja",
      },
      {
        id: 6,
        question_value: "Unit Test Create Quiz Nein",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Nein",
      },
      {
        id: 7,
        question_value: "Unit Test Create Quiz 1",
        category: "MULTIPLECHOICE",
        weight: "6",
        right_answer: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4",
          },
        ],
      },
      {
        id: 8,
        question_value: "Unit Test Create Quiz 2",
        category: "MULTIPLECHOICE",
        weight: "7",
        right_answer: [
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
      },
    ],
  };

  const response_tow = await fetch("http://localhost:7003/quiz/create", {
    method: "POST",
    headers: {
      authorization: token.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test_quiz_missing_title),
  });

  expect(response_tow.status).toBe(442);

  const test_quiz_with_no_questions = {
    title: "TEST",
    quizCategory: "ALLGEMEIN",
    beschreibung: "Unit Test Create Quiz ",
    required_points: 0.5,
    visibility: "private",
  };

  const response_three = await fetch("http://localhost:7003/quiz/create", {
    method: "POST",
    headers: {
      authorization: token.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test_quiz_with_no_questions),
  });

  expect(response_three.status).toBe(442);

  const test_quiz_missing_question_value_in_one_question = {
    title: "TEST",
    quizCategory: "ALLGEMEIN",
    beschreibung: "Unit Test Create Quiz ",
    required_points: 0.5,
    visibility: "private",
    questions: [
      {
        id: 1,
        question_value: "",
        category: "TRUEORFALSE",
        weight: 1,
        right_answer: true,
      },
      {
        id: 2,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: "2",
        right_answer: false,
      },
      {
        id: 3,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "2",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz tow",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz one",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz tow",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz three",
          },
        ],
      },
      {
        id: 4,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "3",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz  2",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz  1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz  2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz  3",
          },
        ],
      },
      {
        id: 5,
        question_value: "Unit Test Create Quiz JA",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Ja",
      },
      {
        id: 6,
        question_value: "Unit Test Create Quiz Nein",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Nein",
      },
      {
        id: 7,
        question_value: "Unit Test Create Quiz 1",
        category: "MULTIPLECHOICE",
        weight: "6",
        right_answer: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4",
          },
        ],
      },
      {
        id: 8,
        question_value: "Unit Test Create Quiz 2",
        category: "MULTIPLECHOICE",
        weight: "7",
        right_answer: [
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
      },
    ],
  };

  const response_four = await fetch("http://localhost:7003/quiz/create", {
    method: "POST",
    headers: {
      authorization: token.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test_quiz_missing_question_value_in_one_question),
  });

  expect(response_four.status).toBe(442);

  const test_quiz_choice_one_rigth_answer_not_in_option = {
    title: "Unit Test Create Quiz ",
    quizCategory: "ALLGEMEIN",
    beschreibung: "Unit Test Create Quiz ",
    required_points: 0.5,
    visibility: "private",
    questions: [
      {
        id: 1,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: 1,
        right_answer: true,
      },
      {
        id: 2,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: "2",
        right_answer: false,
      },
      {
        id: 3,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "2",
        right_answer: {
          id: 2,
          value: "non option",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz one",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz tow",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz three",
          },
        ],
      },
      {
        id: 4,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "3",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz  2",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz  1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz  2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz  3",
          },
        ],
      },
      {
        id: 5,
        question_value: "Unit Test Create Quiz JA",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Ja",
      },
      {
        id: 6,
        question_value: "Unit Test Create Quiz Nein",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Nein",
      },
      {
        id: 7,
        question_value: "Unit Test Create Quiz 1",
        category: "MULTIPLECHOICE",
        weight: "6",
        right_answer: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4",
          },
        ],
      },
      {
        id: 8,
        question_value: "Unit Test Create Quiz 2",
        category: "MULTIPLECHOICE",
        weight: "7",
        right_answer: [
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
      },
    ],
  };

  const response_five = await fetch("http://localhost:7003/quiz/create", {
    method: "POST",
    headers: {
      authorization: token.toString(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(test_quiz_choice_one_rigth_answer_not_in_option),
  });

  expect(response_five.status).toBe(442);
});

it("create Quiz Objekt with answer", async () => {
  const test_quiz = {
    title: "Unit Test Create Quiz ",
    quizCategory: "ALLGEMEIN",
    beschreibung: "Unit Test Create Quiz ",
    required_points: 0.5,
    visibility: "private",
    questions: [
      {
        id: 1,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: 1,
        right_answer: true,
      },
      {
        id: 2,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: "2",
        right_answer: false,
      },
      {
        id: 3,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "2",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz tow",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz one",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz tow",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz three",
          },
        ],
      },
      {
        id: 4,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "3",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz  2",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz  1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz  2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz  3",
          },
        ],
      },
      {
        id: 5,
        question_value: "Unit Test Create Quiz JA",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Ja",
      },
      {
        id: 6,
        question_value: "Unit Test Create Quiz Nein",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Nein",
      },
      {
        id: 7,
        question_value: "Unit Test Create Quiz 1",
        category: "MULTIPLECHOICE",
        weight: "6",
        right_answer: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4",
          },
        ],
      },
      {
        id: 8,
        question_value: "Unit Test Create Quiz 2",
        category: "MULTIPLECHOICE",
        weight: "7",
        right_answer: [
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
      },
    ],
  };

  const quiz = await Quiz.findByPk(quiz_Id);

  const result = await create_quiz_objekt(quiz, true);

  expect(result.quizId === quiz_Id).toBeTruthy();
  expect(result.title === "Unit Test Create Quiz ").toBeTruthy();
  expect(result.beschreibung === "Unit Test Create Quiz ").toBeTruthy();
  expect(result.question_number === 8).toBeTruthy();
  expect(result.required_points === "50 %").toBeTruthy();
  expect(result.question_number === 8).toBeTruthy();
  expect(result.questions.length === 8).toBeTruthy();

  for (const question of result.questions) {
    expect(question.question_value).toBeTruthy();
    expect(question.right_answer).toBeTruthy();
  }
});

it("create Quiz Objekt with out answer", async () => {
  const test_quiz = {
    title: "Unit Test Create Quiz ",
    quizCategory: "ALLGEMEIN",
    beschreibung: "Unit Test Create Quiz ",
    required_points: 0.5,
    visibility: "private",
    questions: [
      {
        id: 1,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: 1,
        right_answer: true,
      },
      {
        id: 2,
        question_value: "Unit Test Create Quiz ",
        category: "TRUEORFALSE",
        weight: "2",
        right_answer: false,
      },
      {
        id: 3,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "2",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz tow",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz one",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz tow",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz three",
          },
        ],
      },
      {
        id: 4,
        question_value: "Unit Test Create Quiz ",
        category: "CHOICEONE",
        weight: "3",
        right_answer: {
          id: 2,
          value: "Unit Test Create Quiz  2",
        },
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz  1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz  2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz  3",
          },
        ],
      },
      {
        id: 5,
        question_value: "Unit Test Create Quiz JA",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Ja",
      },
      {
        id: 6,
        question_value: "Unit Test Create Quiz Nein",
        category: "FILLINTHEBLANK",
        weight: "4",
        right_answer: "Nein",
      },
      {
        id: 7,
        question_value: "Unit Test Create Quiz 1",
        category: "MULTIPLECHOICE",
        weight: "6",
        right_answer: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4",
          },
        ],
      },
      {
        id: 8,
        question_value: "Unit Test Create Quiz 2",
        category: "MULTIPLECHOICE",
        weight: "7",
        right_answer: [
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
        answers: [
          {
            id: 1,
            value: "Unit Test Create Quiz 1",
          },
          {
            id: 2,
            value: "Unit Test Create Quiz 2",
          },
          {
            id: 3,
            value: "Unit Test Create Quiz 3",
          },
          {
            id: 4,
            value: "Unit Test Create Quiz 4  ",
          },
        ],
      },
    ],
  };

  const quiz = await Quiz.findByPk(quiz_Id);

  const result = await create_quiz_objekt(quiz, false);

  expect(result.quizId === quiz_Id).toBeTruthy();
  expect(result.title === "Unit Test Create Quiz ").toBeTruthy();
  expect(result.beschreibung === "Unit Test Create Quiz ").toBeTruthy();
  expect(result.question_number === 8).toBeTruthy();
  expect(result.required_points === "50 %").toBeTruthy();
  expect(result.question_number === 8).toBeTruthy();
  expect(result.questions.length === 8).toBeTruthy();

  for (const question of result.questions) {
    expect(question.question_value).toBeTruthy();
    expect(question.right_answer).toBeFalsy();
  }
});

afterAll(async () => {
  await server.close();
});
