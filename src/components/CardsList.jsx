import Card from "./Card";

function CardsList({ cards }) {
  return (
    <>
      <div className="text text-center mb-4 my-4">
        <h1>B-cards</h1>
        <p className="text-center mb-4">
          Here you can find business cards from all categories
        </p>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          {cards.map((card, index) => (
            <div className="col-12 col-md-4 mb-4" key={index}>
              <Card
                id={card._id}
                title={card.title}
                subtitle={card.subtitle}
                description={card.description}
                image={card.image}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CardsList;
