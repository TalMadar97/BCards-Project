import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../config/api";
import Card from "./Card";
import Loading from "./Loading";
import Error from "./Error";

function SingleCardPage() {
  const { id } = useParams();

  const [card, setCard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await axios.get(`${baseUrl}/cards/${id}`);
        setCard(response.data);
      } catch (error) {
        console.error(error);
        setCard(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCard();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  if (!card) {
    return <Error message="Error with the provided card" />;
  }

  return (
    <>
      <div className="single-card-page no-ellipsis">
        <Card
          key={id}
          id={id}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          image={card.image}
          email={card.email}
          phone={card.phone}
          showPhone={true}
          web={card.web}
          address={card.address}
        />
      </div>
    </>
  );
}

export default SingleCardPage;
