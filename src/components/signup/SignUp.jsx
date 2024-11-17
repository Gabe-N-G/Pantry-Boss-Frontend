import React from 'react'
import { useState } from 'react';

function SignUp() {
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
      const userData = await signUp (form);
      setUser(userData);

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  const isFormInvalid = () => {
    return !(form.username && form.email && form.password && form.password === form.confirmPassword);
  };

  return (
    <div className='home-card'>
      <h1>Sign up:</h1>
      <form className='signin-form' onSubmit={handleSubmit}>
        <label htmlFor='username'>Enter Username:</label>
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
        <label htmlFor='email'>Enter Email:</label>
        <br/>
        <input
              type='email'
              name='email'
              value={form.email}
              placeholder='Enter Email'
              onChange={handleChange}
              required
              autoComplete="off"
            />
        <br/>
        <label htmlFor='password'>Enter Password:</label>
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
        <label htmlFor='confirmPassword'>Confirm Password:</label>
        <br/>    
            <input
              type='password'
              name='confirmPassword'
              value={form.confirmPassword}
              placeholder='Confirm Password'
              onChange={handleChange}
              required
              autoComplete="off"
            />
          <br/>
        <button disabled={isFormInvalid()} type="submit">Sign Up</button>
      </form>      
      
    </div>
  )
}

export default SignUp