import React from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import  { useContext } from 'react';

export default function Home() {
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);
  return (
    <div>
      <button className='bg-white hover:bg-lime-100 shadow-rounded  p-4' onClick={() => role === "worker" ? navigate("/worker/dashboard") : navigate("/customer/dashboard")}>Dashboard</button>
    </div>
  )
}
