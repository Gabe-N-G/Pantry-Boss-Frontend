import React, { useState } from 'react';
import { signIn } from "../../services/authContext"; // Assuming you have a signIn function in authContext
import handleAxiosError from "../../services/errorHandler"; // Import the error handling utility
import { useNavigate } from 'react-router-dom';
import './SignIn.css'

function SignIn() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState([]); // State to hold error messages
  const navigate = useNavigate();

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Reset previous errors

    try {
      // Call the signIn function from auth context
      const userData = await signIn(form);
      console.log("User signed in:", userData);

      // Redirect to dashboard upon successful login
      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      // Extract error messages using the utility function
      const errorMessages = handleAxiosError(error);
      setErrors(errorMessages);
    }
  };

  return (
      <div className="home-card">
        <h1>Sign in:</h1>

        {/* Display Error Messages */}
        {errors.length > 0 && (
            <div className="error-messages">
              {errors.map((error, index) => (
                  <p key={index} className="error-message">{error}</p>
              ))}
            </div>
        )}

        <form className="signin-form" onSubmit={handleSubmit}>
          <label htmlFor="username">Enter Username:</label>
          <br />
          <input
              type="text"
              name="username"
              value={form.username}
              placeholder="Enter Username"
              onChange={handleChange}
              required
              autoComplete="off"
          />
          <br />
          <label htmlFor="password">Enter Password:</label>
          <br />
          <input
              type="password"
              name="password"
              value={form.password}
              placeholder="Enter Password"
              onChange={handleChange}
              required
              autoComplete="off"
          />
          <br />
          <button type="submit">Sign In</button>
        </form>
      </div>
  );
}

export default SignIn;
