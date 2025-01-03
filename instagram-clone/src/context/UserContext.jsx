import { createContext } from "react";

export const UserContext = createContext();

const InstagramContextProvider = (props) => {
  const contextValue = {};
  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};

export default InstagramContextProvider;
