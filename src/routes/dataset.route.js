const express = require("express");
const datasetController = require("../controllers/data.controller");
const { authService } = require("../services");

const router = express.Router();


router.get("/", datasetController.list);


module.exports = router;
