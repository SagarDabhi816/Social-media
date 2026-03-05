const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");


async function testController(req,res) {
    await console.log("working")
     await res.send("yeahhh");
}

async function registerController(req,res) {
    const { username, password } = req.body;

  const isRegistered = await userModel.findOne({ username });

  if (isRegistered) {
    return res.status(409).json({
      message: "User Already Registered",
    });
  }

  try {
    const user = await userModel.create({
      username: username,
      password: password,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);
    res.json({
      message: "User Created Successfully",
    });
  } catch (error) {
    console.error("Error occured", error);
  }
}

async function loginController(req,res) {
    const { username, password } = req.body;

  const userExists = await userModel.findOne({ username });

  if (!userExists) {
    return res.status(409).json({
      message: "User does not exists please register",
    });
  }
  const isPasswordValid = userExists.password === password

  if (!isPasswordValid) {
    return res.status(409).json({
      message: "Incorrect Password",
    });
  }

  const token = jwt.sign(
      {
        id: userExists._id,
      },
      process.env.JWT_SECRET,
    );

    res.cookie("token", token);

  res.status(200).json({
    message: "Logged In successfully",
  });

}

async function logoutController(params) {
    
    
}

module.exports = {
    testController,
    registerController,
    loginController,
    logoutController
}