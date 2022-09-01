import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../userComponent/Auth/AuthHelper";
import { applyJobByJobId } from "./JobApiHelper";

const ApplyJob = ({ jobId }) => {
  const [success, setSuccess] = useState(false);
  const [clicked, setClicked] = useState(false);
  const handleSubmit = () => {
    applyJobByJobId(isAuthenticated().user._id, jobId).then((res) => {
      console.log(res);
      if (res.err) {
        setSuccess(false);
      }
      setSuccess(true);
      setClicked(true);
    });
  };
  const showMessage = () => {
    return clicked && success ? (
      <h3>Applied successfully</h3>
    ) : (
      <h3>Unable to apply</h3>
    );
  };
  return (
    <div>
      <div>Are you sure?</div>
      {clicked && showMessage()}
      <button
        onClick={() => {
          handleSubmit();
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default ApplyJob;
