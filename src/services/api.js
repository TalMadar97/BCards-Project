import axios from "axios";
import { baseUrl } from "../config/api";
import { headers } from "../utils/api";
import cacheUtils from "../utils/cache";

export async function getMyCards(userId) {
  try {
    let response = await axios.get(`${baseUrl}/cards`);
    let cards = response.data;
    cards = cards.filter((card) => card.likes.includes(userId));
    return cards;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function likeCard(userId, cardId) {
  try {
    const token = cacheUtils.getToken();
    if (!token) {
      throw new Error("Unauthorized: No token found.");
    }

    const url = `${baseUrl}/cards/${cardId}`;
    const body = { likes: [userId] };
    const config = { headers: headers(token) };

    const response = await axios.patch(url, body, config);

    return response.data;
  } catch (error) {
    console.error("Error liking the card:", error);
    return null;
  }
}

export default { headers, getMyCards, likeCard };
