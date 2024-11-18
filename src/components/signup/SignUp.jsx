import { useState } from 'react';
import { signUp } from "../../services/authContext.js";
import handleAxiosError from "../../services/errorHandler";

function SignUp() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // Reset previous errors

    try {
      const userData = await signUp(form);
      console.log("User registered:", userData);
    } catch (error) {
      const errorMessages = handleAxiosError(error);
      setErrors(errorMessages);
    }
  };

  const isFormInvalid = () => {
    return !(
        form.username &&
        form.email &&
        form.password &&
        form.confirmPassword &&
        form.password === form.confirmPassword
    );
  };

  return (
      <div className="home-card">
        <h1>Sign up:</h1>

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
          <label htmlFor="email">Enter Email:</label>
          <br />
          <input
              type="email"
              name="email"
              value={form.email}
              placeholder="Enter Email"
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
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <br />
          <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              required
              autoComplete="off"
          />
          <br />
          <button disabled={isFormInvalid()} type="submit">
            Sign Up
          </button>
        </form>
      </div>
  );
}

export default SignUp;
