import { useState } from 'react';
import axios from'axios'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const Login=()=> {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const navigate=useNavigate();
  const {login}=useAuth();

 const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
    const response=await axios.post("http://localhost:5000/api/auth/login",{email,password});
    
    if(response.data.success){
      login(response.data.user);
      localStorage.setItem('token',response.data.token);
      toast.success('Login Successfully',{
        className: 'max-w-sm text-sm'});
      navigate('/');
    }  
    }
    catch(error){ console.log(error);
    }
  }
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-5 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
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
              Login
            </button>
            <p className="text-center text-sm mt-2">
              Already Have Account?
              <Link to="/register" className="text-teal-600">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
