import React from "react";
import FadeLoader from "react-spinners/FadeLoader";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <FadeLoader
        color="#5a5a5a"
        loading={true}
        cssOverride={true}
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;
