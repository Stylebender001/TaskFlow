import express from "express";
import Users from "../models/user.js";
import Customers from "../models/customer.js";
import customer from "../middleware/customer.js";
import auth from "../middleware/auth.js";
import { validateCustomer } from "../validation/customer.js";
const router = express.Router();

router.post("/setup", auth, customer, async (req, res) => {
  if (req.user.role != "customer")
    return res.status(403).send("Access denied — not a customer.");
  const userId = req.user._id;
  let customer = await Customers.findOne({ user: userId });
  if (customer) return res.status(403).send("Customer Profile already exists.");
  const { error } = validateCustomer(req.body);
  if (error) return res.status(403).send(error.details[0].message);
  const location = {
    city: req.body.location.city,
    state: req.body.location.state,
    country: req.body.location.country,
  };
  customer = new Customers({
    user: userId,
    fullName: req.body.fullName,
    location,
    phoneNo: req.body.phoneNo,
  });

  await Users.findByIdAndUpdate(userId, {
    profileCompleted: true,
  });

  await customer.save();
  res.send(customer);
  res.json({
    customer,
    profileCompleted: true,
  });
});

router.get("/profile", auth, customer, async (req, res) => {
  if (req.user.role != "customer")
    return res.status(403).send("Access denied — not a customer.");
  const customer = await Customers.findOne({ user: req.user._id }).populate(
    "user",
    "username"
  );
  res.send(customer);
});

router.put("/setup", auth, customer, async (req, res) => {
  if (req.user.role != "customer")
    return res.status(403).send("Access denied — not a customer.");
  const userId = req.user._id;
  const customer = await Customers.findOne({ user: userId });
  if (!customer) return res.status(403).send("Customer not found");
  const { error } = validateCustomer(req.body);
  if (error) return res.status(403).send(error.details[0].message);
  const updatedCustomer = await Customers.findByid(userId);
  updatedCustomer.location = req.body.location ?? updatedCustomer.location;
  updatedCustomer.phoneNo = req.body.phoneNo ?? updatedCustomer.phoneNo;
  res.send(updatedCustomer);
});

export default router;
