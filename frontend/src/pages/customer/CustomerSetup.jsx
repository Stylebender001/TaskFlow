import React from "react";
import { useState } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";

export default function CustomerSetup() {
  const [form, setForm] = useState({
    fullName: "",
    phoneNo: "",
    city: "",
    state: "",
    country: "",
  });
  const Navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/customers/setup", {
        fullName: form.fullName,
        phoneNo: form.phoneNo,
        location: {
          city: form.city,
          state: form.state,
          country: form.country,
        },
      });
      alert("Customer Setup Completed Successfully.");
      Navigate("/dashboard");
    } catch (err) {
      alert(
        "Customer Setup Failed. Try again." +
          (err.response?.data || "Please try again")
      );
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Customer Setup
          </h2>

          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="phoneNo"
            placeholder="Phone Number"
            value={form.phoneNo}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="state"
            placeholder="State"
            value={form.state}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            name="country"
            placeholder="Country"
            value={form.country}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
          >
            Complete Profile Setup
          </button>
        </form>
      </div>
    </div>
  );
}
