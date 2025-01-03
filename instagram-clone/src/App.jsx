import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./components/SignUp/SignUp";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import Profile from "./components/Profile/Profile";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import NotFound from "./components/NotFound/NotFound";
import Explore from "./components/Explore/Explore";
import Reels from "./components/Reels/Reels";
import UserProfile from "./components/UserProfile/UserProfile";
import StoryPlay from "./components/StoryPlay/StoryPlay";
import "./App.css";

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route
          exact
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/reels"
          element={
            <ProtectedRoute>
              <Reels />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/user-profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/:name"
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />

        <Route
          exact
          path="/stories/:name"
          element={
            <ProtectedRoute>
              <StoryPlay />
            </ProtectedRoute>
          }
        />

        <Route path="/not-found" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/not-found" />} />
      </Routes>
    </>
  );
}

export default App;
