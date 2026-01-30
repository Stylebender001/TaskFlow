import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from   "../../api/axios";  

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    role: "customer",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/signup", form);
      alert("Registration Successful. You can login now.");
      navigate("/login");
    } catch (err) {
      setError(err.response?.data || "Registration Failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="fixed inset-0 z-0 grid grid-cols-2 md:grid-cols-3 gap-0">
        <img
          src="/images/electrician.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <img
          src="/images/plumbing.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20"
        />
        <img
          src="/images/waiter.jpg"
          alt=""
          className="w-full h-full object-cover opacity-20 hidden md:block"
        />
        <div className="absolute inset-0 bg-black opacity-20"></div>
      </div>

      <div className="realtive z-10 bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">TaskFlow</h1>
          <p className="text-gray-600">Create your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-700 text-sm rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={isLoading}
            />
          </div>

          {/* Role Selection with visual buttons */}
          <div>
            <label className="block text-sm text-gray-700 mb-3">
              I want to join as:
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "customer" })}
                className={`h-14 rounded-lg border-2 flex flex-col items-center justify-center transition ${
                  form.role === "customer"
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                }`}
              >
                <span className="font-semibold">Customer</span>
                <span className="text-xs mt-1">I need services</span>
              </button>
              <button
                type="button"
                onClick={() => setForm({ ...form, role: "worker" })}
                className={`h-14 rounded-lg border-2 flex flex-col items-center justify-center transition ${
                  form.role === "worker"
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-gray-300 hover:border-gray-400 text-gray-700"
                }`}
              >
                <span className="font-semibold">Worker</span>
                <span className="text-xs mt-1">I offer services</span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Creating account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t text-center">
          <p className="text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
