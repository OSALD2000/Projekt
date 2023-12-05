const express = require("express");

const is_auth = require('../middleware/is-auth');
const statisticController = require("../controller/statistic/statistic");

const router = express.Router();


router.get('/info/charts/:quizId', is_auth, statisticController.loadStatistic);

module.exports = router;
