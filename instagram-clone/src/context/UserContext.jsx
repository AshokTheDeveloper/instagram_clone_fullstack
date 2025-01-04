import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const UserContext = createContext();

const InstagramContextProvider = (props) => {
  const [user, setUser] = useState({});
  const apiUrl = "https://instagram-clone-backend-rfda.onrender.com";

  useEffect(() => {
    getUser();
  }, []);

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

  const contextValue = {
    user,
    apiUrl,
  };
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default InstagramContextProvider;
