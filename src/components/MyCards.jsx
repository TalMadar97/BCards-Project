import { useEffect, useState } from "react";
import CardsList from "./CardsList";
import Pagination from "./Pagination";
import Loading from "./Loading";
import { getMyCards } from "../services/api";
import IconLink from "./icons/IconLink";

function MyCards() {
  const [cards, setCards] = useState([]);
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
      <div className="text text-center mb-4 my-4">
        <h1>My Cards</h1>
        <p className="text-center mb-4">
          Here you can find your business cards
        </p>
      </div>

      <CardsList cards={currentCards} refreshCards={fetchCards} />
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(cards.length / cardsPerPage)}
        onPageChange={handlePageChange}
      />

      <IconLink
        href="/cards/create"
        iconClass="fa-solid fa-circle-plus"
        size={"70px"}
      />
    </>
  );
}

export default MyCards;
