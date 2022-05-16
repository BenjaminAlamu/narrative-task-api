const express = require("express");
const validate = require("../helpers/validate");
const authController = require("../controllers/auth.controller");
const authValidation = require("../policies/auth.policy");
const { authService } = require("../services");

const router = express.Router();

router.post(
  "/register",
  [validate(authValidation.register)],
  authController.register
);

router.post("/login", [validate(authValidation.login)], authController.login);
module.exports = router;


router.get("/users", [authService.validateToken], authController.getUsers);

router.get("/", [authService.validateToken], authController.getUser);
module.exports = router;
