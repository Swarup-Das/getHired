import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import queryString from "query-string";
import { getPostByPostId } from "./JobApiHelper";
import { isAuthenticated } from "../userComponent/Auth/AuthHelper";
import { Link } from "react-router-dom";
import ApplyJob from "./ApplyJob";

const Job = () => {
  const [job, setJob] = useState({
    skills: [],
  });
  const [loading, setLoading] = useState(false);
  const [displayApplyDialogue, setDisplayApplyDialogue] = useState(false);
  useEffect(() => {
    setLoading(true);
    console.log(queryString.parse(window.location.search).id);
    getPostByPostId(queryString.parse(window.location.search).id).then(
      (res) => {
        setJob(res.post);
        setLoading(false);
        setTimeout(() => {}, 1000);
      }
    );
  }, []);
  const isCreator = (creatorId) => {
    return creatorId === isAuthenticated().user._id;
  };
  return (
    <Base>
      {displayApplyDialogue && <ApplyJob jobId={job._id} />}
      {!displayApplyDialogue && loading && <h1>Loading...</h1>}
      {!loading && !displayApplyDialogue && (
        <div>
          {isCreator(job.userId) && (
            <div>
              <Link
                style={{ textDecoration: "none" }}
                to={`/job/edit?jobId=${job._id}`}
              >
                Edit
              </Link>
              <Link to={`/job/delete?jobId=${job._id}`}>Delete</Link>
              <Link to={`/job/applicants?jobId=${job._id}`}>
                See Applicants
              </Link>
            </div>
          )}
          {!isCreator(job.userId) && !displayApplyDialogue && (
            <button
              onClick={() => {
                setDisplayApplyDialogue(true);
              }}
            >
              Apply
            </button>
          )}
          <h1>{job.company}</h1>
          <div className="title">{job.jobTitle}</div>
          <div>Job Id: {job._id}</div>
          <div>
            <h3>Job Description:</h3>
            <div>{job.jobDescription}</div>
          </div>
          <div>
            skills required :
            {job.skills.map((skill) => {
              return <span> {skill}</span>;
            })}
          </div>
          <div>salary : {job.salary} LPA</div>
          <div>Type : {job.jobType}</div>
        </div>
      )}
    </Base>
  );
};

export default Job;
