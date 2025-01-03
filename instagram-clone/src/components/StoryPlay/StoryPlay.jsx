import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdClose, IoIosPlay, IoIosPause } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoPersonCircle } from "react-icons/io5";
import StorySlider from "../StorySlider/StorySlider";

import "./StoryPlay.css";

const StoryPlay = () => {
  const { name } = useParams();
  const navigate = useNavigate();

  const [storiesData, setStoriesData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);

  useEffect(() => {
    getStories();
    setProgress(0);
  }, [name]);

  useEffect(() => {
    let interval = null;
    if (playing && progress < 100) {
      interval = setInterval(() => {
        setProgress((prevState) => prevState + 1);
      }, 70);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [playing, progress]);

  useEffect(() => {
    if (progress === 100) {
      handleNextStory();
    }
  }, [progress]);

  const onCompleteStories = () => {
    navigate("/");
  };

  const getStories = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3002/users/stories/${name}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        if (data.stories.length !== 0) {
          setStoriesData(data.stories);
        }
      }
    } catch (error) {
      console.log("Error on getting stories: ", error.message);
    }
  };

  const handleNextStory = () => {
    if (currentStoryIndex < storiesData.length - 1) {
      setCurrentStoryIndex((prevStory) => prevStory + 1);
      setProgress(0);
    } else {
      setPlaying(false);
      onCompleteStories();
    }
  };

  const storyPlay = () => {
    setPlaying((prevState) => !prevState);
  };

  const handlePreviousStory = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex((prevStory) => prevStory - 1);
      setProgress(0);
    }
  };

  const getData = () => {
    const story = storiesData[currentStoryIndex];
    let newObj = {};
    if (story !== undefined) {
      const { username, profilePic, createAt } = story;
      newObj = {
        username,
        profilePic,
        createAt,
      };
    }
    return newObj;
  };

  const { username, profilePic, createAt } = getData();

  const formatRelativeTime = () => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(createAt)) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInMinutes < 1) return `${diffInSeconds}s`;
    if (diffInHours < 1) return `${diffInMinutes}m`;
    if (diffInDays < 1) return `${diffInHours}h`;
    if (diffInWeeks < 1) return `${diffInDays}d`;
    if (diffInMonths < 1) return `${diffInWeeks}w`;
    if (diffInYears < 1) return `${diffInMonths}month`;
    return `${diffInYears}y`;
  };

  const formattedDate = formatRelativeTime();

  return (
    <div className="story-play">
      <Link to="/" className="story-play-links story-play-close-button">
        <IoMdClose className="story-play-close-icon" />
      </Link>
      <Link to="/" className="story-play-links">
        <img
          src="https://res.cloudinary.com/dmui27xl3/image/upload/v1713177035/LOGOS/insta_logo_png_white_ygizmi.png"
          alt="instagram logo"
          className="story-play-logo"
        />
      </Link>
      <div className="story-player-container">
        <div className="story-play-progress-bar-container">
          <div
            className="story-play-progress-bar"
            style={{ width: `${progress}%` }} // Progress bar
          ></div>
        </div>
        <div className="story-play-profile-and-button-container">
          <div className="story-play-username-container">
            {profilePic ? (
              <img src={profilePic} alt="" />
            ) : (
              <IoPersonCircle className="story-null-icon" />
            )}
            <p>{username}</p>
            <p className="story-play-time">{formattedDate}</p>
          </div>
          <div className="story-play-pause-and-more-container">
            {playing ? (
              <button onClick={storyPlay}>
                <IoIosPause className="story-play-pause-icons" />
              </button>
            ) : (
              <button onClick={storyPlay}>
                <IoIosPlay className="story-play-pause-icons" />
              </button>
            )}
            <button>
              <BsThreeDots className="story-play-three-dots" />
            </button>
            <Link to="/" className="story-play-links-mobile">
              <IoMdClose className="story-play-close-icon mobile-story-close" />
            </Link>
          </div>
        </div>
        <div className="story-play-slider-container">
          <StorySlider storyData={storiesData[currentStoryIndex]} />
        </div>
        {currentStoryIndex > 0 && (
          <button className="story-play-preview" onClick={handlePreviousStory}>
            <GrFormPrevious className="story-prev-next-icon" />
          </button>
        )}

        {currentStoryIndex < storiesData.length - 1 && (
          <button className="story-play-next" onClick={handleNextStory}>
            <MdNavigateNext className="story-prev-next-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default StoryPlay;
