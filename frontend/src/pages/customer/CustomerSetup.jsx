import React, { useState, useEffect, useContext } from "react";
import api from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export default function CustomerSetup() {
  const { user, role, login, completeProfile } = useContext(AuthContext);
  const [form, setForm] = useState({
    fullName: "",
    phoneNo: "",
    city: "",
    state: "",
    country: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/customers/me");
        setForm({
          fullName: res.data.fullName || "",
          phoneNo: res.data.phoneNo || "",
          city: res.data.location?.city || "",
          state: res.data.location?.state || "",
          country: res.data.location?.country || "",
        });
      } catch (err) {
        console.log("Profile fetch failed", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };
  // Add this function to test the endpoint
const testEndpoint = async () => {
  console.log("🧪 Testing endpoint...");
  
  try {
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    
    const response = await fetch("http://localhost:4000/api/workers/setup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
      body: JSON.stringify({
        fullName: "Test Worker",
        description: "Test description",
        location: { city: "Test", state: "Test", country: "Test" },
        skills: [{ skill: "test-skill-id", level: 3 }],
      }),
    });
    
    console.log("Test response status:", response.status);
    const text = await response.text();
    console.log("Test response text:", text);
    
  } catch (err) {
    console.log("Test error:", err);
  }
};

// Call it somewhere in your component or add a test button

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!form.fullName || !form.phoneNo || !form.city || !form.state || !form.country) {
      setError("Please fill in all required fields");
      return;
    }
    
    setLoading(true);

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

      login({
        user,
        role,
        token: localStorage.getItem("token"),
        profileCompleted: true,
      });
      completeProfile();

      navigate("/customer/dashboard");

    } catch (err) {
      setError(err.response?.data?.message || "Setup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-2xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Complete Your Profile
          </h1>
          <p className="text-gray-600">
            A few more details to personalize your TaskFlow experience
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Full Name
            </label>
            <input
              name="fullName"
              placeholder="Enter your full name"
              value={form.fullName}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              required
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              name="phoneNo"
              placeholder="Enter your phone number"
              value={form.phoneNo}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
              required
            />
          </div>

          {/* Location Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* City */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                name="city"
                placeholder="City"
                value={form.city}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
                required
              />
            </div>

            {/* State */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                name="state"
                placeholder="State"
                value={form.state}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
                required
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <input
                name="country"
                placeholder="Country"
                value={form.country}
                onChange={handleChange}
                className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              This information helps us connect you with local service providers and show relevant tasks in your area.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Saving Profile...
              </>
            ) : (
              "Complete Profile Setup"
            )}
          </button>
        </form>

        {/* Skip for now link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/customer/dashboard")}
            className="text-gray-500 hover:text-gray-700 text-sm hover:underline"
            disabled={loading}
          >
            Complete setup later
          </button>
          <button
            onClick={testEndpoint}
            className="text-gray-500 hover:text-gray-700 text-sm hover:underline ml-4"
            disabled={loading}
          >
            Test Endpoint
          </button>
        </div>
      </div>
    </div>
  );
}