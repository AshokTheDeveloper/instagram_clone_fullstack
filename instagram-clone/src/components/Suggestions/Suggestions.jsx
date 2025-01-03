import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { IoPersonCircle } from "react-icons/io5";
import { FaRegCopyright } from "react-icons/fa";
import SuggestionItem from "../SuggestionItem/SuggestionItem";
import SuggestionsFooter from "../SuggestionsFooter/SuggestionsFooter";
import { UserContext } from "../../context/UserContext";
import "./suggestions.css";

const Suggestions = () => {
  const [usersData, setUsersData] = useState([]);
  const [profileUser, setProfileUser] = useState("");
  const { apiUrl } = useContext(UserContext);

  useEffect(() => {
    getUsers();
    getProfileUser();
  }, []);

  const getProfileUser = async () => {
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
        setProfileUser(data.profileUser);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const getUsers = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/suggestion-users`;
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
        setUsersData(data.users);
      }
    } catch (error) {
      console.log(
        "Response error on get users at suggestions: ",
        error.message
      );
    }
  };

  const onClickFollowUser = async (id) => {
    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/follow-user`;
    const apiUrl = "https://instagram-clone-backend-rfda.onrender.com/users/follow-user";

    const newUser = {
      userId: id,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newUser),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const { username, fullname, profilePic } = profileUser;

  return (
    <div className="suggestions-bg-container">
      <div className="suggestions-container">
        <div className="suggestions-switch-user-container">
          <div className="suggestions-user-icon-container">
            {profilePic ? (
              <img
                src={profilePic}
                alt={fullname}
                className="suggestions-user-profile-pic"
              />
            ) : (
              <IoPersonCircle className="suggestions-person-icon" />
            )}

            <div className="suggestions-profile-link-container">
              <Link to="/user-profile" className="suggestions-profile-link">
                {username}
              </Link>
              <p className="suggestions-username">{fullname}</p>
            </div>
          </div>
          <button className="suggestions-switch-button">switch</button>
        </div>
        <div className="suggestions">
          <div className="suggestions-view-all-button-container">
            <p className="suggestion-suggested-text">suggested for you</p>
            <button type="button" className="suggestions-view-all-button">
              See All
            </button>
          </div>
          <ul className="suggestions-items">
            {usersData.map((eachUser) => (
              <SuggestionItem
                key={eachUser._id}
                userDetails={eachUser}
                followUser={onClickFollowUser}
              />
            ))}
          </ul>
        </div>
        <div className="suggestions-footer">
          <SuggestionsFooter />
        </div>
        <div className="copyright-info-container">
          <FaRegCopyright className="copyright-icon" />
          <p className="copyright-text">2024 INSTAGRAM FROM META</p>
        </div>
      </div>
    </div>
  );
};

export default Suggestions;
