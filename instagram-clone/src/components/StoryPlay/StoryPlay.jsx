import "./StoryPlay.css";
import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdClose, IoIosPlay, IoIosPause } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { MdNavigateNext } from "react-icons/md";
import { GrFormPrevious } from "react-icons/gr";
import { IoPersonCircle } from "react-icons/io5";
import StorySlider from "../StorySlider/StorySlider";
import { UserContext } from "../../context/UserContext";
import ProgressBar from "../ProgressBar/ProgressBar";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  progress: "IN_PROGRESS",
  failure: "FAILURE",
};

const StoryPlay = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const { apiUrl } = useContext(UserContext);

  const [storiesData, setStoriesData] = useState([]);
  const [progress, setProgress] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
  const [status, setStatus] = useState(apiStatusConstants.initial);

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
    setStatus(apiStatusConstants.progress);

    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/stories/${name}`;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        if (data.stories.length !== 0) {
          setStoriesData(data.stories);
        }
        setStatus(apiStatusConstants.success);
      } else {
        setStatus(apiStatusConstants.failure);
      }
    } catch (error) {
      console.log("Error on getting stories: ", error.message);
      setStatus(apiStatusConstants.failure);
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

  const story = storiesData[currentStoryIndex];
  let newObj = {};
  if (story !== undefined) {
    const { username, profilePic, createdAt } = story;
    newObj = {
      username,
      profilePic,
      createdAt,
    };
  }

  const { username, profilePic, createdAt } = newObj;

  const formatRelativeTime = () => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(createdAt)) / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInWeeks = Math.floor(diffInDays / 7);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInDays / 365);

    if (diffInMinutes < 1) return `${diffInSeconds}seconds`;
    if (diffInHours < 1) return `${diffInMinutes}minutes`;
    if (diffInDays < 1) return `${diffInHours}h`;
    if (diffInWeeks < 1) return `${diffInDays}d`;
    if (diffInMonths < 1) return `${diffInWeeks}w`;
    if (diffInYears < 1) return `${diffInMonths}m`;
    return `${diffInYears}y`;
  };

  const formattedDate = formatRelativeTime();

  const renderStoryPlayer = () => (
    <>
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
            <button
              className="story-play-preview"
              onClick={handlePreviousStory}
            >
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
    </>
  );

  const renderCurrentView = () => {
    switch (status) {
      case apiStatusConstants.progress:
        return <ProgressBar />;
      case apiStatusConstants.success:
        return renderStoryPlayer();
      case apiStatusConstants.failure:
        return <h1>No Stories</h1>;
      default:
        return null;
    }
  };
  return <>{renderCurrentView()}</>;
};

export default StoryPlay;
