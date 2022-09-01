import React from "react";
import { Link } from "react-router-dom";
import Base from "../../core/Base";
import { isAuthenticated } from "../Auth/AuthHelper";

const Profile = () => {
  return (
    <Base>
      <div>
        <div>
          <h2>Hi {isAuthenticated().user.name}</h2>
          <h3>Email: {isAuthenticated().user.email}</h3>
          <h3>Id: {isAuthenticated().user._id}</h3>
        </div>
        <Link to={"/job/created/byuser"}>Job Created By you</Link>
        <Link to={"#"}>Job Applied By You</Link>
      </div>
      ;
    </Base>
  );
};

export default Profile;
