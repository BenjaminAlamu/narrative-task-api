const express = require("express");
const router = new express.Router();

const userRouter = require("./user.route.js");
const authRouter = require("./auth.route.js");
const buyOrderRouter = require("./buyOrder.route.js");
router.use("/user", userRouter);
router.use("/auth", authRouter);
router.use("/buy-order", buyOrderRouter);
module.exports = router;
