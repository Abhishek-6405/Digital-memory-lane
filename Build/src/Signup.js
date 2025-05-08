import React, { useState } from "react";
import "./Signup.css";

const Signup = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    if (username && password) {
      const newUser = { username, password };
      localStorage.setItem("user", JSON.stringify(newUser));
      setIsLoggedIn(true);
    } else {
      alert("Please fill in both fields.");
    }
  };

  return (
    <div className="signup-form">
      <h2>Signup</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default Signup;
