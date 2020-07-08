const router = require("express").Router();
const User = require("../model/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { RegisterValidate, LoginValidate } = require("../validation");

//------------------------ user registeration-------------------//

router.post("/register", async (req, res) => {
  // Lets validate the data before push DB
  const { error } = RegisterValidate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check deplicate the User
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).send({ message: "Email already exist" });

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const HashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: HashedPassword,
  });

  try {
    const saveuser = await user.save();
    res.send({ user: user.name, userID: user._id });
  } catch (err) {
    res.send({ error: err });
  }
});

//------------------------ user Login-------------------//

router.post("/login", async (req, res) => {
  // Lets validate the data before push DB
  const { error } = LoginValidate(req.body);
  if (error) return res.status(400).send({ message: error.details[0].message });

  // Check deplicate the User
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send({ message: "Email doesn't exist" });

  //Valid password
  const validpass = await bcrypt.compare(req.body.password, user.password);
  if (!validpass) return res.status(400).send({ message: "Invalid Password" });

  // create token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

  res
    .header("auth-token", token)
    .send({ "jwt-token": token, LoggedIn: "sucessful" });
});

module.exports = router;
