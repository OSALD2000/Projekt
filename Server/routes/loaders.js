const express = require("express");

const loaderController = require("../controller/loader");

const router = express.Router();

router.get("/categorys", loaderController.loadCategory);

module.exports = router;
