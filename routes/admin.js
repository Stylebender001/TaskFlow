import express from "express";
import Users from "../models/user.js";
import auth from "../middleware/auth.js";
import admin from "../middleware/admin.js";
import Skills from "../models/skills.js";

const router = express.Router();

router.get("/all-users", auth, admin, async (req, res) => {
  const users = await Users.find().select("-password");
  res.send(users);
});
router.post("/skills", auth, admin, async (req, res) => {
  const skill = new Skills({
    name: req.body.name,
    category: req.body.category,
  });
  await skill.save();
  res.send(skill);
});
router.get("/all-skills", auth, admin, async (req, res) => {
  const skills = await Skills.find();
  res.send(skills);
});

export default router;
