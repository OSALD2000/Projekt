const express = require("express");

const is_admin = require('../middleware/is-admin');
const adminController = require("../controller/admin/admin");

const router = express.Router();

router.get('/controlerPanel/data', is_admin, adminController.loadData);

router.get('/user/delete/:userId', is_admin, adminController.deleteUser);

router.get('/quiz/delete/:quizId', is_admin, adminController.deleteQuiz);

router.get('/statistic/:quizId', is_admin, adminController.loadQuizStatic);

router.get('/user/quiz/:userId/:quizId', is_admin, adminController.loadUserQuiz);

router.get('/search/quiz/:arg', is_admin, adminController.searchQuiz);

router.get('/search/user/:arg', is_admin, adminController.searchUser);

router.get('/user/profile/:userId', is_admin, adminController.viewUserProfiel);

module.exports = router;
