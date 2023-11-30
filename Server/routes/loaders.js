const express = require("express");

const is_auth = require("../middleware/is-auth");

const loaderController = require("../controller/loader");

const router = express.Router();


router.get("/user",is_auth, loaderController.loadUserDaten);

router.get("/categorys", loaderController.loadCategory);

router.get("/quiz/participants/:quizId",is_auth, loaderController.loadParticipants);

router.get("/quiz/participant/:quizId/:participantId",is_auth, loaderController.loadParticipant);

router.get("/quiz/:quizId",is_auth, loaderController.loadQuiz);

router.get("/quizes/:category",is_auth, loaderController.loadQuizes);

module.exports = router;