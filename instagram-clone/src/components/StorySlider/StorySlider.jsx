import React from "react";
import "./StorySlider.css";

const StorySlider = (props) => {
  const { storyData } = props;
  if (!storyData) {
    return;
  }

  const { mediaUrl } = storyData;
  return (
    <div className="story-play-slider">
      <img src={mediaUrl ? mediaUrl : ""} alt="" className="" />
    </div>
  );
};

export default StorySlider;
