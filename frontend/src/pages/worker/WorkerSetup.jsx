import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";

export default function WorkerSetup() {
  const [skills, setSkills] = useState([]);
  const [form, setForm] = useState({
    fullName: "",
    description: "",
    city: "",
    state: "",
    country: "",
    skills: [{ skill: "", level: 1 }],
  });

  const navigate = useNavigate();

  // Fetch skills from backend
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await api.get("/admin/all-skills");
        setSkills(response.data);
        console.log("Fetched skills:", response.data);
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
  };

  // Handle skill changes
  const handleSkillChange = (index, field, value) => {
    const newSkills = [...form.skills];
    newSkills[index][field] = value;
    setForm({ ...form, skills: newSkills });
  };

  // Add new skill row
  const addSkill = () => {
    setForm({ ...form, skills: [...form.skills, { skill: "", level: 1 }] });
  };

  // Remove skill row
  const removeSkill = (index) => {
    const newSkills = form.skills.filter((_, i) => i !== index);
    setForm({ ...form, skills: newSkills });
  };

  // Submit worker setup form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/workers/setup", {
        fullName: form.fullName,
        description: form.description,
        location:{
          city: form.city,
          state: form.state,
          country: form.country,
        },
        skills: form.skills.map((s) => ({
          skill: s.skill,
          level: s.level,
        })),
      });
      alert("Worker Setup Completed Successfully.");
      navigate("/dashboard");
    } catch (err) {
      alert(
        "Worker Setup Failed. Try again. " + (err.response?.data || "")
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          <h2 className="text-2xl font-bold mb-4 text-center">Worker Setup</h2>
          <input
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600"
          />

          <textarea
            name="description"
            placeholder="Describe yourself"
            value={form.description}
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

          <h3 className="font-semibold mt-4">Skills</h3>
          {form.skills.map((s, i) => (
            <div key={i} className="flex gap-2 items-center mt-2">
              <select
                value={s.skill}
                onChange={(e) => handleSkillChange(i, "skill", e.target.value)}
                className="border rounded px-2 flex-1"
              >
                <option value="">Select Skill</option>
                {Object.entries(groupedSkills).map(([category, skills]) => (
                  <optgroup key={category} label={category}>
                    {skills.map((skill) => (
                      <option key={skill._id} value={skill._id}>
                        {skill.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <select
                value={s.level}
                onChange={(e) =>
                  handleSkillChange(i, "level", Number(e.target.value))
                }
                className="border rounded px-2"
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => removeSkill(i)}
                className="text-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addSkill}
            className="text-blue-600 mt-2"
          >
            Add Skill
          </button>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded mt-4"
          >
            Complete Setup
          </button>
        </form>
      </div>
    </div>
  );
}
