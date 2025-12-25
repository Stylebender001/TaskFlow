import express from "express";
import bcrpyt from "bcrypt";
import Users from "../models/user.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const user = await Users.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password");
  const validPassword = await bcrpyt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password");
  const token = user.generateAuthToken();
  const firstLogin = user.profileCompleted;
  res.json({
    id: user._id,
    username: user.username,
    email: user.email,
    role: user.role,
    token: token,
    firstLogin,
  });
});

export default router;
