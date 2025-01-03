import React from "react";
import "./SearchUserItem.css";
import { Link } from "react-router-dom";

const SearchUserItem = (props) => {
  const { userDetails } = props;
  const { username, fullname, profilePic } = userDetails;
  const logo = username[0].toUpperCase();
  return (
    <Link to={`/${username}`} className="search-user-item-link">
      <li className="search-user-item">
        {profilePic ? (
          <img src={profilePic} className="search-user-item-logo" />
        ) : (
          <p className="search-user-item-logo">{logo}</p>
        )}
        <div className="search-user-item-username-container">
          <p className="search-user-item-username">{username}</p>
          <p className="search-user-item-fullname">{fullname}</p>
        </div>
      </li>
    </Link>
  );
};

export default SearchUserItem;
