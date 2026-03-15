const express = require("express");
const Router = express.Router();
const {
  registerController,
  loginController,
} = require("../controllers/auth.controller");

Router.post("/register", registerController);
Router.post("/login", loginController);

module.exports = Router;
