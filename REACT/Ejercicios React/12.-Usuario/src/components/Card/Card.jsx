import { Link } from "react-router-dom";
import "./Card.css";
import { useState } from "react";
import { toggleLikedAlbum } from "../../services";

export const Card = ({ name, src, id, initialLikes, year, isLiked, className, addToLikes }) => {
  let path = `/dashboard/${id}`;
  const [likes, setLikes] = useState(initialLikes);
    console.log(likes)


  return (
    <div className="cardContainer">
        <div className={className}>
        <Link to={path}>
          <img src={src} alt={name} />
          <h2>{name}</h2>
          </Link>
          <h3>{initialLikes}  people like this</h3>
          <small>{year}</small>
          <span
        className={`material-symbols-outlined`}
        style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
        onClick={() => addToLikes(id)}
      >
        heart_check
      </span>
        </div>
      
  
    </div>
  );
};