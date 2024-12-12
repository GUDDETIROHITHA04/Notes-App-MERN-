
import { Link } from 'react-router-dom';
import { useAuth } from '../context/ContextProvider';
import PropTypes from 'prop-types';
const Navbar = ({setQuery}) => {
    const{user,logout}=useAuth();
 
  return (
    <div className="bg-gray-800 p-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-white hover:text-rose-200 cursor-pointer">
        <Link to="/">NoteApp</Link>
      </div>
      <input
        type="text"
        placeholder="Search notes ...."
        className="bg-gray-700 text-xl text-cyan-200 p-2 rounded-md" onChange={(e)=>setQuery(e.target.value)}/>
      <div>
        {/* <span className="mr-4 text-xl text-white">Username</span> */}
        {!user?(
            <>
        <Link
          to="/login"
          className="bg-blue-500 px-3 py-1 text-xl rounded mr-4 text-white">Login</Link>
        <Link
          to="/register"
          className="bg-green-500 px-3 py-1 text-xl rounded mr-4 text-white">Signup</Link>
           </>
        )
        :
        <>
        <span className="mr-4 text-xl text-white">{user.name}</span>
        <button className="bg-red-500 px-3 py-1 text-xl rounded text-white" onClick={logout}> Logout</button>

        </>
}
      </div>
    </div>
  );
};
Navbar.propTypes = {
  setQuery: PropTypes.func.isRequired,
};

export default Navbar;
