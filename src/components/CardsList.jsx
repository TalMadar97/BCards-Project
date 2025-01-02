import Card from "./Card";

function CardsList({ cards }) {
  return (
    <>
      <div className="text-center mb-4">
        <h1>B-cards</h1>
        <p className="text-muted">Here you can find all cards</p>
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
