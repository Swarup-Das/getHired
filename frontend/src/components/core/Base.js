import React from "react";
import { PostContextProvider } from "../Contexts/PostContext.js";
import { userProfileContextProvider } from "../Contexts/UserProfileContext.js";
import Nav from "./Nav.js";
const Base = ({ children }) => {
  return (
    <PostContextProvider>
      <userProfileContextProvider>
        <div>
          <Nav />
          {children}
        </div>
      </userProfileContextProvider>
    </PostContextProvider>
  );
};

export default Base;
