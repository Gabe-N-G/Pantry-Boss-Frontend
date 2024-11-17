import React from 'react'
import { useState } from 'react';



function SignIn() {

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)

    try {
      // Assuming the auth context works in .services/authContext
      const userData = await signIn(form);
      setUser(userData);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className='home-card'>
      <h1>Sign in:</h1>
      <form className='signin-form' onSubmit={handleSubmit}>
        <label>Enter Username:</label>
        <br/>
        <input
              type='text'
              name='username'
              value={form.username}
              placeholder='Enter Username'
              onChange={handleChange}
              required
              autoComplete="off"
            />
        <br/>
        <label>Enter Password:</label>
        <br/>    
            <input
              type='password'
              name='password'
              value={form.password}
              placeholder='Enter Password'
              onChange={handleChange}
              required
              autoComplete="off"
            />
          <br/>
        <button type="submit">Sign In</button>
      </form>      
      
    </div>
  )
}

export default SignIn