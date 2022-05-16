const express = require("express");
const validate = require("../helpers/validate");
const buyOrderController = require("../controllers/buyOrder.controller");
const buyOrderValidation = require("../policies/buyOrder.policy");
const { authService } = require("../services");

const router = express.Router();

router.post(
  "/create",
  [authService.validateToken, validate(buyOrderValidation.createBuyOrder)],
  buyOrderController.createBuyOrder
);

router.get("/all", [authService.validateToken], buyOrderController.list);

router.put(
  "/update/:_id",
  [authService.validateToken, validate(buyOrderValidation.createBuyOrder)],
  buyOrderController.edit
);

router.get("/:_id", [authService.validateToken], buyOrderController.listOne);

router.delete(
  "/delete/:_id",
  [authService.validateToken],
  buyOrderController.deleteBuyOrder
);

module.exports = router;
