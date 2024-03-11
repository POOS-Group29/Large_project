import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const doRegister = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!username || !email || !password || !confirmPassword) {
      setMessage("All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    // Assuming you have a server endpoint for registration, update the URL accordingly
    const url = "http://localhost:5000/api/register";

    const userData = {
      username: username,
      email: email,
      password: password,
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("Registration successful! Please login.");
      } else {
        setMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("Error during registration. Please try again later.");
    }
  };

  return (
    <div id="registerDiv">
      <form onSubmit={doRegister}>
        <span id="inner-title">REGISTER</span>
        <br />
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="password"
          id="confirmPassword"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <br />
        <input
          type="submit"
          id="registerButton"
          className="buttons"
          value="Register"
        />
      </form>
      <span id="registerResult">{message}</span>
      <p>
        Already have an account? <Link to="/">Login here</Link>.
      </p>
    </div>
  );
}

export default Register;
