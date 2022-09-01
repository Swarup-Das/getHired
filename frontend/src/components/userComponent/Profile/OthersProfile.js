import React, { useEffect, useState } from "react";
import Base from "../../core/Base";
import queryString from "query-string";
import { getUserDetailsById } from "./ProfileApiHelper";
const OthersProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  useEffect(() => {
    // console.log(queryString.parse(window.location.search).userId);
    getUserDetailsById(queryString.parse(window.location.search).userId).then(
      (res) => {
        if (!res.error) {
          setUserDetails(res.user);
          // console.log(res);
        }
      }
    );
  }, []);
  return (
    <Base>
      <div>
        <h3>{userDetails.name}</h3>
        <h3>{userDetails._id}</h3>
        <h3>{userDetails.email}</h3>
      </div>
    </Base>
  );
};

export default OthersProfile;
