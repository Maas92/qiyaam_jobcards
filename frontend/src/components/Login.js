import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

async function loginUser(credentials) {
  return fetch("http://localhost:3000/api/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials)
  })
  .then(data => data.json())
};

export default function Login({ setToken }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await loginUser({
      email,
      password,
    });
    setToken(token);
    goToDashboard()
  };

  const gotoSignUpPage = () => navigate("/register");
  const goToDashboard = () => navigate("/Dashboard");

  return (
    <div className="login__container">
      <h2>Login </h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          name="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          minLength={8}
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="loginBtn" type="submit">
          SIGN IN
        </button>
      </form>
      <p>
        Don't have an account?{" "}
        <span className="link" onClick={gotoSignUpPage}>
          Sign up
        </span>
      </p>
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};
