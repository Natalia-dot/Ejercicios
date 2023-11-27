import { Link } from "react-router-dom";
import "./FavCard.css";

export const FavCard = ({ name, src, id, initialLikes, year, className }) => {
let path = `/dashboard/${id}`
  return (
<>
    <Link to={path}>
    <div className="cardContainer">
      <div className={className}>
          <img src={src} alt={name} />
          <h2>{name}</h2>
        <h3>{initialLikes} people like this</h3>
        <small>{year}</small>
      </div>
    </div>
    </Link>
    </>
  );
};
