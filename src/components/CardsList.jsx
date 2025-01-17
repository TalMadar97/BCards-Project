import Card from "./Card";

function CardsList({ cards, refreshCards }) {
  return (
    <>
      <div className="container ">
        <div className="row justify-content-center">
          {cards.map((card, index) => (
            <div className="col-12 col-md-4 mb-4" key={index}>
              <Card
                id={card._id}
                userId={card.user_id}
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                phone={card.phone}
                image={card.image}
                likes={card.likes}
                refreshCards={refreshCards}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CardsList;
