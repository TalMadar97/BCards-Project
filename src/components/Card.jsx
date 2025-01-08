import React from "react";
import IconButton from "./IconButton";
import { stringifyAddress } from "../utils/strings";
import { getUser } from "../utils/cache";
import { isLiked } from "../utils/cards";
import { likeCard, unlikeCard } from "../services/api";
import IconLink from "./icons/IconLink";

function Card(props) {
  const user = getUser();
  const userId = user?._id;

  const image = () => {
    const img = (
      <img
        className="img-thumbnail"
        src={props.image?.url}
        alt={props.image?.alt}
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "5px",
          objectFit: "cover",
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

  const likeButton = () => {
    if (!props.likes) {
      return <></>;
    }

    if (isLiked(userId, props?.likes)) {
      return (
        <IconButton
          iconClass="fa-solid fa-heart"
          style={{ color: "red" }}
          onClick={unLikeAndRefresh}
        />
      );
    }

    return (
      <IconButton iconClass="fa-regular fa-heart" onClick={likeAndRefresh} />
    );
  };

  const likeAndRefresh = async () => {
    try {
      await likeCard(props.id);

      if (props.refreshCards) {
        await props.refreshCards();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const unLikeAndRefresh = async () => {
    try {
      await unlikeCard(props.id);

      if (props.refreshCards) {
        await props.refreshCards();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="card p-3">
        {image()}
        <h2 className="card-title">{props.title}</h2>
        <h3 className="card-subtitle">{props.subtitle}</h3>
        <p className="card-text">{props.description}</p>
        {props.email && <p>Email: {props.email}</p>}
        {props.phone && <p>Phone: {props.phone}</p>}
        {props.web && <p>Website: {props.web}</p>}
        {props.address && <p>Address: {stringifyAddress(props.address)}</p>}
        <div>
          <IconButton iconClass="fa-solid fa-phone" />
          {likeButton()}
          {props.userId === userId && (
            <IconLink
              iconClass="fa-solid fa-pen-to-square"
              href={`/my-cards/${props.id}`}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
