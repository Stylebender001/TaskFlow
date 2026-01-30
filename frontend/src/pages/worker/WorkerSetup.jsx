import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { AuthContext } from "../../context/AuthContext";

export default function WorkerSetup() {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    description: "",
    city: "",
    state: "",
    country: "",
    skills: [{ skill: "", level: 1 }],
  });

  const navigate = useNavigate();
  const { completeProfile } = useContext(AuthContext);

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/admin/all-skills");
        setSkills(response.data);
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    fetchSkills();
  }, []);

  // Group skills by category for select UI
  const groupedSkills = skills.reduce((acc, skill) => {
    acc[skill.category] = acc[skill.category] || [];
    acc[skill.category].push(skill);
    return acc;
  }, {});

  // Handle text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (error) setError("");
  };

  // Handle skill changes
  const handleSkillChange = (index, field, value) => {
    const newSkills = [...form.skills];
    newSkills[index][field] = value;
    setForm({ ...form, skills: newSkills });
  };

  // Add new skill row
  const addSkill = () => {
    if (form.skills.length < 10) {
      setForm({ ...form, skills: [...form.skills, { skill: "", level: 1 }] });
    }
  };

  // Remove skill row
  const removeSkill = (index) => {
    if (form.skills.length > 1) {
      const newSkills = form.skills.filter((_, i) => i !== index);
      setForm({ ...form, skills: newSkills });
    }
  };

  // Submit worker setup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validation
    if (
      !form.fullName ||
      !form.description ||
      !form.city ||
      !form.state ||
      !form.country
    ) {
      setError("Please fill in all required fields");
      return;
    }

    // Check if all skills are selected
    const emptySkills = form.skills.filter((s) => !s.skill);
    if (emptySkills.length > 0) {
      setError("Please select a skill for all entries");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/workers/setup", {
        fullName: form.fullName,
        description: form.description,
        location: { city: form.city, state: form.state, country: form.country },
        skills: form.skills.map((s) => ({ skill: s.skill, level: s.level })),
      });

      console.log("Worker setup response:", response.data.message);

      completeProfile();
      navigate("/worker/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Setup failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10 w-full max-w-3xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-blue-600 mb-3">
            Complete Your Worker Profile
          </h1>
          <p className="text-gray-600">
            Tell us about your skills and experience to start finding work
          </p>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your experience, expertise, and what services you offer..."
                value={form.description}
                onChange={handleChange}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={loading}
                required
              />
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Location
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
          </div>

          {/* Skills Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">Skills</h3>
              <button
                type="button"
                onClick={addSkill}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                disabled={loading || form.skills.length >= 10}
              >
                + Add Skill
              </button>
            </div>

            <div className="space-y-4">
              {form.skills.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col md:flex-row gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Skill {i + 1}
                    </label>
                    <select
                      value={s.skill}
                      onChange={(e) =>
                        handleSkillChange(i, "skill", e.target.value)
                      }
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                      required
                    >
                      <option value="">Select a skill</option>
                      {Object.entries(groupedSkills).map(
                        ([category, categorySkills]) => (
                          <optgroup key={category} label={category}>
                            {categorySkills.map((skill) => (
                              <option key={skill._id} value={skill._id}>
                                {skill.name}
                              </option>
                            ))}
                          </optgroup>
                        )
                      )}
                    </select>
                  </div>

                  <div className="w-full md:w-48">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Proficiency Level
                    </label>
                    <select
                      value={s.level}
                      onChange={(e) =>
                        handleSkillChange(i, "level", Number(e.target.value))
                      }
                      className="w-full h-12 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={loading}
                    >
                      <option value="1">⭐ Beginner</option>
                      <option value="2">⭐⭐ Intermediate</option>
                      <option value="3">⭐⭐⭐ Advanced</option>
                      <option value="4">⭐⭐⭐⭐ Expert</option>
                      <option value="5">⭐⭐⭐⭐⭐ Master</option>
                    </select>
                  </div>

                  {form.skills.length > 1 && (
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => removeSkill(i)}
                        className="h-12 px-4 text-red-600 hover:text-red-800 font-medium"
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-sm text-gray-500 mt-2">
              Add up to 10 skills that best represent your expertise
            </p>
          </div>

          {/* Info Box */}
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-700">
              Your profile will be visible to customers looking for services.
              Complete and accurate information helps you get more relevant job
              opportunities.
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
              "Complete Setup & Start Finding Work"
            )}
          </button>
        </form>

        {/* Skip for now link */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/worker/dashboard")}
            className="text-gray-500 hover:text-gray-700 text-sm hover:underline"
            disabled={loading}
          >
            Complete setup later
          </button>
        </div>
      </div>
    </div>
  );
}
