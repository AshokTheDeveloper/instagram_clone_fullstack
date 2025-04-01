import "./home.css";
import { useContext, useEffect, useState } from "react";
import Header from "../Header/Header";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import Post from "../Post/Post";
import Suggestions from "../Suggestions/Suggestions";
import Story from "../Story/Story";
import { UserContext } from "../../context/UserContext";
import ProgressBar from "../ProgressBar/ProgressBar";

const apiStatusConstants = {
  initial: "INITIAL",
  success: "SUCCESS",
  progress: "IN_PROGRESS",
  failure: "FAILURE",
};

function Home() {
  const { apiUrl } = useContext(UserContext);
  const [postsData, setPostsData] = useState([]);
  const [status, setStatus] = useState(apiStatusConstants.initial);

  useEffect(() => {
    getHomePosts();
  }, []);

  const jwtToken = Cookies.get("jwt_token");
  if (jwtToken === undefined) {
    return <Navigate to="/login" />;
  }

  const getHomePosts = async () => {
    setStatus(apiStatusConstants.progress);

    const jwtToken = Cookies.get("jwt_token");
    const url = `${apiUrl}/users/home-posts`;
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
        if (data.postsCount !== 0) {
          setPostsData(data.posts);
          setStatus(apiStatusConstants.success);
        } else {
          setStatus(apiStatusConstants.failure);
        }
      }
    } catch (error) {
      console.log("Response error: ", error.message);
    }
  };

  const renderHome = () => (
    <>
      {postsData.map((eachPost) => (
        <Post key={eachPost._id} postDetails={eachPost} />
      ))}
    </>
  );

  const renderCurrentView = () => {
    switch (status) {
      case apiStatusConstants.progress:
        return <ProgressBar />;
      case apiStatusConstants.success:
        return renderHome();
      case apiStatusConstants.failure:
        return <h1>You are caught up</h1>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="home-bg-container">
        <Header />
        <div className="home-container">
          <Story />
          {renderCurrentView()}
        </div>
        <Suggestions />
      </div>
    </>
  );
}

export default Home;
