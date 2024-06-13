import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-hot-toast";
import "./Auth.css";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);

  const navigate = useNavigate();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // Clear input fields when toggling
    setLoginEmail("");
    setLoginPassword("");
    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setShowLoginPassword(false);
    setShowSignupPassword(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      toast.error("No user found. Please sign up first.");
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    try {
      if (
        parsedUser.email === loginEmail &&
        parsedUser.password === loginPassword
      ) {
        toast.success("Login Successful");
        navigate("/todo");
      } else {
        toast.error("Invalid email or password. Please try again.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const newUser = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
    };
    localStorage.setItem("user", JSON.stringify(newUser));

    setSignupName("");
    setSignupEmail("");
    setSignupPassword("");
    setShowSignupPassword(false);

    navigate("/todo");
  };

  return (
    <div className="auth-container d-flex align-items-center justify-content-center">
      <div className="auth-form-container">
        {isLogin ? (
          <form onSubmit={handleLogin}>
            <h3 className="mb-3 fw-normal">Login</h3>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="loginEmail"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
              <label htmlFor="loginEmail">Email address</label>
            </div>
            <div className="form-floating mb-3 position-relative">
              <input
                type={showLoginPassword ? "text" : "password"}
                className="form-control"
                id="loginPassword"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <label htmlFor="loginPassword">Password</label>
              <FontAwesomeIcon
                icon={showLoginPassword ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              />
            </div>
            <button
              className="btn btn-primary w-100 py-2 fw-bold"
              type="submit"
            >
              Login
            </button>
            <p className="text-center mt-3">
              Don't have an account?{" "}
              <span className="link-primary" onClick={toggleForm}>
                Sign Up
              </span>
            </p>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <h3 className="mb-3 fw-normal">Sign Up</h3>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="signupName"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
              <label htmlFor="signupName">Full Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="signupEmail"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
              <label htmlFor="signupEmail">Email address</label>
            </div>
            <div className="form-floating mb-3 position-relative">
              <input
                type={showSignupPassword ? "text" : "password"}
                className="form-control"
                id="signupPassword"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
              <label htmlFor="signupPassword">Password</label>
              <FontAwesomeIcon
                icon={showSignupPassword ? faEyeSlash : faEye}
                className="password-toggle-icon"
                onClick={() => setShowSignupPassword(!showSignupPassword)}
              />
            </div>
            <button
              className="btn btn-primary w-100 py-2 fw-bold"
              type="submit"
            >
              Sign Up
            </button>
            <p className="text-center mt-3">
              Already have an account?{" "}
              <span className="link-primary" onClick={toggleForm}>
                Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
