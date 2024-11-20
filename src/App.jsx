import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/navbar/NavBar.jsx"
import Footer from './components/footer/Footer.jsx'
import Home from './components/home/Home.jsx'
import About from './components/about/About.jsx'
import Signin from './components/signin/SignIn.jsx'
import Signup from './components/signup/SignUp.jsx'
import Dashboard from './components/dashboard/Dashboard.jsx'
import FloorView from './components/floorView/FloorView.jsx'
import SingleDispenserView from './components/dispenserView/SingleDispenserView.jsx'
import CreatePantryForm from './components/forms/CreatePantryForm.jsx'
import CreateDispenserForm from './components/forms/CreateDispenserForm.jsx'
import { verifyUser } from './services/authContext.js'

function App() {

  // TODO: user state for authnetication: also add to context at some point
  const [user, setUser] = useState(null);

  // TODO: useeffect to load user on signup.

  useEffect(() => {
    const fetchUser = async () => {
      const user = await verifyUser();
      user ? setUser(user) : setUser(null);
    };

    fetchUser();
  }, []);

  return (
    <>
      <Navbar/>
        <main>
        
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path='/signin' element={<Signin />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard />}/>
            <Route path='/floors/:floorId' element={<FloorView/>}/>
            <Route path="/dispensers/:id" element={<SingleDispenserView />} />
            <Route path='/create-pantry/floor/:floorId' element={<CreatePantryForm/>}/>
            <Route path='/create-dispenser/pantry/:pantryId' element={<CreateDispenserForm/>}/>
          </Routes>
        
        </main>  
      <Footer/>
    </>  
  )
}

export default App
