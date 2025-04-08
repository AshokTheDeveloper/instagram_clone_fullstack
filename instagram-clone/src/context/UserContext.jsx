import { createContext } from "react";

export const UserContext = createContext();

const InstagramContextProvider = (props) => {
  const apiUrl = "https://insta-backend-fo5q.onrender.com";

  const contextValue = {
    apiUrl,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default InstagramContextProvider;
