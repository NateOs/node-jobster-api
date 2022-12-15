const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  // if (!email || !password || !name) {  //* redundant validation because of mongoose validation, still useful on other controllers
  //   throw new BadRequestError("Please supply email, password and name");
  // }

  const user = await User.create({ name, email, password });
  const token = user.createJWT();
  
  res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
};

const login = async (req, res) => {
  res.send("login user");
};

module.exports = {
  register,
  login,
};
