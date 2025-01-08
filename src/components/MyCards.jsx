import CreateNewCard from "./CreateNewCard";

function MyCards() {
  return (
    <>
      <div className="text text-center mb-4 my-4">
        <h1>My Cards</h1>
        <p className="text-center mb-4">
          Here you can find your business cards
        </p>
      </div>
      <CreateNewCard />
    </>
  );
}

export default MyCards;
