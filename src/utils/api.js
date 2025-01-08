import axios from "axios";
import { baseUrl } from "../config/api";

function headers(token) {
  const headers = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["x-auth-token"] = token;
  }

  return headers;
}

export function getMyCards(token) {
  return axios.get(`${baseUrl}/my-cards`, {
    headers: headers(token),
  });
}

export default { headers, getMyCards };
