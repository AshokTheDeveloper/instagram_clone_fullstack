import React, { useEffect, useState, useContext } from "react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { LuDot } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { FiMessageCircle } from "react-icons/fi";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import { FaUser } from "react-icons/fa";
import EmojiPicker from "emoji-picker-react";
import Comments from "../Comments/Comments";
import { UserContext } from "../../context/UserContext";

import "./post.css";

const Post = (props) => {
  const { postDetails } = props;

  const { username, imageUrl, profilePic, caption, _id, createdAt } =
    postDetails;

  const { apiUrl } = useContext(UserContext);

  const [commentInput, setCommentInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [showHeart, setShowHeart] = useState(false);

  useEffect(() => {
    getLikesCount();
  }, []);

  useEffect(() => {
    getLikedStatus();
  }, [_id]);

  const onHandleComment = (event) => {
    setCommentInput(event.target.value);
  };

  const onCommentApiHandle = async () => {
    const newComment = {
      postId: _id,
      content: commentInput,
    };

    const jwtToken = Cookies.get("jwt_token");
<<<<<<< HEAD
    const url = `${apiUrl}/users/post-comment`;
=======
    const apiUrl = "https://instagram-clone-backend-rfda.onrender.com/users/post-comment";
>>>>>>> 3bef60cf7fb517776262497cf67d221cc7fa0823
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newComment),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }

    setCommentInput("");
  };

  const handleEmojiClick = (emojiData) => {
    setCommentInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker((prev) => !prev);
  };

  const handleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const emojiPicker = () => (
    <div className="emoji-input-container">
      <button
        onClick={handleEmojiPicker}
        className="post-emoji-button"
        type="button"
      >
        <CiFaceSmile className="emoji-icon" />
      </button>
      {showEmojiPicker && (
        <div className="emoji-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );

  const onLikePostHandle = async () => {
    const newLike = {
      postId: _id,
    };

    const jwtToken = Cookies.get("jwt_token");
<<<<<<< HEAD
    const url = `${apiUrl}/users/like-post`;
=======
    const apiUrl = "https://instagram-clone-backend-rfda.onrender.com/users/like-post";
>>>>>>> 3bef60cf7fb517776262497cf67d221cc7fa0823
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newLike),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setHasLiked(true);
        setLikesCount((prevLikesCount) => prevLikesCount + 1);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  // Double tap post
  const doubleTabToLikeHandle = () => {
    if (!hasLiked) {
      onLikePostHandle();
    }

    setShowHeart(true);
    setTimeout(() => {
      setShowHeart(false);
    }, 500);
  };

  const onUnlikePostHandle = async () => {
    const unlikePost = {
      postId: _id,
    };

    const jwtToken = Cookies.get("jwt_token");
<<<<<<< HEAD
    const url = `${apiUrl}/users/unlike-post`;
=======
    const apiUrl = `https://instagram-clone-backend-rfda.onrender.com/users/unlike-post`;
>>>>>>> 3bef60cf7fb517776262497cf67d221cc7fa0823
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(unlikePost),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        setHasLiked(false);
        setLikesCount((prevLikesCount) => prevLikesCount - 1);
        console.log("Un liked: ", data);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  // Likes count handle
  const getLikesCount = async () => {
    const jwtToken = Cookies.get("jwt_token");
<<<<<<< HEAD
    const url = `${apiUrl}/users/likes/${_id}`;
=======
    const apiUrl = `https://instagram-clone-backend-rfda.onrender.com/users/likes/${_id}`;
>>>>>>> 3bef60cf7fb517776262497cf67d221cc7fa0823
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
        const count = data.likesCount ?? 0;
        setLikesCount(count);
      }
    } catch (error) {
      console.log("Error on likes count: ", error.message);
    }
  };

  // Liked status
  const getLikedStatus = async () => {
    const jwtToken = Cookies.get("jwt_token");
<<<<<<< HEAD
    const url = `${apiUrl}/users/liked-status/${_id}`;
=======
    const apiUrl = `https://instagram-clone-backend-rfda.onrender.com/users/liked-status/${_id}`;
>>>>>>> 3bef60cf7fb517776262497cf67d221cc7fa0823
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
        setHasLiked(data.isLiked);
      }
    } catch (error) {
      console.log("Error on liked status");
    }
  };

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

  const newDate = formatRelativeTime(createdAt);

  const renderPost = () => (
    <li className="post-bg-container">
      <div className="post-top-section-container">
        <div className="post-profile-and-username-container">
          <div className="post-profile-gradient-container">
            <Link to={`/${username}`} className="post-username-link">
              <div className="post-profile-container">
                {profilePic ? (
                  <img
                    src={profilePic}
                    alt={username}
                    className="post-profile-picture"
                  />
                ) : (
                  <FaUser className="null-post-profile-picture" />
                )}
              </div>
            </Link>
          </div>
          <div className="username-nation-status-container">
            <div className="post-username-nation">
              <Link to={`/${username}`} className="post-username-link">
                {username}
              </Link>
              <p className="post-user-nation">India</p>
            </div>
            <LuDot />
            <p className="post-posted-time">{newDate}</p>
            <LuDot />
            <p className="post-followed-status">followed</p>
          </div>
        </div>
        <button type="button" className="post-top-edit-button">
          <BsThreeDots className="post-three-dots-icon" />
        </button>
      </div>
      <div className="post-container" onDoubleClick={doubleTabToLikeHandle}>
        <img src={imageUrl} alt="post image" className="posts-post-image" />
        <img
          src="https://res.cloudinary.com/dmui27xl3/image/upload/v1733627158/ICONS/Vector_heart_ptxfwe.png"
          alt="heart_image"
          className={`liked-heart-image ${showHeart ? "show-heart" : ""}`}
        />
      </div>
      <div className="post-like-comment-share-icons-container">
        <div>
          {hasLiked ? (
            <button
              className="post-bottom-section-button"
              onClick={onUnlikePostHandle}
            >
              <GoHeartFill className="posts-icons liked-heart-icon" />
            </button>
          ) : (
            <button
              className="post-bottom-section-button"
              onClick={onLikePostHandle}
            >
              <GoHeart className="posts-icons" />
            </button>
          )}

          <button className="post-bottom-section-button">
            <FiMessageCircle className="posts-icons" />
          </button>
          <button className="post-bottom-section-button">
            <IoPaperPlaneOutline className="posts-icons" />
          </button>
        </div>
        <button className="post-bottom-section-button saved-button">
          <img
            src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732603244/LOGOS/Rectangle_black_1_ro1y7h.png"
            alt="post saved image"
            className="posts-saved-image"
          />
        </button>
      </div>
      <div className="post-likes-count-container">
        {likesCount > 0 && ( // likes count
          <p className="posts-likes-counter">
            {likesCount} {likesCount > 1 ? "likes" : "like"}
          </p>
        )}
      </div>
      <div className="username-caption-container">
        <Link to={`/${username}`} className="post-caption-username">
          {username}
        </Link>
        <span className="post-caption">{caption}</span>
      </div>
      <div className="post-comments">
        {<Comments postDetails={postDetails} />}
      </div>
      <div className="post-comments-container">
        <input
          placeholder="Add a comment..."
          value={commentInput}
          className="comment-input"
          onChange={onHandleComment}
        />
        {commentInput.trim().length > 0 && (
          <button className="posts-post-button" onClick={onCommentApiHandle}>
            Post
          </button>
        )}
        {emojiPicker()}
      </div>
    </li>
  );

  return <>{renderPost()}</>;
};

export default Post;
