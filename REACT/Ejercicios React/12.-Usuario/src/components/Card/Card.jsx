import "./Card.css"

export const Card = ({name, id, likes, className, year}) => {
  return (
    <div className={className} key={id}>
        <img src={src} alt={name}/>
        <h1>{name}</h1>
        <h3>{likes}</h3>
        <small>{year}</small>
    </div>
  )
}
