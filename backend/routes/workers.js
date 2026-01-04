import express from "express";
import auth from "../middleware/auth.js";
import worker from "../middleware/workers.js";
import Workers from "../models/workers.js";
import { validateWorker } from "../validation/worker.js";
import Users from "../models/user.js";
const router = express.Router();

router.post("/setup", auth, worker, async (req, res) => {
  if (req.user.role !== "worker")
    return res.status(403).send("Access denied — not a worker.");
  const userId = req.user._id;
  let worker = await Workers.findOne({ user: userId });
  if (worker) return res.status(400).send("Worker profile already existed");
  const { error } = validateWorker(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const skills = req.body.skills.map((s) => ({
    skill: s.skill,
    level: s.level,
  }));
  const location = {
    city: req.body.location.city,
    state: req.body.location.state,
    country: req.body.location.country,
  };

  worker = new Workers({
    user: userId,
    fullName: req.body.fullName,
    skills,
    location,
    description: req.body.description,
  });
  await Users.findByIdAndUpdate(userId, {
    profileCompleted: true,
  });

  await worker.save();
  res.send(worker);
  res.json({
    worker,
    profileCompleted: true,
  });
});

router.get("/profile", auth, worker, async (req, res) => {
  if (req.user.role !== "worker")
    return res.status(403).send("Access denied — not a worker.");
  const workerProfile = await Workers.findOne({ user: req.user._id }).populate(
    "user",
    "username"
  );
  res.send(workerProfile);
});

router.put("/setup", auth, worker, async (req, res) => {
  if (req.user.role != "worker")
    return res.status(403).send("Access denied — not a worker.");
  const userId = req.user._id;
  const { error } = validateWorker(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const updatedWorker = await Workers.findById(userId);
  updatedWorker.skills = req.body.skills ?? updatedWorker.skills;
  updatedWorker.description = req.body.description ?? updatedWorker.description;
  updatedWorker.location = req.body.location ?? updatedWorker.location;
  res.send(updatedWorker);
});

export default router;
