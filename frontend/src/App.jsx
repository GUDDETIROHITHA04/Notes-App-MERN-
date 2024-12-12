import Signup from './pages/signup'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import {ToastContainer} from 'react-toastify'
function App() {

  return (
    <div className="text-4xl">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

      </Routes>
      <ToastContainer/>
      </BrowserRouter>
    </div>
  )
}

export default App
