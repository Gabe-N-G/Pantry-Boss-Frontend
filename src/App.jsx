import { useState, useEffect } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from "./components/navbar/NavBar.jsx"
import Footer from './components/footer/Footer.jsx'
import Home from './components/home/Home.jsx'
import About from './components/about/About.jsx'

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
          </Routes>
      <Footer/>
    </>  
  )
}

export default App
