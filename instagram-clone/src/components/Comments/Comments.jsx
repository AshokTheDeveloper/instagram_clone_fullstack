import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import CommentItem from "../CommentItem/CommentItem";
import { IoClose } from "react-icons/io5";
import { CiFaceSmile } from "react-icons/ci";
import EmojiPicker from "emoji-picker-react";
import { IoIosArrowBack } from "react-icons/io";
import { UserContext } from "../../context/UserContext";
import "./Comments.css";

const Comments = (props) => {
  const { apiUrl } = useContext(UserContext);

  const { postDetails } = props;
  const { _id, imageUrl } = postDetails;
  const [comments, setComments] = useState([]);
  const [openComments, setOpenComments] = useState(false);
  const [commentInput, setCommentInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    getComments();
    getUser();
  }, []);

  const getComments = async () => {
    const url = `${apiUrl}/users/comments/${_id}`;
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
        if (data.comments.length !== 0) {
          setComments(data.comments);
        }
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

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

  const popupHandler = () => {
    setOpenComments((prevState) => !prevState);
  };

  const commentsCount = comments.length;

  const renderCommentsCountButton = () =>
    commentsCount > 0 && (
      <button
        type="button"
        className="comments-view-comments-button"
        onClick={popupHandler}
      >
        View all {commentsCount} comments
      </button>
    );

  const handleEmojiClick = (emojiData) => {
    setCommentInput((prev) => prev + emojiData.emoji);
    setShowEmojiPicker((prev) => !prev);
  };

  const onHandleComment = (event) => {
    setCommentInput(event.target.value);
  };

  const handleEmojiPicker = () => {
    setShowEmojiPicker((prev) => !prev);
  };

  const emojiPicker = () => (
    <div className="popup-comment-emoji-input-container">
      <button
        onClick={handleEmojiPicker}
        className="post-emoji-button"
        type="button"
      >
        <CiFaceSmile className="popup-comment-emoji-icon" />
      </button>
      {showEmojiPicker && (
        <div className="emoji-container">
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );

  const onCommentApiHandle = async () => {
    const newComment = {
      postId: _id,
      content: commentInput,
    };

    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/post-comment`;
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
        console.log(data);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }

    setCommentInput("");
  };

  const renderCommentsPopup = () => (
    <>
      <div className="comments-popup-bg-container" onClick={popupHandler}>
        <div
          className="comments-popup-container"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="comments-popup-post-container">
            <img
              src={imageUrl}
              alt="comment_post"
              className="comment-post-image"
            />
          </div>
          <div className="comment-and-input-container">
            <div className="comment-popup-top-profile-section">
              <img
                src={user.profilePic}
                alt=""
                className="comment-popup-profile"
              />
              <p className="comments-popup-username">{user.username}</p>
            </div>
            <div className="comments-scroll-container">
              <button
                onClick={popupHandler}
                className="mobile-comments-back-arrow-button"
              >
                <IoIosArrowBack className="mobile-comments-arrow-icon" />
              </button>

              <ul className="comments-container">
                {comments.map((eachComment) => (
                  <CommentItem
                    key={eachComment._id}
                    commentDetails={eachComment}
                  />
                ))}
              </ul>
            </div>
            <div className="comment-popup-input-container">
              {emojiPicker()}
              <input
                placeholder="Add a comment..."
                value={commentInput}
                className="popup-comment-input"
                onChange={onHandleComment}
              />
              {commentInput.trim().length > 0 && (
                <button
                  onClick={onCommentApiHandle}
                  className="posts-post-button"
                >
                  Post
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="comments-popup-close-button"
        onClick={popupHandler}
      >
        <IoClose className="comment-popup-icon" />
      </button>
    </>
  );

  return (
    <div className="comments-bg-container">
      {renderCommentsCountButton()} {openComments && renderCommentsPopup()}
    </div>
  );
};

export default Comments;
