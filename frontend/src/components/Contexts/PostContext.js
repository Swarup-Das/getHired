import { createContext, useState } from "react";

export const PostContext = createContext();

export const PostContextProvider = (props) => {
  const [postsFromContext, setPostsFromContext] = useState([]);
  return (
    <PostContext.Provider value={[postsFromContext, setPostsFromContext]}>
      {props.children}
    </PostContext.Provider>
  );
};
