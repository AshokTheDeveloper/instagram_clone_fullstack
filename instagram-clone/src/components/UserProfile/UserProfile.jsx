import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../Header/Header";
import { PiGearSixLight } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { AiOutlineLink } from "react-icons/ai";
import { BiGrid, BiMoviePlay, BiUserPin } from "react-icons/bi";
import ProfilePostItem from "../ProfilePostItem/ProfilePostItem";
import { UserContext } from "../../context/UserContext";
import "./UserProfile.css";

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

function UserProfile() {
  const { name } = useParams();
  const { apiUrl } = useContext(UserContext);

  const [userData, setUserData] = useState({});
  const [postsData, setPostsData] = useState([]);
  const [activeTab, setActiveTab] = useState("posts");

  const { username, profilePic, followersCount, followingCount, postsCount } =
    userData;
  useEffect(() => {
    getUserProfile();
    getProfilePosts();
  }, []);

  const getUserProfile = async () => {
    const jwtToken = Cookies.get("jwt_token");

    const url = `${apiUrl}/users/${name}`;
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
        setUserData(data.userProfile);
      }
    } catch (error) {
      console.log("Failure on posts fetching: ", error.message);
    }
  };

  const getProfilePosts = async () => {
    const jwtToken = Cookies.get("jwt_token");

    const url = `${apiUrl}/users/posts/${name}`;
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
        if (data.posts.length !== 0) {
          setPostsData(data.posts);
        }
      } else {
        console.log("Error on posts: ", data.message);
      }
    } catch (error) {
      console.log("Failure on posts fetching: ", error.message);
    }
  };

  const renderTopProfileSection = () => (
    <div className="another-user-profile">
      {profilePic ? (
        <div className="profile-pic-container">
          <div className="profile-gradient-container">
            <img
              src={profilePic}
              alt="user profile"
              className="profile-picture"
            />
          </div>
        </div>
      ) : (
        <div className="null-profile-pic-container">
          <FaUser className="null-profile-picture" />
        </div>
      )}

      <div className="another-user-profile-details">
        <div className="another-profile-user-name-container">
          <button className="profile-username">{username}</button>
          <button type="button" className="profile-user-buttons">
            following
          </button>
          <button type="button" className="profile-user-buttons">
            follow
          </button>
          <button type="button" className="profile-user-settings-button">
            <PiGearSixLight className="user-profile-icons" />
          </button>
        </div>
        <ul className="another-user-profile-followers-container">
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
          <p className="profile-bio-username">{username}</p>
          <ul className="profile-bio-item-container">
            <li className="profile-bio-item">builder of stuff</li>
            <li className="profile-bio-item">tequila sipper</li>
            <li className="profile-bio-item">og girl dad 💕</li>
          </ul>
          <a href="#" className="profile-media-links">
            <AiOutlineLink className="profile-media-link-icon" />
            rock.komi.io
          </a>
        </div>
      </div>
    </div>
  );

  const renderStories = () => (
    <div className="user-profile-stories-container">
      <div className="story-input-container">
        <button className="stories-adding-button">
          <div className="stories-icons-container">
            <GoPlus className="user-profile-stories-icon" />
          </div>
        </button>
        <p className="new-story-text">New</p>
      </div>
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
    <div className="user-profile-bg-container">
      <div className="user-profile-container">
        <div className="another-user-profile-details-container">
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
            />
          </div>
        ) : (
          <label
            className="profile-mobile-view-null-user-container"
            htmlFor="profileInput"
          >
            <FaUser className="profile-mobile-view-null-user" />
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
        <p className="">{username}</p>
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
      <Header />
      {renderProfile()}
      {renderProfileMobileView()}
    </>
  );
}

export default UserProfile;
