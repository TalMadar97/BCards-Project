import React from "react";
import IconButton from "./IconButton";
import { stringifyAddress } from "../utils/strings";

function Card(props) {
  const image = () => {
    const img = (
      <img
        className="img-thumbnail"
        src={props.image?.url}
        alt={props.image?.alt}
        style={{
          width: "250px",
          height: "200px",
          borderRadius: "5px",
        }}
      />
    );

    if (props.id) {
      return (
        <a
          className="text-dark"
          href={`/cards/${props.id}`}
          style={{ textDecoration: "none" }}
        >
          {img}
        </a>
      );
    }

    return <>{img}</>;
  };

  return (
    <div className="container" style={{ textAlign: "center", padding: "16px" }}>
      {image()}
      <h2>{props.title}</h2>
      <h3>{props.subtitle}</h3>
      <p>{props.description}</p>
      {props.email && <p>Email: {props.email}</p>}
      {props.phone && <p>Phone: {props.phone}</p>}
      {props.web && <p>Website: {props.web}</p>}
      {props.address && <p>Address: {stringifyAddress(props.address)}</p>}
      <div>
        <IconButton iconClass="fa-phone" />
      </div>
    </div>
  );
}

export default Card;
