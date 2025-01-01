import React from "react";
import IconButton from "./IconButton";

function Card(props) {
  return (
    <div className="container" style={{ textAlign: "center", padding: "16px" }}>
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
      <h2>{props.title}</h2>
      <h3>{props.subtitle}</h3>
      <p>{props.description}</p>
      <div><IconButton iconClass="fa-phone" /></div>
    </div>
  );
}

export default Card;
