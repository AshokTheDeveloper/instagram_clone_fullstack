import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { BiLogoFacebookCircle } from "react-icons/bi";
import Cookies from "js-cookie";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeEmail = (event) => {
    setUserDetails({
      ...userDetails,
      email: event.target.value,
    });
  };

  const onChangePassword = (event) => {
    setUserDetails({
      ...userDetails,
      password: event.target.value,
    });
  };

  const onSubmitFormFailure = (errorMessage) => {
    setErrorMsg(errorMessage);
    setShowError(true);
  };

  const onSubmitFormSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expiresIn: "7d" });
    navigate("/");
  };

  const onSubmitLoginForm = async (event) => {
    event.preventDefault();
    const errorMessage =
      "Sorry, your password was incorrect. Please double-check your password.";
    const { email, password } = userDetails;
    if (!email || !password) {
      onSubmitFormFailure(errorMessage);
      return;
    }

    const apiUrl = "https://instagram-clone-backend-rfda.onrender.com/users/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        onSubmitFormSuccess(data.jwt_token);
      } else {
        onSubmitFormFailure(data.message);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
      onSubmitFormFailure("Response error: ", error.message);
    }
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const { email, password } = userDetails;

  return (
    <div className="inst-login-bg-container">
      <div className="inst-login-form-wrapper">
        <img
          src="https://res.cloudinary.com/dmui27xl3/image/upload/v1713177035/LOGOS/insta_logo_png_white_ygizmi.png"
          alt="instagram logo"
          className="instagram-logo"
        />
        <form onSubmit={onSubmitLoginForm} className="login-form">
          <input
            type="text"
            name="email"
            value={email}
            placeholder="Phone Number, username or email"
            onChange={onChangeEmail}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={onChangePassword}
          />
          <button type="submit" className="login-button">
            Login up
          </button>
        </form>
        <div className="hr-line-or-text">
          <div className="hr-line"></div>
          <p className="or-text">OR</p>
          <div className="hr-line"></div>
        </div>
        <div>
          <button className="login-with-facebook-button">
            <BiLogoFacebookCircle className="login-facebook-icon" /> Login with
            Facebook
          </button>
        </div>
        {showError && <p className="error-msg">{errorMsg}</p>}
        <p className="login-forgot-password">Forgot password</p>
      </div>
      <div className="login-navigation-container">
        <p className="login-in-signup-text">
          Don't have an account?
          <span className="log-in-nav-link">
            <Link to="/signup" className="login-link-text">
              Signup
            </Link>
          </span>
        </p>
      </div>
      <p className="get-app-text">Get the App</p>
    </div>
  );
}

export default Login;
