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

export async function getMyCards(userId) {
  let response = await axios.get(`${baseUrl}/cards`);
  let cards = response.data;
  cards = cards.filter((card) => card.likes.includes(userId));
  return cards;
}

export default { headers, getMyCards };
