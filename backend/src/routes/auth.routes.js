const express = require('express');
const authRouter = express.Router();
const authController = require("../controllers/auth.controller");
const authMiddleware = require('../middlewares/auth.middleware');

authRouter.post("/register",authController.registerController)

authRouter.post("/login", authController.loginController)

authRouter.get("/getMe",authMiddleware,authController.getMeController)

module.exports = authRouter