import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./contexts/GlobalContext";
import CardsList from "./CardsList";
import Pagination from "./Pagination";
import Loading from "./Loading";

import { getFavouriteCards } from "../services/api";
import { getToken, getUser } from "../utils/cache";
import { searchCards } from "../utils/cards";

function Favourites() {
  const { searchText } = useContext(GlobalContext);

  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const user = getUser();

  const fetchCards = async () => {
    try {
      const response = await getFavouriteCards(user?._id);
      setCards(response);
    } catch (error) {
      console.error(error);
      setCards([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCards();
  }, []);

  useEffect(() => {
    const filtered = searchCards(cards, searchText);
    setFilteredCards(filtered);
  }, [searchText, cards]);

  if (loading) {
    return <Loading />;
  }

  const startIndex = (currentPage - 1) * cardsPerPage;
  const currentCards = filteredCards.slice(startIndex, startIndex + cardsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="text text-center mb-4 my-4">
        <h1>Favourties</h1>
        <p className="text-center mb-4">
          Here you can find all your Favourites cards from all categories
        </p>
      </div>
      <CardsList cards={currentCards} refreshCards={fetchCards} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCards.length / cardsPerPage)}
        onPageChange={handlePageChange}
      />
    </>
  );
}

export default Favourites;
