import Card from "./Card";

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
            id={card._id}
            title={card.title}
            subtitle={card.subtitle}
            description={card.description}
            image={card.image}
          />
        ))}
      </div>
    </>
  );
}

export default CardsList;
