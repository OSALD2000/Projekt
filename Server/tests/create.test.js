import { it, expect, beforeAll, afterAll } from 'vitest';
const app = require('../app');
const Quiz = require('../module/quiz/quiz');

let server;
let token;
beforeAll(async () => {
    server = app.listen(7004);
    const userData = {
        email: "1-user@test.de",
        password: "root",
    }

    const response = await fetch("http://localhost:7004/auth/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData),
    })

    const data = await response.json();

    token = data.token;
})

it('create Quiz', async () =>{
    const test_quiz ={
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

    const response = await fetch("http://localhost:7004/quiz/create" , {
        method: "POST",
        headers: {
            'authorization': token.toString(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(test_quiz),
    });

    expect(response.status).toBe(201);

    const {quizId} = await response.json();
    const quiz = await Quiz.findByPk(quizId);

    expect(quiz).toBeDefined()


    expect(quiz.getDataValue('title')).toBe(test_quiz.title)

    const questions = await quiz.getQuestions();

    expect(questions.length).toBe(test_quiz.questions.length)
})


afterAll(async () => {
    await server.close();
})