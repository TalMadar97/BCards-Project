import CreateNewCard from "./CreateNewCard";
import IconLink from "./icons/IconLink";

function MyCards() {
  return (
    <>
      <div className="text text-center mb-4 my-4">
        <h1>My Cards</h1>
        <p className="text-center mb-4">
          Here you can find your business cards
        </p>
      </div>
      <IconLink
        href="/cards/create"
        iconClass="fa-solid fa-circle-plus"
        size={"70px"}
      />
    </>
  );
}

export default MyCards;
