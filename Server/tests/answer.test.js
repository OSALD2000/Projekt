import { it, expect, beforeAll, afterAll } from 'vitest';
import answer from '../module/chart/answer';
const app = require('../app');
const Quiz = require('../module/quiz/quiz');
const QUESTIONTYPE = require('../module/enum/QUESTIONTYPE');
const create_quiz_objekt = require('../util/quiz/create_quiz_object');

let server;
let token;
let quiz_objekt;

beforeAll(async () => {
    server = app.listen(7007);
    const userData = {
        email: "1-user@test.de",
        password: "root",
    }

    const response = await fetch("http://localhost:7007/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    })

    const data = await response.json();


    const userData_answer = {
        email: "2-user@test.de",
        password: "root",
    }

    const response_two = await fetch("http://localhost:7007/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData_answer),
    })

    const data_tow = await response_two.json();
    token = data_tow.token;

    const test_quiz = {
        "title": "Unit Test Create Quiz ",
        "quizCategory": "ALLGEMEIN",
        "beschreibung": "Unit Test Create Quiz ",
        "required_points": 0.5,
        "visibility": "private",
        "questions": [
            {
                "id": 1,
                "question_value": "Unit Test Create Quiz ",
                "category": "TRUEORFALSE",
                "weight": 1,
                "right_answer": true
            },
            {
                "id": 2,
                "question_value": "Unit Test Create Quiz ",
                "category": "TRUEORFALSE",
                "weight": "2",
                "right_answer": false
            },
            {
                "id": 3,
                "question_value": "Unit Test Create Quiz ",
                "category": "CHOICEONE",
                "weight": "2",
                "right_answer": {
                    "id": 2,
                    "value": "Unit Test Create Quiz tow"
                },
                "answers": [
                    {
                        "id": 1,
                        "value": "Unit Test Create Quiz one"
                    },
                    {
                        "id": 2,
                        "value": "Unit Test Create Quiz tow"
                    },
                    {
                        "id": 3,
                        "value": "Unit Test Create Quiz three"
                    }
                ]
            },
            {
                "id": 4,
                "question_value": "Unit Test Create Quiz ",
                "category": "CHOICEONE",
                "weight": "3",
                "right_answer": {
                    "id": 2,
                    "value": "Unit Test Create Quiz  2"
                },
                "answers": [
                    {
                        "id": 1,
                        "value": "Unit Test Create Quiz  1"
                    },
                    {
                        "id": 2,
                        "value": "Unit Test Create Quiz  2"
                    },
                    {
                        "id": 3,
                        "value": "Unit Test Create Quiz  3"
                    }
                ]
            },
            {
                "id": 5,
                "question_value": "Unit Test Create Quiz JA",
                "category": "FILLINTHEBLANK",
                "weight": "4",
                "right_answer": "Ja"
            },
            {
                "id": 6,
                "question_value": "Unit Test Create Quiz Nein",
                "category": "FILLINTHEBLANK",
                "weight": "4",
                "right_answer": "Nein"
            },
            {
                "id": 7,
                "question_value": "Unit Test Create Quiz 1",
                "category": "MULTIPLECHOICE",
                "weight": "6",
                "right_answer": [
                    {
                        "id": 1,
                        "value": "Unit Test Create Quiz 1"
                    },
                    {
                        "id": 3,
                        "value": "Unit Test Create Quiz 3"
                    }
                ],
                "answers": [
                    {
                        "id": 1,
                        "value": "Unit Test Create Quiz 1"
                    },
                    {
                        "id": 2,
                        "value": "Unit Test Create Quiz 2"
                    },
                    {
                        "id": 3,
                        "value": "Unit Test Create Quiz 3"
                    },
                    {
                        "id": 4,
                        "value": "Unit Test Create Quiz 4"
                    }
                ]
            },
            {
                "id": 8,
                "question_value": "Unit Test Create Quiz 2",
                "category": "MULTIPLECHOICE",
                "weight": "7",
                "right_answer": [
                    {
                        "id": 2,
                        "value": "Unit Test Create Quiz 2"
                    },
                    {
                        "id": 4,
                        "value": "Unit Test Create Quiz 4  "
                    }
                ],
                "answers": [
                    {
                        "id": 1,
                        "value": "Unit Test Create Quiz 1"
                    },
                    {
                        "id": 2,
                        "value": "Unit Test Create Quiz 2"
                    },
                    {
                        "id": 3,
                        "value": "Unit Test Create Quiz 3"
                    },
                    {
                        "id": 4,
                        "value": "Unit Test Create Quiz 4  "
                    }
                ]
            }
        ]
    }


    const response_three = await fetch("http://localhost:7007/quiz/create", {
        method: "POST",
        headers: {
            'authorization': data.token.toString(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(test_quiz),
    });

    const { quizId } = await response_three.json();

    const quiz = await Quiz.findByPk(quizId);

    quiz_objekt = await create_quiz_objekt(quiz, true);
})

it("answer quiz", async () => {
    const answers = {
        quizId: quiz_objekt.quizId,
        questions: []
    }

    console.log(quiz_objekt);

    for (const question of quiz_objekt.questions) {
        switch (question.category) {
            case QUESTIONTYPE.TRUEORFALSE:
                answers.questions.push(
                    {
                        questionId: question.questionId,
                        category: question.category,
                        answer: question.right_answer ? true : false,
                    }
                )
                break;
            case QUESTIONTYPE.CHOICEONE:
                answers.questions.push(
                    {
                        questionId: question.questionId,
                        category: question.category,
                        answer: question.right_answer,
                    }
                )
                break;

            case QUESTIONTYPE.MULTIPLECHOICE:
                answers.questions.push({
                    questionId: question.questionId,
                    category: question.category,
                    answer: question.right_answer.map(answer => {
                        return {
                            value: answer
                        }
                    })
                })
                break;
            case QUESTIONTYPE.FILLINTHEBLANK:
                answers.questions.push(
                    {
                        questionId: question.questionId,
                        category: question.category,
                        answer: question.right_answer,
                    }
                )
                break;
        }
    }

    const response = await fetch("http://localhost:7007/quiz/answer", {
        method: "POST",
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(answers),
    });

    expect(response.status).toBe(200);

})

afterAll(async () => {
    await server.close();
})
