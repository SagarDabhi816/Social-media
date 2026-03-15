const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerController(req, res) {
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
      password: await bcrypt.hash(password, 10),
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

async function loginController(req, res) {
  const { username, password } = req.body;

  const userExists = await userModel.findOne({ username });

  if (!userExists) {
    return res.status(409).json({
      message: "User does not exists please register",
    });
  }
  const isPasswordValid = await bcrypt.compare(password, userExists.password);

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

module.exports = {
  registerController,
  loginController,
};
