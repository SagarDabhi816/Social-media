// const express = require("express");
// const jwt = require("jsonwebtoken");
// const userModel = require("../models/user.model");
// const Router = express.Router();
// const {test} = require("../controllers/auth.controller")

// Router.get("/test",async (req,res)=>{
//   await test(req,res)
// });

// Router.post("/register", async (req, res) => {
//   const { username, password } = req.body;

//   const isRegistered = await userModel.findOne({ username });

//   if (isRegistered) {
//     return res.status(409).json({
//       message: "User Already Registered",
//     });
//   }

//   try {
//     const user = await userModel.create({
//       username: username,
//       password: password,
//     });

//     const token = jwt.sign(
//       {
//         id: user._id,
//       },
//       process.env.JWT_SECRET,
//     );

//     res.cookie("token", token);
//     res.json({
//       message: "User Created Successfully",
//     });
//   } catch (error) {
//     console.error("Error occured", error);
//   }
// });

// Router.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   const userExists = await userModel.findOne({ username });

//   if (!userExists) {
//     return res.status(409).json({
//       message: "User does not exists please register",
//     });
//   }

//   if (password !== userExists.password) {
//     return res.status(409).json({
//       message: "Incorrect Password",
//     });
//   }

//   res.status(200).json({
//     message: "Logged In successfully",
//   });

// });

// module.exports = Router;


const express = require("express");
const Router = express.Router();
const {registerController , loginController, testController} = require("../controllers/auth.controller")

Router.get("/test",testController);

Router.post("/register",registerController);

Router.post("/login",loginController);

module.exports = Router;
