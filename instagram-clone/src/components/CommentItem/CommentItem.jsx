import React from "react";
import { Link } from "react-router-dom";
import "./commentitem.css";

const CommentItem = (props) => {
  const { commentDetails } = props;
  const { userDetails } = commentDetails;
  const { username, profilePic } = userDetails;
  const { content, createdAt } = commentDetails;
  const profileLetter = username[0].toUpperCase();

  const formatRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - new Date(date)) / 1000);
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

  const convertedDate = formatRelativeTime(createdAt);

  return (
    <li className="comment-list-item">
      {profilePic ? (
        <img
          src={profilePic}
          alt="username"
          className="comments-user-profile"
        />
      ) : (
        <p className="comments-user-profile">{profileLetter}</p>
      )}

      <div className="username">
        <p className="comment-text">
          <Link to={`/${username}`} className="comment-commented-username">
            {username}
          </Link>
          {content}
        </p>
        <p className="commented-date">{convertedDate}</p>
      </div>
    </li>
  );
};

export default CommentItem;
