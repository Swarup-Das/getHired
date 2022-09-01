import { API } from "../../Backend.js";
import { isAuthenticated } from "../userComponent/Auth/AuthHelper.js";

export const createJobApiCall = (data) => {
  return fetch(`${API}/post/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${isAuthenticated().token}`,
    },
    body: JSON.stringify(data),
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPostsByUserId = (userId) => {
  return fetch(`${API}/post/byUserId/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getPostByPostId = (postId) => {
  return fetch(`${API}/post/byPostId/${postId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const applyJobByJobId = (userId, jobId) => {
  return fetch(`${API}/job/apply?userId=${userId}&jobId=${jobId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${isAuthenticated().token}`,
      Accept: "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((err) => {
      console.log(err);
    });
};
