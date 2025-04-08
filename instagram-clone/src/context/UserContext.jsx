import { createContext } from "react";

export const UserContext = createContext();

const InstagramContextProvider = (props) => {
  const apiUrl = "https://instagram-clone-backend-rfda.onrender.com";

  // const apiUrl = "http://localhost:3002";

  const contextValue = {
    apiUrl,
  };

  return (
    <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>
  );
};

export default InstagramContextProvider;
