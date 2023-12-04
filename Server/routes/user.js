const express = require("express");

const is_auth = require('../middleware/is-auth');
const userController = require("../controller/user/user");

const router = express.Router();

//TODO: 1. get chartData
//          1.1 donatChat 
//          1.2 chart_bar_data
//      
//      2. get user answer  



router.get("/profile/daten", is_auth, userController.loadUserDaten);

module.exports = router;
