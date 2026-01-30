import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../api/axios'

export default function PostJob() {
  const [skills,setSkills] = useState([]);
  const [form,setForm] = useState({
    title:"",
    description:"",
    location:"",
    workersNeeded:1,
    skillsRequired:[],
  });
  const navigate = useNavigate();

  useEffect(()=>{
    const fetchSkills = async()=>{
      const response = await api.get("/admin/all-skills");
      setSkills(response.data);
    }
    fetchSkills();
  },[]);

  const handleChange=(e)=>{
    const {name,value} = e.target;
    setForm({...form,[name]:value});
  }
  const handleSkillToggle = (skillId)=>{
    setForm((prevForm)=>{
      const skillsRequired = prevForm.skillsRequired.includes(skillId)
      ? prevForm.skillsRequired.filter((id)=>id !== skillId)
      : [...prevForm.skillsRequired,skillId];
      return {...prevForm,skillsRequired};
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/jobs/post", {
        title: form.title,
        description: form.description,
        location: form.location,
        workersNeeded: form.workersNeeded,
        skillsRequired: form.skillsRequired,
      });
      alert("Job Posted Successfully.");
      navigate("/customer/dashboard");
    } catch (err) {
      alert(
        "Job Posting Failed. Try again. " + (err.response?.data || "")
      );
    }
  }
  
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-lg'>
        <h1 className="text-2xl font-bold mb-4">Post a Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={form.location}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Workers Needed</label>
            <input
              type="number"
              name="workersNeeded"
              value={form.workersNeeded}
              onChange={handleChange}
              min={1}
              className="w-full px-3 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Skills Required</label>
            {skills.map((skill) => (
                <div key={skill._id} className='flex items-center'>
                  <input
                    type='checkbox'
                    id={`skill-${skill._id}`}
                    checked={form.skillsRequired.includes(skill._id)}
                    onChange={() => handleSkillToggle(skill._id)}
                    className='mr-2'
                  />
                  <label htmlFor={`skill-${skill._id}`}>{skill.name}</label>
                </div>
            ))}
          </div>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
            Post Job
          </button>
        </form>
      </div>
    </div>
  );
}