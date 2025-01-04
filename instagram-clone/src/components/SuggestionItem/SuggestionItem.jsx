import React, { useContext, useEffect, useState } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../../context/UserContext";
import "./SuggestionItem.css";

const SuggestionItem = (props) => {
  const { userDetails, followUser } = props;
  const { _id, username, profilePic } = userDetails;
  const { apiUrl } = useContext(UserContext);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    getFollowStatus();
  }, [_id]);



  const getFollowStatus = async () => {
    const url = `${apiUrl}/users/follow-status/${_id}`;
    const jwtToken = Cookies.get("jwt_token");
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
        setIsFollowing(data.isFollowed);
      }
    } catch (error) {
      console.error("Error getting follow status: ", error);
    }
  };

  const onClickFollow = () => {
    followUser(_id);
  };

  return (
    <li className="suggestion-item-bg-container">
      <div className="suggestion-item-switch-user-container">
        <div className="suggestion-item-user-icon-container">
          {profilePic ? (
            <img
              src={profilePic}
              alt={username}
              className="suggestion-item-profile-pic"
            />
          ) : (
            <IoPersonCircle className="suggestion-item-profile-pic suggestion-item-person-icon" />
          )}

          <div className="suggestion-item-profile-link-container">
            <Link className="suggestion-item-profile-link">{username}</Link>
            <p className="suggestion-item-username">suggested</p>
          </div>
        </div>
        <button
          className="suggestion-item-follow-button"
          onClick={onClickFollow}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </button>
      </div>
    </li>
  );
};

export default SuggestionItem;
