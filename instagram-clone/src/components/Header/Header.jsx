import React, { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { GoHomeFill, GoHome } from "react-icons/go";
import {
  IoPersonCircleOutline,
  IoSearchOutline,
} from "react-icons/io5";
import { FaRegCompass, FaRegHeart, FaThreads } from "react-icons/fa6";
import { BiMoviePlay } from "react-icons/bi";
import { RxHamburgerMenu } from "react-icons/rx";
import { FiInstagram, FiPlusSquare, FiSun } from "react-icons/fi";
import { LuPlaySquare } from "react-icons/lu";
import { MdVideocam } from "react-icons/md";
import { SlGraph } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";
import { RxCrossCircled } from "react-icons/rx";
import { RiSettings2Line, RiMessengerLine } from "react-icons/ri";
import { LuActivitySquare } from "react-icons/lu";
import { TbMessageReport } from "react-icons/tb";
import { IoMdClose } from "react-icons/io";
import { CiLogout } from "react-icons/ci";
import SearchUserItem from "../SearchUserItem/SearchUserItem";
import { UserContext } from "../../context/UserContext";
import "./header.css";

const Header = () => {
  const navigate = useNavigate();
  const { apiUrl } = useContext(UserContext);

  const [userData, setUserData] = useState({});
  const [showSearch, setShowSearch] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [showCreate, setShowCreate] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [post, setPost] = useState("");
  const [createCaption, setCreateCaption] = useState(false);
  const [openCaption, setOpenCaption] = useState(false);
  const [postedImage, setPostedImage] = useState("");
  const [captionText, setCaptionText] = useState("");
  const [open, setOpen] = useState(false);
  const [posted, setPosted] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    initiateUploadPostApi();
  }, [post]);

  useEffect(() => {
    searchUsersApiHandle();
  }, [searchInput]);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const url = `${apiUrl}/users/profile-user`;
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
        setUserData(data.profileUser);
      } else {
        console.log("Error on header user: ", data);
      }
    } catch (error) {
      console.log("Response error on get user on header", error.message);
    }
  };

  const onCaptionInputChange = (event) => {
    setCaptionText(event.target.value);
  };

  const createPostCaption = () => {
    setCreateCaption((prevState) => !prevState);
  };

  const onClickNextHandle = () => {
    setOpenCaption((prevState) => !prevState);
  };

  const onSuccessfulPosting = () => {
    setPosted(true);
  };

  const onClickShareHandle = async () => {
    if (!postedImage || !captionText) {
      return;
    }

    const newPost = {
      imageUrl: postedImage,
      caption: captionText,
    };

    const url = `${apiUrl}/users/create-post`;
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(newPost),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        onSuccessfulPosting();
      }
    } catch (error) {
      console.log("Failed to post", error.message);
    }
  };

  // Post
  const onHandleCreatePopup = () => {
    setShowCreate((prevState) => !prevState);
  };

  const onClickCreate = () => {
    setShowCreate((prevState) => !prevState);
  };

  // Upload post
  const handleFileInput = (event) => {
    setPost(event.target.files[0]);
  };

  // More popup
  const onHandleMoreOptions = () => {
    setShowMore((prevState) => !prevState);
  };

  // Search
  const onHeaderChange = () => {
    setShowSearch((prevState) => !prevState);
  };

  const handleMobileSearchPopup = () => {
    setShowMobileSearch((prevState) => !prevState);
  };

  const closeMobileSearchPopupHandle = () => {
    setShowMobileSearch((prevState) => !prevState);
    setSearchInput("");
  };

  // Logout
  const onLogoutHandle = () => {
    Cookies.remove("jwt_token");
    navigate("/login");
  };

  // Upload API should be implemented tomorrow
  const initiateUploadPostApi = async () => {
    if (!post) {
      return;
    }
    const preset = "insta-project";
    const cloudName = "dmui27xl3";

    const postData = new FormData();

    postData.append("file", post);
    postData.append("upload_preset", preset);
    postData.append("cloud_name", cloudName);

    const apiUrl = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
    const options = {
      method: "POST",
      body: postData,
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response.ok) {
        setPostedImage(data.secure_url);
        createPostCaption();
        console.log(data);
      }
      setPost("");
    } catch (error) {
      console.log("Error on uploading post image: ", error.message);
    }
  };

  const onSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const onClearSearchInput = () => {
    setSearchInput("");
  };

  const searchUsersApiHandle = async () => {
    if (searchInput.trim() === "") {
      setSearchResult([]);
      return;
    }
    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/search?query=${searchInput}`;
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
        setSearchResult(data.users);
      }
    } catch (error) {
      console.log("Error on search users: ", error.message);
    }
  };

  const renderSearchResults = () => (
    <>
      {searchResult.length > 0 ? (
        <ul className="search-user-items-container">
          {searchResult.map((eachUser) => (
            <SearchUserItem key={eachUser._id} userDetails={eachUser} />
          ))}
        </ul>
      ) : (
        <p>No results found</p>
      )}
    </>
  );

  const renderSearchResultsMobile = () => (
    <div className="search-user-items-mobile-container">
      <div className="mobile-search-input-container">
        <input
          type="text"
          placeholder="Search"
          value={searchInput}
          onChange={onSearchInputChange}
        />
        <button
          className="mobile-popup-search-close-button"
          onClick={closeMobileSearchPopupHandle}
        >
          <IoMdClose className="mobile-search-close-icon" />
        </button>
      </div>
      {searchResult.length > 0 ? (
        <ul className="mobile-search-results">
          {searchResult.map((eachUser) => (
            <SearchUserItem key={eachUser._id} userDetails={eachUser} />
          ))}
        </ul>
      ) : (
        <p className="mobile-no-results-text">No results found</p>
      )}
    </div>
  );

  // Search popup
  const renderSearchContainer = () => (
    <div
      className={`search-bg-container ${
        showSearch ? "" : "expand-search-container"
      }`}
    >
      <div className="search-input-container">
        <h1 className="search-input-text">Search</h1>
        <div className="input-and-clear-button-container">
          <input
            className="search-input"
            value={searchInput}
            type="text"
            placeholder="Search"
            onChange={onSearchInputChange}
          />
          <button className="clear-result-button" onClick={onClearSearchInput}>
            <RxCrossCircled className="clear-result-icon" />
          </button>
        </div>
      </div>
      <div className="search-results-container">
        {!searchInput && (
          <div>
            <h1 className="search-results-recent-text">Recent</h1>
            <div className="search-results">
              <h1 className="no-search-results-text">No recent searches.</h1>
            </div>
          </div>
        )}
        {searchInput.length > 0 && renderSearchResults()}
      </div>
    </div>
  );

  const onHandle = async () => {
    setOpen((prevState) => !prevState);
    setShowCreate(false);
  };

  const onClosePostedPopup = () => {
    setOpen((prevState) => !prevState);
    setShowCreate(false);
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };



  const renderPosting = () => (
    <div className="create-modal-container" onClick={onHandle}>
      <div
        className="post-popup-modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }} // Prevents event bubbling
      >
        <div
          className={`upload-post-container ${
            openCaption ? "create-post-caption-container" : ""
          } `}
        >
          <div className="create-new-post-text-container">
            <p className="create-new-post-text">Create new post</p>
            {openCaption
              ? createCaption && (
                  <button
                    className="post-next-button"
                    onClick={onClickShareHandle}
                  >
                    Share
                  </button>
                )
              : createCaption && (
                  <button
                    className="post-next-button"
                    onClick={onClickNextHandle}
                  >
                    Next
                  </button>
                )}
          </div>
          {createCaption ? (
            <div className="caption-container">
              {!openCaption && (
                <img
                  src={postedImage}
                  alt="post_image"
                  className="posted-image"
                />
              )}
              <div className="show-mobile-caption-container">
                <img
                  src={postedImage}
                  alt="post_image"
                  className="posted-image"
                />
              </div>

              {openCaption && (
                <div className="post-right-section-container">
                  <div className="post-caption-username-container">
                    <IoPersonCircleOutline className="post-caption-icons" />
                    <p className="post-caption-user-text">AsDev.</p>
                  </div>
                  <textarea
                    placeholder="Add caption..."
                    type="textarea"
                    rows={10}
                    cols={40}
                    value={captionText}
                    onChange={onCaptionInputChange}
                    className="caption-text-input"
                  ></textarea>
                </div>
              )}
            </div>
          ) : (
            !openCaption && (
              <>
                <div className="upload-create-post-container">
                  <img
                    src="https://res.cloudinary.com/dmui27xl3/image/upload/v1733067716/LOGOS/Group_7_11zon_julzr8_11zon_s1bdff.png"
                    alt="post icon"
                    className="upload-image"
                  />
                  <p className="upload-post-text">
                    Drag photos and videos here
                  </p>
                  <label htmlFor="uploadingImage" className="file-input-label">
                    Select from computer
                  </label>
                  <input
                    id="uploadingImage"
                    type="file"
                    className="file-input"
                    onChange={handleFileInput}
                  />
                </div>
              </>
            )
          )}
        </div>
      </div>
    </div>
  );

  const renderPosted = () => (
    <div className="create-modal-container" onClick={onHandle}>
      <div
        className="post-popup-modal-container"
        onClick={(e) => {
          e.stopPropagation();
        }} // Prevents event bubbling
      >
        <div className="upload-post-container">
          <p className="create-new-posted-text">Post shared</p>
          <div className="posted-text-container">
            <img
              src="https://res.cloudinary.com/dmui27xl3/image/upload/v1733128271/LOGOS/insta_posted_vley2t.png"
              alt="posted icon"
              className="posted-icon"
            />
            <p>Your post has been shared</p>
          </div>
        </div>
      </div>
    </div>
  );

  // create post Popup
  const custom = () => (
    <>
      <button className="post-popup-close-button" onClick={onClosePostedPopup}>
        <RxCross2 className="popup-icon" />
      </button>

      {posted ? renderPosted() : renderPosting()}
    </>
  );

  const renderCreatePost = () => (
    <div className={`create-post-popup ${showCreate ? "create-popup" : ""}`}>
      <button className="post-create-button" onClick={onHandle}>
        <p>Post</p>
        <LuPlaySquare className="post-icon" />
      </button>
      <button className="post-create-button" onClick={onHandleCreatePopup}>
        <p>Live</p>
        <MdVideocam className="post-icon" />
      </button>
      <button className="post-create-button" onClick={onHandleCreatePopup}>
        <p>Ad</p>
        <SlGraph className="post-icon" />
      </button>
    </div>
  );

  const renderMoreOptions = () => (
    <div className="more-options-bg-container">
      <div className="more-options-container">
        <div className="more-options-top-container">
          <button type="button" className="more-option-buttons">
            <RiSettings2Line className="more-options-icons" />
            Settings
          </button>
          <button type="button" className="more-option-buttons">
            <LuActivitySquare className="more-options-icons" />
            Your activity
          </button>
          <button type="button" className="more-option-buttons">
            <img
              src="https://res.cloudinary.com/dmui27xl3/image/upload/v1732603244/LOGOS/Rectangle_black_1_ro1y7h.png"
              alt="saved"
              className="saved-more-options-icon"
            />
            Saved
          </button>
          <button type="button" className="more-option-buttons">
            <FiSun className="more-options-icons" />
            Switch appearance
          </button>
          <button type="button" className="more-option-buttons">
            <TbMessageReport className="more-options-icons" />
            Report a problem
          </button>
        </div>
        <div className="more-options-center-container">
          <button type="button" className="more-option-buttons">
            <FaThreads className="more-options-icons" />
            Threads
          </button>
        </div>
        <div className="more-options-center-container">
          <button type="button" className="more-option-buttons">
            switch accounts
          </button>
        </div>
        <div className="more-options-bottom-container">
          <button className="more-option-buttons" onClick={onLogoutHandle}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );

  const renderMobileHeader = () => (
    <div className="instagram-mobile-header-container">
      <Link to="/">
        <img
          src="https://res.cloudinary.com/dmui27xl3/image/upload/v1713177035/LOGOS/insta_logo_png_black_n2b04f.png"
          alt="instagram logo"
          className="header-instagram-logo-mobile"
        />
      </Link>
      <div className="mobile-icons-container">
        <button className="mobile-header-logout-button">
          <FaRegHeart className="mobile-nav-icons" />
        </button>
        <button className="mobile-header-logout-button">
          <RiMessengerLine className="mobile-nav-icons" />
        </button>
        <button
          className="mobile-header-logout-button"
          onClick={onLogoutHandle}
        >
          <CiLogout className="mobile-nav-icons" />
        </button>
      </div>
    </div>
  );

  const renderMobileBottomHeader = () => (
    <div className="mobile-header-bottom-container">
      <Link to="/" className="links">
        <GoHomeFill className="mobile-nav-icons" />
      </Link>
      <IoSearchOutline
        className="nav-icons"
        onClick={handleMobileSearchPopup}
      />
      <FiPlusSquare className="nav-icons" onClick={onHandle} />
      {open && custom()}
      <BiMoviePlay className="nav-icons" />
      <Link to="/user-profile" className="links">
        {profilePic ? (
          <img src={profilePic} alt="user" className="nav-icons" />
        ) : (
          <IoPersonCircleOutline className="nav-icons" />
        )}
      </Link>
      {showMobileSearch && renderSearchResultsMobile()}
    </div>
  );

  const { profilePic } = userData;
  const header = () => (
    <div className={`side-header ${showSearch ? "expanded" : ""}`}>
      <Link className="logo-nav-item-container links" to="/">
        <div className="item">
          {showSearch ? (
            <img
              src="https://res.cloudinary.com/dmui27xl3/image/upload/v1713177035/LOGOS/insta_logo_png_black_n2b04f.png"
              alt="instagram logo"
              className="header-instagram-logo"
            />
          ) : (
            <FiInstagram className="nav-icons" />
          )}
        </div>
      </Link>
      <Link className="nav-item-container links" to="/">
        <div className="item">
          {showSearch ? (
            <GoHomeFill className="nav-icons" />
          ) : (
            <GoHome className="nav-icons" />
          )}
          <span className="search-text">Home</span>
        </div>
      </Link>
      <button
        className="nav-search-button nav-item-container"
        onClick={onHeaderChange}
      >
        <div className="item">
          <IoSearchOutline className="nav-icons" />
          <span className="search-text">Search</span>
        </div>
      </button>
      {renderSearchContainer()}
      <Link className="nav-item-container links" to="/explore">
        <div className="item">
          <FaRegCompass className="nav-icons" />
          <span className="search-text">Explore</span>
        </div>
      </Link>
      <Link className="nav-item-container links" to="/reels">
        <div className="item">
          <BiMoviePlay className="nav-icons" />
          <span className="search-text">Reels</span>
        </div>
      </Link>
      <Link className="nav-item-container links" to="/">
        <div className="item">
          <RiMessengerLine className="nav-icons" />
          <span className="search-text">Messages</span>
        </div>
      </Link>
      <button className="nav-item-container create-button">
        <div>
          <div className="item">
            <FaRegHeart className="nav-icons" />
            <span className="search-text">Notifications</span>
          </div>
        </div>
      </button>
      <button
        className="nav-item-container create-button"
        onClick={onClickCreate}
      >
        <div className="item">
          <FiPlusSquare className="nav-icons" />
          <span className="search-text">Create</span>
        </div>
      </button>
      {showCreate && renderCreatePost()}
      {open && custom()}
      <Link className="nav-item-container links" to="/user-profile">
        <div className="item">
          <>
            {profilePic ? (
              <img src={profilePic} alt="user" className="nav-icons" />
            ) : (
              <IoPersonCircleOutline className="nav-icons" />
            )}
          </>
          <span className="search-text">Profile</span>
        </div>
      </Link>
      <button
        className="nav-item-container more-options-button"
        onClick={onHandleMoreOptions}
      >
        <div className="item">
          <RxHamburgerMenu className="nav-icons" />
          <span className="search-text">More</span>
        </div>
      </button>
      {showMore && renderMoreOptions()}
    </div>
  );

  return (
    <>
      {renderMobileHeader()}
      {header()}
      {renderMobileBottomHeader()}
    </>
  );
};

export default Header;
