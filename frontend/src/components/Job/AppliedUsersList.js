import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { getPostByPostId } from "./JobApiHelper";
import queryString from "query-string";
import "./jobStyles.css";
import { Link } from "react-router-dom";
const AppliedUsersList = () => {
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    getPostByPostId(queryString.parse(window.location.search).jobId).then(
      (res) => {
        if (res.error) {
          setLoading(false);
          setError(true);
        } else {
          console.log(res.post.appliedUsers);
          setApplicants(res.post.appliedUsers);
          setLoading(false);
          setError(false);
        }
      }
    );
  }, []);
  return (
    <Base>
      <div>
        <div className="applicant-list-item heading">
          <div className="job-list-item-column">Name</div>
          <div className="job-list-item-column">Email</div>
          <div className="job-list-item-column">user id</div>
        </div>
        {!loading &&
          applicants.map((applicant) => {
            return (
              <Link to={`/profile/byUserId?userId=${applicant._id}`}>
                <div className="applicant-list-item">
                  <div className="job-list-item-column">{applicant.name}</div>
                  <div className="job-list-item-column">{applicant.email}</div>
                  <div className="job-list-item-column">{applicant._id}</div>
                </div>
              </Link>
            );
          })}
      </div>
    </Base>
  );
};

export default AppliedUsersList;
