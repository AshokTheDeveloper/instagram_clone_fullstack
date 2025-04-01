import React, { useEffect, useState } from "react";
import "./ProgressBar.css";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const ID = setInterval(() => {
      setProgress((prevState) => {
        if (progress >= 100) {
          clearInterval(ID);
          return 100;
        }
        return prevState + 10;
      });

      return () => clearInterval(ID);
    }, 30);
  }, []);

  return (
    <div id="instagram-progress-container">
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
