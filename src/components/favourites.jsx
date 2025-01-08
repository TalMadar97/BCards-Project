import { useEffect, useState } from "react";
import axios from "axios";
import CardsList from "./CardsList";
import Pagination from "./Pagination";
import { baseUrl } from "../config/api";
import Loading from "./Loading";

import { getMyCards } from "../services/api";
import { getToken, getUser } from "../utils/cache";

function Favourites() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const user = getUser();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await getMyCards(user?._id);
        setCards(response);
      } catch (error) {
        console.error(error);
        setCards([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <Loading />;
  }

  // Calculate the current cards to display
  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = cards.slice(startIndex, startIndex + cardsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <CardsList cards={currentCards} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(cards.length / cardsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Favourites;
