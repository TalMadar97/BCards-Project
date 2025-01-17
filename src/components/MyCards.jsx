import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./contexts/GlobalContext";
import CardsList from "./CardsList";
import Pagination from "./Pagination";
import Loading from "./Loading";
import { getMyCards } from "../services/api";
import IconLink from "./icons/IconLink";
import { searchCards } from "../utils/cards";

function MyCards() {
  const { searchText } = useContext(GlobalContext);

  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const cardsPerPage = 9;

  const fetchCards = async () => {
    try {
      const response = await getMyCards();
      setCards(response.data);
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
    <div className="container">
      <div className="text text-center mb-4 my-4">
        <h1>My Cards</h1>
        <p className="text-center mb-4">
          Here you can find your business cards
        </p>
      </div>

      <CardsList cards={currentCards} refreshCards={fetchCards} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredCards.length / cardsPerPage)}
        onPageChange={handlePageChange}
      />

      <IconLink
        href="/cards/create"
        iconClass="fa-solid fa-circle-plus"
        size={"70px"}
      />
    </div>
  );
}

export default MyCards;
