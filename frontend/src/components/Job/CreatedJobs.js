import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Base from "../core/Base";
import { isAuthenticated } from "../userComponent/Auth/AuthHelper";
import { getPostsByUserId } from "./JobApiHelper";
import "./jobStyles.css";

const CreatedJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [noJobs, setNoJobs] = useState(false);
  const [loading, setLoading] = useState(false);
  const [gotError, setGotError] = useState(false);
  useEffect(() => {
    setLoading(true);
    getPostsByUserId(isAuthenticated().user._id).then((res) => {
      console.log(res);
      if (res.err) {
        setGotError(true);
        setLoading(false);
      }
      setJobs(res.postsByUser);
      setLoading(false);
    });
  }, []);

  const jobListItem = (job) => {
    return (
      <Link style={{ textDecoration: "none" }} to={`/job/byId?id=${job._id}`}>
        <div className="job-list-item">
          <div className="job-list-item-column">{job.company}</div>
          <div className="job-list-item-column">{job._id}</div>
          <div className="job-list-item-column">{job.jobType}</div>
          <div className="job-list-item-column">{job.jobTitle}</div>
        </div>
      </Link>
    );
  };

  return (
    <Base>
      <div>
        <div className="job-list-item heading">
          <div className="job-list-item-column">Company</div>
          <div className="job-list-item-column">Job Id</div>
          <div className="job-list-item-column">Type</div>
          <div className="job-list-item-column">Job Title</div>
        </div>
        {!loading &&
          jobs.map((job) => {
            return jobListItem(job);
          })}
      </div>
    </Base>
  );
};

export default CreatedJobs;
