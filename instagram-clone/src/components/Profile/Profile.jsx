import React, { useContext, useEffect, useRef, useState } from "react";
import Cookies from "js-cookie";
import Header from "../Header/Header";
import { PiGearSixLight } from "react-icons/pi";
import { GoPlus } from "react-icons/go";
import { FaUser } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { AiOutlineLink } from "react-icons/ai";
import { BiGrid, BiMoviePlay, BiUserPin } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";
import ProfilePostItem from "../ProfilePostItem/ProfilePostItem";
import "./profile.css";
import { UserContext } from "../../context/UserContext";

const apiStatusConstants = {
  initial: "INITIAL",
  inProgress: "IN_PROGRESS",
  success: "SUCCESS",
  failure: "FAILURE",
};

const tabs = [
  {
    id: "posts",
    label: "POSTS",
    icon: <BiGrid className="profile-posts-icons" />,
  },
  {
    id: "saved",
    label: "SAVED",
    icon: (
      <img
        src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732603244/LOGOS/Rectangle_black_1_ro1y7h.png"
        alt="post saved image"
        className="profile-posts-icons-saved"
      />
    ),
  },
  {
    id: "tagged",
    label: "TAGGED",
    icon: <BiUserPin className="profile-posts-icons" />,
  },
];

function Profile() {
  const fileInputRef = useRef(null);
  const { apiUrl } = useContext(UserContext);

  const [postsData, setPostsData] = useState([]);
  const [followCount, setFollowCount] = useState({});
  const [profilePicInput, setProfilePicInput] = useState("");
  const [picture, setPicture] = useState("");
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [showStoryPopup, setShowStoryPopup] = useState(false);

  useEffect(() => {
    getProfilePosts();
    getFollowersAndFollowingCount();
  }, []);

  useEffect(() => {
    uploadProfile();
    updateProfilePopup(); // closes on the file input
  }, [profilePicInput]);

  useEffect(() => {
    if (picture) {
      uploadProfileOnDatabase();
    }
  }, [picture]);

  const getFollowersAndFollowingCount = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/follow-count`;
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
        setFollowCount(data.followCount);
      }
    } catch (error) {
      console.log(
        "Error on fetching count of followers and following: ",
        error.message
      );
    }
  };

  const getProfilePosts = async () => {
    const jwtToken = Cookies.get("jwt_token");

    const url = `${apiUrl}/users/profile-posts`;
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
        setPostsData(data.posts);
      }
    } catch (error) {
      console.log("Failure on posts fetching: ", error.message);
    }
  };

  const handleProfilePicture = (event) => {
    setProfilePicInput(event.target.files[0]);
  };

  const uploadProfile = async () => {
    if (!profilePicInput) {
      return;
    }

    const preset = "instagram_profile";
    const cloudName = "dmui27xl3";

    const profileData = new FormData();

    profileData.append("file", profilePicInput);
    profileData.append("upload_preset", preset);

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const options = {
      method: "POST",
      body: profileData,
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setPicture(data.secure_url);
      }
    } catch (error) {
      console.log("Error on uploading profile image: ", error.message);
    }
  };

  const reloadOnPostUpload = () => {
    window.location.reload();
  };

  const uploadProfileOnDatabase = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/upload-profile`;
    const newProfile = {
      profilePic: picture,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newProfile),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        reloadOnPostUpload();
      }
    } catch (error) {
      console.log("Error on uploading profile pic on Database");
    }
  };

  const updateProfilePopup = async () => {
    setShowUpdatePopup((prevState) => !prevState);
  };

  const storyPopup = () => {
    setShowStoryPopup((prevState) => !prevState);
  };

  const updateUploadedProfileHandle = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const removeUploadedProfileHandle = () => {
    setPicture("null");
  };

  const renderUpdatePopup = () => (
    <div
      className="update-profile-pic-popup-container"
      onClick={updateProfilePopup}
    >
      <div
        className="profile-upload-popup-container"
        onClick={(event) => event.stopPropagation()}
      >
        <p className="profile-update-popup-heading">Change Profile Photo</p>
        <hr className="profile-update-popup-ruler" />
        <button
          onClick={updateUploadedProfileHandle}
          className="profile-upload-photo-button"
        >
          Upload Photo
        </button>
        <hr className="profile-update-popup-ruler" />
        <button
          className="profile-remove-photo-button"
          onClick={removeUploadedProfileHandle}
        >
          Remove Current Photo
        </button>
        <hr className="profile-update-popup-ruler" />
        <button
          type="button"
          onClick={updateProfilePopup}
          className="upload-profile-popup-cancel-button"
        >
          Cancel
        </button>
      </div>
    </div>
  );

  const {
    username,
    fullname,
    followersCount,
    followingCount,
    postsCount,
    profilePic,
  } = followCount;

  const renderTopProfileSection = () => (
    <div className="profile">
      {profilePic ? (
        <div>
          <div className="profile-pic-container" onClick={updateProfilePopup}>
            <div className="profile-gradient-container">
              <img
                src={profilePic}
                alt="user profile"
                className="profile-picture"
              />
            </div>
          </div>
          {showUpdatePopup && renderUpdatePopup()}
          <input
            type="file"
            accept="image/*"
            className="profile-pic-input"
            id="profileInput"
            onChange={handleProfilePicture}
            ref={fileInputRef}
          />
        </div>
      ) : (
        <label className="null-profile-pic-container" htmlFor="profileInput">
          <FaUser className="null-profile-picture" />
          <FaCamera className="null-profile-camera-icon" />
          <input
            type="file"
            accept="image/*"
            className="profile-pic-input"
            id="profileInput"
            onChange={handleProfilePicture}
            ref={fileInputRef}
          />
        </label>
      )}

      <div className="user-profile-details">
        <div className="profile-user-name-container">
          <button className="profile-username">{username}</button>
          <button type="button" className="profile-user-buttons">
            Edit profile
          </button>
          <button type="button" className="profile-user-buttons">
            View archive
          </button>
          <button type="button" className="profile-user-settings-button">
            <PiGearSixLight className="user-profile-icons" />
          </button>
        </div>
        <ul className="user-profile-followers-container">
          <li className="user-profile-followers-item">
            {postsCount} {postsCount > 1 ? "posts" : "post"}
          </li>
          <li className="user-profile-followers-item">
            {followersCount} followers
          </li>
          <li className="user-profile-followers-item">
            {followingCount} following
          </li>
        </ul>
        <div className="profile-user-bio-container">
          <p className="profile-bio-username">{fullname}</p>
          <ul className="profile-bio-item-container">
            <li className="profile-bio-item">builder of stuff</li>
            <li className="profile-bio-item">tequila sipper</li>
            <li className="profile-bio-item">og girl dad 💕</li>
          </ul>
          <a href="#" className="profile-media-links">
            <AiOutlineLink className="profile-media-link-icon" />
            therock.komi.io
          </a>
        </div>
      </div>
    </div>
  );

  const renderStories = () => (
    <div className="profile-user-stories-container">
      <div className="story-input-container">
        <button className="stories-adding-button" onClick={storyPopup}>
          <div className="stories-icons-container">
            <GoPlus className="user-profile-stories-icon" />
          </div>
        </button>
        <p className="new-story-text">New</p>
      </div>
      {showStoryPopup && (
        <div className="profile-story-popup" onClick={storyPopup}>
          <div
            className="story-popup-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button onClick={storyPopup} className="story-close-button">
              <IoMdClose className="story-popup-icon" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderPosts = () => (
    <div className="profile-user-posts-container">
      <div className="posts-tabs-container">
        {tabs.map((eachTab) => (
          <button
            key={eachTab.id}
            className={`profile-post-tab-button ${
              activeTab === eachTab.id ? "active-tab" : ""
            }`}
            onClick={() => setActiveTab(eachTab.id)}
          >
            {eachTab.icon}
            {eachTab.label}
          </button>
        ))}
      </div>
      <div className="posts-based-on-tabs-container">
        {activeTab === "posts" && (
          <ul className="profile-posts">
            {postsData.map((eachPost) => (
              <ProfilePostItem key={eachPost._id} postDetails={eachPost} />
            ))}
          </ul>
        )}
        {activeTab === "saved" && (
          <ul className="profile-posts">
            <h1>Saved</h1>
          </ul>
        )}
        {activeTab === "tagged" && (
          <ul className="profile-posts">
            <h1>Tagged</h1>
          </ul>
        )}
      </div>
    </div>
  );

  const renderProfile = () => (
    <div className="profile-bg-container">
      <div className="user-profile">
        <div className="profile-user-details-container">
          {renderTopProfileSection()}
          {renderStories()}
        </div>
        {renderPosts()}
      </div>
    </div>
  );

  // Profile Mobile View
  const renderProfileMobileView = () => (
    <div className="profile-mobile-view-container">
      <div className="profile-mobile-view-top-container">
        {profilePic ? (
          <div>
            <img
              src={profilePic}
              alt={username}
              className="profile-mobile-view-user-profile-image"
              onClick={updateProfilePopup}
            />
            {showUpdatePopup && renderUpdatePopup()}
          </div>
        ) : (
          <label
            className="profile-mobile-view-null-user-container"
            htmlFor="profileInput"
          >
            <FaUser className="profile-mobile-view-null-user" />
            <FaCamera className="profile-mobile-view-user-camera-icon" />
            <input
              type="file"
              accept="image/*"
              className="profile-pic-input"
              id="profileInput"
              onChange={handleProfilePicture}
              ref={fileInputRef}
            />
          </label>
        )}

        <div className="profile-mobile-view-counters">
          <p className="profile-mobile-view-counts">{postsCount}</p>
          <p>Posts</p>
        </div>
        <div className="profile-mobile-view-counters">
          <p className="profile-mobile-view-counts">{followersCount}</p>
          <p>followers</p>
        </div>
        <div className="profile-mobile-view-counters">
          <p className="profile-mobile-view-counts">{followingCount}</p>
          <p>following</p>
        </div>
      </div>
      <div className="profile-mobile-view-bio-container">
        <p className="">*ashok_chodipalli*</p>
        <p>*Developer*</p>
        <p>*Techie*</p>
        <p>*Foodie*</p>
      </div>
      <div className="profile-mobile-view-contact-share-container">
        <button>Edit Profile</button>
        <button>Share Profile</button>
        <button>Contact</button>
      </div>
      <div className="profile-mobile-view-posts-tabs-container">
        {tabs.map((eachTab) => (
          <button
            key={eachTab.id}
            alt={eachTab.label}
            onClick={() => setActiveTab(eachTab.id)}
            className={activeTab === eachTab.id ? "mobile-active-tab" : ""}
          >
            {eachTab.id === "posts" && (
              <BiGrid className="profile-mobile-view-profile-posts-icons" />
            )}
            {eachTab.id === "saved" && (
              <img
                src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732603244/LOGOS/Rectangle_black_1_ro1y7h.png"
                alt="post saved image"
                className="mobile-saved"
              />
            )}
            {eachTab.id === "tagged" && (
              <BiUserPin className="profile-mobile-view-profile-posts-icons" />
            )}
          </button>
        ))}
      </div>
      <div className="profile-mobile-view-posts-container">
        {activeTab === "posts" &&
          postsData.map((eachPost) => (
            <div
              className="profile-mobile-view-posts-image-container"
              key={eachPost._id}
            >
              <img
                src={eachPost.imageUrl}
                alt="post image"
                className="profile-mobile-view-post-image"
              />
            </div>
          ))}

        {activeTab === "saved" && (
          <div className="profile-mobile-view-posts-saved-container">
            <h1>Saved</h1>
          </div>
        )}
        {activeTab === "tagged" && (
          <div className="profile-mobile-view-posts-tagged-container">
            <h1>Tagged</h1>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <div className="profile-bg-wrapper">
        <Header />
        {renderProfile()}
        {renderProfileMobileView()}
      </div>
    </>
  );
}

export default Profile;
