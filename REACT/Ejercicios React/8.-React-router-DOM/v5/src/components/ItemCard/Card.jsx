import "./Card.css"

export const Card = ({image, name, id}) => {
  return (
    <figure><img className="cardImage" src={image} alt={name} id={id} draggable="false"/></figure>
  )
}
