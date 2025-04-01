import React from "react";
import instagramLogo from "../../assets/instagram_logo.png";
import "./Loading.css";

const Loading = () => {
  return (
    <div className="loading-container">
      <img src={instagramLogo} className="instagram-logo-loading" />
    </div>
  );
};

export default Loading;
