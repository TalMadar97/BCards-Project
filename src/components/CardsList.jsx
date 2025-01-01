import Card from "./Card";
import Pagination from "./Pagination";

function CardsList({ cards }) {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        {cards.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
            image={card.image}
          />
        ))}
        <Pagination />
      </div>
    </>
  );
}

export default CardsList;
