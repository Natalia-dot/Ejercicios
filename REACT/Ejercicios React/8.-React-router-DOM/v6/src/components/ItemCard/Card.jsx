import "./Card.css"
import { Link } from "react-router-dom";

export const Card = ({image, name, id}) => {
  let path = `/gallery/monster/${id}`
  return (
    <figure>
    <Link to={path}>
      <img src={image} alt={name} className="cardImage" draggable="false"/>
    </Link>
  </figure>
  )
}
