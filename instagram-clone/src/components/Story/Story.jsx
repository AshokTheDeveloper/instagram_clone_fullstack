import "./Story.css";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import Cookies from "js-cookie";
import { UserContext } from "../../context/UserContext";

const Story = () => {
  const storyRef = useRef();
  const { apiUrl } = useContext(UserContext);

  const [showStory, setShowStory] = useState(false);
  const [storyInput, setStoryInput] = useState("");
  const [story, setStory] = useState("");
  const [storiesData, setStoriesData] = useState([]);
  const [user, setUser] = useState(null);

  const handleWheel = (event) => {
    event.preventDefault();
    storyRef.current.scrollLeft += event.deltaY;
  };

  useEffect(() => {
    storyRef.current.addEventListener("wheel", handleWheel);
  }, []);

  useEffect(() => {
    if (storyInput) {
      uploadStory();
    }
  }, [storyInput]);

  useEffect(() => {
    getStories();
    getUser();
  }, []);

  const getUser = async () => {
    const url = `${apiUrl}/users/profile-user`;
    const jwtToken = Cookies.get("jwt_token");
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
        setUser(data.profileUser);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const onReloadStory = () => {
    window.location.reload();
  };

  const toggleStoryPopup = () => {
    setShowStory((prevState) => !prevState);
  };

  const storyInputHandle = (event) => {
    setStoryInput(event.target.files[0]);
  };

  const uploadStory = async () => {
    if (!storyInput) {
      return;
    }
    const preset = "instagram_story";
    const cloudName = "dmui27xl3";

    const storyData = new FormData();
    storyData.append("file", storyInput);
    storyData.append("upload_preset", preset);
    storyData.append("cloud_name", cloudName);

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const options = {
      method: "POST",
      body: storyData,
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setStory(data.secure_url);
        toggleStoryPopup();
      } else {
        console.log("Error: ", data);
      }
    } catch (error) {
      console.log("Response error on post uploading to cloud", error);
    }
  };

  const uploadStoryToDatabase = async () => {
    if (!story) {
      return;
    }

    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/story-upload`;

    const newStory = {
      mediaUrl: story,
      mediaType: "image",
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newStory),
    };

    try {
      const response = await fetch(url, options);
      if (response.ok) {
        onReloadStory();
      }
    } catch (error) {
      console.log("Response error on upload story to db: ", error.message);
    }
  };

  const getStories = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/stories`;

    const options = {
      method: "GET",
      headers: {
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
      }
    } catch (error) {
      console.log("Response error on fetching stories: ", error.message);
    }
  };

  return (
    <div className="story-container" ref={storyRef}>
      <div className="story-wrapper">
        <div className="your-story-container">
          {user?.profilePic ? (
            <Link to={`/stories/${user.username}`} className="story-link">
              <div className="story-wrapper">
                <img
                  src={user.profilePic}
                  alt=""
                  className="your-story-image-profile"
                />
              </div>
            </Link>
          ) : (
            <IoPersonCircle className="your-story-icon" />
          )}

          <label htmlFor="storyInput">
            <IoIosAddCircle className="story-add-icon" />
          </label>
          <input
            id="storyInput"
            type="file"
            className="story-input"
            onChange={storyInputHandle}
          />
          {showStory && (
            <div className="home-story-popup-container">
              <div className="story-modal-container">
                <button
                  className="story-popup-close-button"
                  onClick={uploadStoryToDatabase}
                >
                  Post story
                </button>
                <img src={story} alt="story_image" className="story-image" />
              </div>
            </div>
          )}
        </div>
        <p className="story-username">Your story</p>
      </div>
      {storiesData.map((eachStory) => (
        <Link
          to={`/stories/${eachStory.username}`}
          key={eachStory.userId}
          className="story-link"
        >
          <div className="story-wrapper">
            <div className="story">
              {eachStory.profilePic ? (
                <div className="story-white-bg">
                  <img src={eachStory.profilePic} alt="Story" />
                </div>
              ) : (
                <div className="story-white-bg">
                  <IoPersonCircle className="your-story-icon" />
                </div>
              )}
            </div>
            <p className="story-username">{eachStory.username}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Story;
