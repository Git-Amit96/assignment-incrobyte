import React from 'react';
import { Outlet, useNavigate} from 'react-router-dom';
import { useAuth } from '../utils/AuthProvider.jsx';
import BreadCrumb from '@/components/BreadCrumb.jsx';

const Dashboard = () => {

  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const apiUrl = import.meta.env.VITE_API_URL;


  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiUrl}auth/user/logout`, {
        method: "POST",
        credentials: "include", 
      });

      const json = await res.json();

      if (res.ok && json.success) {
        setAuth({ isAuthenticated: false, user: null });
        navigate("/auth");
      } else {
        console.error("Logout failed:", json.message || "Unknown error");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };


  return (
    <div className="flex flex-col min-h-screen relative pb-6">
      {/* Navbar */}
      <nav className="w-full px-16 py-5 bg-blue-600 text-white  flex justify-between items-center fixed top-0 z-40 ">
        <div className="text-xl font-bold">Dashboard</div>
        <div className="space-x-10 hidden sm:flex ">
          <a className="hover:underline">Home</a>
          <a  className="hover:underline">About</a>
          <a  className="hover:underline">Contact</a>
          <div  className="hover:underline cursor-pointer" onClick={handleLogout}>Logout</div>
        </div>
        
      </nav>
      <div className='mt-16 '>

         <div className='text-black font-medium p-2 rounded ml-12 mt-3  w-fit cursor-pointer ' >
          <BreadCrumb/>
        </div> 
        <Outlet />
      </div>
    </div>
  )

};

export default Dashboard;