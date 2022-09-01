import { API } from "../../../Backend";

export const getUserDetailsById = (userId) => {
  return fetch(`${API}/user/userDetails/byId?id=${userId}`, {
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
