import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { IoMdHeart } from "react-icons/io";
import { BiSolidMessageRounded } from "react-icons/bi";
import "./profilepostitem.css";

const ProfilePostItem = (props) => {
  const [likeAndCommentCount, setLikeAndCommentCount] = useState({});

  const { postDetails } = props;
  const { imageUrl, _id } = postDetails;

  useEffect(() => {
    getLikeAndCommentCounts();
  }, []);

  const getLikeAndCommentCounts = async () => {
    const jwtToken = Cookies.get("jwt_token");
    const apiUrl = `http://localhost:3002/users/lc-count/${_id}`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setLikeAndCommentCount(data.counts);
      }
    } catch (error) {
      console.log("Error on likes and comments count");
    }
  };

  const { likesCount, commentsCount } = likeAndCommentCount;

  return (
    <li className="post-item-container">
      <img src={imageUrl} alt="post_image" className="post-item-image" />
      <div className="post-item-overlay-container">
        {likesCount > 0 && (
          <div className="profile-post-likes-container">
            <IoMdHeart className="profile-icons" />
            <p className="profile-likes-comments-count-text">
              {likesCount} {likesCount > 999 ? "K" : ""}
            </p>
          </div>
        )}
        <div className="profile-post-likes-container">
          <BiSolidMessageRounded className="profile-icons" />
          <p className="profile-likes-comments-count-text">
            {commentsCount} {commentsCount > 999 ? "K" : ""}
          </p>
        </div>
      </div>
    </li>
  );
};

export default ProfilePostItem;
