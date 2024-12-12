import PropTypes from 'prop-types';
import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import { toast } from 'react-toastify';
// Create the authentication context
const AuthContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // State to store user information

  // Login function to set the user
  const login = (user) => {
    setUser(user);
  };

  // Logout function to clear the user
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success("Logout successfully",{
    className: 'max-w-sm text-sm'})
  };

useEffect(()=>{
const verifyUser=async()=>{
  try{
    const res=await axios.get("http://localhost:5000/api/auth/verify",{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }
  );
      if(res.data.success){
        setUser(res.data.user);
      }else{
        setUser(null)
      }
    }catch(error){
        console.log(error);
  }
}
verifyUser();
},[])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
ContextProvider.propTypes = {
    children: PropTypes.func.isRequired
};

// Custom hook to access auth context
export const useAuth = () => useContext(AuthContext);

export default ContextProvider;
