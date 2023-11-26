import { Link } from "react-router-dom";
import "./Card.css";
import { useState } from "react";
import { toggleLikedAlbum } from "../../services";

export const Card = ({ name, src, id, initialLikes, year, isLiked, className }) => {
  let path = `/dashboard/${id}`;
  const [likes, setLikes] = useState(initialLikes);
  const [isReady, setIsReady] = useState(false)

  const addToLikes = async (idParam) => {
    let id = { id: idParam };
      const response = await toggleLikedAlbum(id);
      console.log(response?.data)
      setLikes(response?.data?.albumUnfavorited?.likedBy.length);
      setIsReady(!isReady)
    }
  

  return (
    <div className="cardContainer">
      <Link to={path}>
        <div className={className}>
          <img src={src} alt={name} />
          <h1>{name}</h1>
          <h3>{initialLikes}</h3>
          <small>{year}</small>
        </div>
      </Link>
      <span
        className={`material-symbols-outlined ${isLiked ? "filled" : ""}`}
        onClick={() => addToLikes(id)}
      >
        heart_check
      </span>
    </div>
  );
};