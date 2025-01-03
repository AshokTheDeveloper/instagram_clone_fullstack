import React, { useState } from "react";
import { FaFacebookSquare } from "react-icons/fa";
import { Link, useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import "./signup.css";

function SignUp() {
  const navigate = useNavigate();

  const [userDetails, setUserDetails] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
  });
  const [showError, setShowError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const onChangeEmailHandler = (event) => {
    setUserDetails({
      ...userDetails,
      email: event.target.value,
    });
  };

  const onChangePasswordHandler = (event) => {
    setUserDetails({
      ...userDetails,
      password: event.target.value,
    });
  };

  const onChangeFullnameHandler = (event) => {
    setUserDetails({
      ...userDetails,
      fullname: event.target.value,
    });
  };

  const onChangeUsernameHandler = (event) => {
    setUserDetails({
      ...userDetails,
      username: event.target.value,
    });
  };

  const onSubmitSuccess = () => {
    navigate("/login");
  };

  const onSubmitFailure = (errorMsg) => {
    setErrorMsg(errorMsg);
    setShowError(true);
  };

  const onSubmitForm = async (event) => {
    event.preventDefault();

    const { fullname, username, email, password } = userDetails;
    if (!fullname || !username || !email || !password) {
      onSubmitFailure("Required all the fields");
      return;
    }

    const apiUrl = "https://instagram-clone-backend-rfda.onrender.com/users/signup";
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
        onSubmitSuccess();
      } else {
        onSubmitFailure(data.message);
      }
    } catch (error) {
      onSubmitFailure(error.message);
      console.log("Response error: ", error.message);
    }
    setUserDetails({
      fullname: "",
      username: "",
      email: "",
      password: "",
    });
  };

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken !== undefined) {
    return <Navigate to="/" />;
  }

  const { fullname, username, email, password } = userDetails;

  return (
    <>
      <div className="inst-signup-bg-container">
        <div className="inst-form-wrapper">
          <img
            src="https://res.cloudinary.com/dmui27xl3/image/upload/v1713177035/LOGOS/insta_logo_png_white_ygizmi.png"
            alt="instagram logo"
            className="instagram-logo"
          />
          <p className="signup-caption">
            Signup to see photos and videos from your friends
          </p>
          <button type="text" className="login-with-fb-button">
            <FaFacebookSquare className="signup-fb-icon" />
            Log in with Facebook
          </button>
          <div className="hr-line-or-text">
            <div className="hr-line"></div>
            <p className="or-text">OR</p>
            <div className="hr-line"></div>
          </div>
          <form onSubmit={onSubmitForm} className="signup-form">
            <input
              type="text"
              name="email"
              value={email}
              placeholder="Mobile Number or Email"
              onChange={onChangeEmailHandler}
            />
            <input
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              onChange={onChangePasswordHandler}
            />
            <input
              type="text"
              name="fullname"
              value={fullname}
              placeholder="Full Name"
              onChange={onChangeFullnameHandler}
            />
            <input
              type="text"
              name="username"
              value={username}
              placeholder="Username"
              onChange={onChangeUsernameHandler}
            />
            {showError && <p className="signup-error-msg">*{errorMsg}</p>}
            <p className="signup-bottom-caption">
              People who use our service may have uploaded your contact
              information to Instagram.
              <span className="signup-terms-and-conditions-text">
                Learn More
              </span>
            </p>
            <div className="signup-privacy-policy-text">
              By signing up, you agree to our
              <span className="signup-terms-and-conditions-text">
                Terms , Privacy Policy and Cookies Policy.
              </span>
            </div>
            <button type="submit" className="signup-button">
              Sign up
            </button>
          </form>
        </div>
        <div className="signup-navigation-container">
          <p className="login-in-signup-text">
            Have an account?
            <span className="log-in-nav-link">
              <Link to="/login" className="signup-link-text">
                Log in
              </Link>
            </span>
          </p>
        </div>
        <p className="get-app-text">Get the App</p>
      </div>
    </>
  );
}

export default SignUp;
