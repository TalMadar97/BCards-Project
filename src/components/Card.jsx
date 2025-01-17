import React from "react";
import IconButton from "./IconButton";
import { stringifyAddress } from "../utils/strings";
import { getUser } from "../utils/cache";
import { isLiked } from "../utils/cards";
import {
  likeCard,
  unlikeCard,
  deleteCard as callDeleteCard,
} from "../services/api";
import IconLink from "./icons/IconLink";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import ImageWithFallback from "./Images/ImageWithFallback";

function Card(props) {
  const user = getUser();
  const userId = user?._id;
  const isOwner = userId ? props.userId === userId : false;

  const image = () => {
    const img = (
      <ImageWithFallback
        className="img-thumbnail"
        style={{
          width: "100%",
          height: "250px",
          borderRadius: "5px",
          objectFit: "cover",
        }}
        src={props.image?.url}
        alt={props.image?.alt}
        fallbackSrc="/imageNotFound.png"
      />
    );

    const cursor = props.imageCursor ? props.imageCursor : "pointer";
    
    if (props.id) {
      return (
        <Link
          className="text-dark"
          to={`/cards/${props.id}`}
          style={{ textDecoration: "none", cursor }}
        >
          {img}
        </Link>
      );
    }

    return <>{img}</>;
  };

  const likeButton = () => {
    if (!props.likes || !user) {
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

  const deleteCard = async () => {
    try {
      const result = await callDeleteCard(props.id);

      if (result) {
        toast.success("Card was deleted successfully", {
          position: "top-center",
        });
      } else {
        toast.error("Failed to delete card", { position: "top-center" });
      }

      if (props.refreshCards) {
        await props.refreshCards();
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      toast.error("Failed to delete card", { position: "top-center" });
    }
  };

  const phoneNumber = () => {
    return props.phone ? props.phone : "0987654321";
  };

  return (
    <>
      <div className="card p-3   ">
        {image()}
        <h2 className="card-title">{props.title}</h2>
        <h3 className="card-subtitle">{props.subtitle}</h3>
        <p className="card-text ellipsis">{props.description}</p>
        {props.email && <p>Email: {props.email}</p>}
        {props.showPhone && <p>Phone: {props.phone}</p>}
        {props.web && <p>Website: {props.web}</p>}
        {props.address && <p>Address: {stringifyAddress(props.address)}</p>}
        <div className="icon-buttons">
          <IconLink
            iconClass="fa-solid fa-phone"
            href={`tel:${phoneNumber()}`}
          />
          {likeButton()}
          {isOwner && (
            <>
              <IconLink
                iconClass="fa-solid fa-pen-to-square"
                href={`/my-cards/${props.id}`}
              />
              <IconButton
                iconClass="fa-regular fa-trash-can"
                onClick={deleteCard}
              />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default Card;
