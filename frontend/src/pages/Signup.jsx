import  { useState } from 'react';
import axios from'axios'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const Signup=()=> {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const response=await axios.post("http://localhost:5000/api/auth/register",{name,email,password});
    console.log(response);
    if(response.status){
      toast.success('Signup Successfully',{
        className: 'max-w-sm text-sm'});
      navigate('/login')
    }
  }
    catch(error){ console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-5 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm text-gray-900">Name</label>
            <input
              type="text"
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-3 py-2 border text-sm"
              placeholder="Enter name"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-900">Email</label>
            <input
              type="email"
              onChange={(e)=>setEmail(e.target.value)}
              className="w-full px-3 py-2 border text-sm"
              placeholder="Enter email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm text-gray-900">Password</label>
            <input
              type="password"
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-3 py-2 border text-sm"
              placeholder="Enter password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white py-2 text-sm"
            >
              Signup
            </button>
            <p className="text-center text-sm mt-2">
              Already Have Account?
              <Link to="/login" className="text-teal-600">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
