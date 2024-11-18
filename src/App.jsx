import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/navbar/NavBar.jsx"
import Footer from './components/footer/Footer.jsx'
import Home from './components/home/Home.jsx'
import About from './components/about/About.jsx'
import Signin from './components/signin/SignIn.jsx'
import Signup from './components/signup/SignUp.jsx'
import Dashboard from './components/dashboard/dashboard.jsx'


function App() {

  // TODO: user state for authnetication: also add to context at some point
  const [user, setUser] = useState(null);

  // TODO: useeffect to load user on signup.

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     const user = await verifyUser();
  //     user ? setUser(user) : setUser(null);
  //   };

  //   fetchUser();
  // }, []);

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
          </Routes>
        </main>  
      <Footer/>
    </>  
  )
}

export default App
