import express from "express";
import auth from "../middleware/auth.js";
import customer from "../middleware/customer.js";
import worker from "../middleware/workers.js";
import Workers from "../models/workers.js";
import Jobs from "../models/job.js";
import Applications from "../models/application.js";
import Reviews from "../models/rating.js";
const router = express.Router();

//Customer Creates a Job Post.
router.post("/post", auth, customer, async (req, res) => {
  const job = new Jobs({
    customer: req.user._id,
    title: req.body.title,
    description: req.body.description,
    skillsRequired: req.body.skillsRequired,
    location: req.body.location,
  });
  await job.save();
  res.send(job);
});

//Customer update the post
router.put("/:id", auth, customer, async (req, res) => {
  const job = await Jobs.findById(req.params.id);
  if (!job) return res.status(404).send("Job not found");

  if (job.customer.toString() !== req.user._id.toString())
    return res.status(403).send("Access denied");

  job.title = req.body.title ?? job.title;
  job.description = req.body.description ?? job.description;
  job.skillsRequired = req.body.skillsRequired ?? job.skillsRequired;
  job.location = req.body.location ?? job.location;

  await job.save();
  res.send(job);
});

//Customer deletes the post
router.delete("/:id", auth, customer, async (req, res) => {
  const job = await Jobs.findById(req.params.id);
  if (!job) return res.status(404).send("Job not found");

  if (job.customer.toString() !== req.user._id.toString())
    return res.status(403).send("Access denied");

  await job.deleteOne();
  res.send({ message: "Job deleted successfully" });
});

//Worker Browses according to the skills.
router.get("/", auth, worker, async (req, res) => {
  const workerProfile = await Workers.findOne({ user: req.user._id });
  if (!workerProfile) return res.status(404).send("Worker profile not found");
  const jobs = await Jobs.find({
    status: "open",
    skillsRequired: { $in: workerProfile.skills },
  });
  res.send(jobs);
});

//Worker can apply to the job.
router.post("/:jobId/apply", auth, worker, async (req, res) => {
  const proposedPrice = req.body.proposedPrice;
  const jobId = req.params.jobId;
  const workerId = req.user._id;
  const job = await Jobs.findById(jobId);
  if (!job) return res.status(404).send("Job not found");

  let existingApplication = await Applications.findOne({
    job: jobId,
    worker: workerId,
  });
  if (existingApplication)
    return res.status(400).send("You already applied for this job");
  const application = new Applications({
    job: jobId,
    worker: workerId,
    customer: job.customer,
    proposedPrice: proposedPrice,
  });
  await application.save();
  res.send("Applied successfully");
});

//Worker cancelled the application
router.post("/:jobId/cancel", auth, worker, async (req, res) => {
  const jobId = req.params.jobId;
  const workerId = req.user._id;

  const application = await Applications.findOne({
    job: jobId,
    worker: workerId,
    status: "accepted",
  });

  if (!application)
    return res.status(404).send("No accepted application found");

  application.status = "cancelled";
  await application.save();

  const job = await Jobs.findById(jobId);
  job.assignedWorkers = job.assignedWorkers.filter(
    (w) => w.worker.toString() !== workerId.toString()
  );

  // If no workers assigned, set job back to open
  if (job.assignedWorkers.length < job.workersNeeded) job.status = "open";

  await job.save();

  res.send({ message: "You have cancelled the job" });
});

//Customer can view the workers who applied for the job.
router.get("/:jobId/applicants", auth, customer, async (req, res) => {
  const jobId = req.params.jobId;
  const job = await Jobs.findById(jobId);
  if (!job) return res.status(404).send("Job not found");
  if (job.customer.toString() !== req.user._id)
    return res.status(403).send("Access Denied");
  const applicants = await Applications.find({ job: jobId }).populate(
    "worker",
    "username skills rating totalReviews location proposedPrice"
  );
  const ranked = [];
  for (const app of Applications) {
    const workerProfile = await Workers.findOne({ user: app.worker._id });

    let skillScore = 0;
    workerProfile.skills.forEach((ws) => {
      if (job.skillsRequired.includes(ws.skill)) {
        skillScore += ws.level * 2;
      }
    });
    const totalScore = skillScore + workerProfile.rating;

    ranked.push({
      application: app,
      score: totalScore,
      rating: workerProfile.rating,
    });
  }

  ranked.sort((a, b) => b.score - a.score);

  res.send(ranked);
});

//Customer chooses the worker for the job
router.put("/:jobId/applicants/:appId", auth, customer, async (req, res) => {
  const { jobId, appId } = req.params;
  const { status } = req.body;

  const application = await Applications.findById(appId);
  if (!application) return res.status(404).send("Application not found");

  const job = await Jobs.findById(jobId);
  if (!job) return res.status(404).send("Job not found");

  if (job.customer.toString() !== req.user._id.toString())
    return res.status(403).send("Access Denied");

  if (job.assignedWorkers.length >= job.workersNeeded)
    return res.status(400).send("Worker limit reached");

  application.status = status;
  await application.save();

  if (status === "assigned") {
    job.assignedWorkers.push({
      worker: application.worker,
      agreedPrice: application.proposedPrice,
    });
    await job.save();
  }

  res.send(application);
});

//Customer rates the worker after task is completed
router.post("/:jobId/review", auth, customer, async (req, res) => {
  const { rating, comment } = req.body;
  const job = await Jobs.findById(req.params.jobId);

  if (!job) return res.status(404).send("Job not found");
  if (job.status !== "completed")
    return res.status(400).send("Job not completed yet");
  for (const assignedWorker of job.assignedWorkers) {
    const existingReview = await Reviews.findOne({
      job: job._id,
      worker: assignedWorker.worker,
    });
    if (existingReview) continue;

    const review = new Reviews({
      job: job._id,
      customer: req.user._id,
      worker: assignedWorker.worker,
      rating,
      comment,
    });

    await review.save();

    // Update worker rating summary
    const workerProfile = await Workers.findOne({
      user: assignedWorker.worker,
    });
    workerProfile.rating =
      (workerProfile.rating * workerProfile.totalReviews + rating) /
      (workerProfile.totalReviews + 1);
    workerProfile.totalReviews += 1;
    await workerProfile.save();
  }
  res.send({ message: "Review(s) submitted successfully" });
});

export default router;
