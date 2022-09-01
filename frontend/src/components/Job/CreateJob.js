import React, { useState } from "react";
import Base from "../core/Base.js";
import { createJobApiCall } from "./JobApiHelper.js";
const CreateJob = () => {
  const [data, setData] = useState({
    company: "",
    jobTitle: "",
    jobDescription: "",
    skills: [],
    salary: 0,
    jobType: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const submitData = () => {
    setSubmitted(true);
    setLoading(true);
    createJobApiCall(data).then((res) => {
      // console.log(res);
      if (res.error) {
        console.log(res.error);
        setSuccess(false);
      } else {
        setSuccess(true);
      }
      setLoading(false);
    });
  };

  const [skills, setSkills] = useState([]);
  return (
    <Base>
      <div>
        {!submitted && !loading && (
          <>
            <div>
              <h4>{data.company}</h4>
              <h4>{data.jobTitle}</h4>
              <h4>{data.jobDescription}</h4>
              <h4>Skills:</h4>
              {data.skills.map((skill) => {
                return <li>{skill}</li>;
              })}
              <h4>{data.salary}</h4>
              <h4>{data.jobType}</h4>
            </div>
            <div>Post a job here</div>
            <div className="form">
              <input
                type="text"
                onChange={(e) => {
                  setData({ ...data, company: e.target.value });
                }}
                placeholder="Company"
              />
              <input
                type="text"
                placeholder="job title"
                onChange={(e) => {
                  setData({ ...data, jobTitle: e.target.value });
                }}
              />
              <textarea
                placeholder="Job description"
                onChange={(e) => {
                  setData({ ...data, jobDescription: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="skills"
                onChange={(e) => {
                  setSkills(e.target.value);
                }}
              />
              <button
                onClick={(e) => {
                  setData({ ...data, skills: [...data.skills, skills] });
                }}
              >
                Add skill
              </button>
              <input
                type="number"
                placeholder="salary"
                onChange={(e) => {
                  setData({ ...data, salary: e.target.value });
                }}
              />
              <input
                type="text"
                placeholder="job type"
                onChange={(e) => {
                  setData({ ...data, jobType: e.target.value });
                }}
              />
              <button
                onClick={() => {
                  submitData();
                }}
              >
                Submit
              </button>
            </div>
          </>
        )}
        {submitted && loading && <h1>Loading...</h1>}
        {submitted && !loading && success && (
          <h1>Successfully created a job</h1>
        )}
        {submitted && !loading && !success && <h1>Unable to create job</h1>}
      </div>
    </Base>
  );
};

export default CreateJob;
