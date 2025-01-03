import React, { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Post from "../Post/Post";
import Suggestions from "../Suggestions/Suggestions";
import Story from "../Story/Story";
import { UserContext } from "../../context/UserContext";
import "./home.css";

function Home() {
  const { apiUrl } = useContext(UserContext);
  const [postsData, setPostsData] = useState([]);

  useEffect(() => {
    getHomePosts();
  }, []);

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  const getHomePosts = async () => {
    const jwtToken = Cookies.get("jwt_token");
<<<<<<< HEAD
    const url = `${apiUrl}/users/home-posts`;
=======
    const apiUrl = "https://instagram-clone-backend-rfda.onrender.com/users/home-posts";
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
        setPostsData(data.posts);
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  return (
    <>
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          <Story />
          {postsData.map((eachPost) => (
            <Post key={eachPost._id} postDetails={eachPost} />
          ))}
        </div>
        <Suggestions />
      </div>
    </>
  );
}

export default Home;
