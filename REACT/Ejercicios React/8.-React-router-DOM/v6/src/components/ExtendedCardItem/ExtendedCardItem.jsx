import "./ExtendedCardItem.css"

export const ExtendedCardItem = ({name, image, description}) => {
    // useFetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`)
  return (
    <div className="individualItem">
        <h1>{name}</h1>
        <img src={image} alt={name}/>
        <p> {description} </p>
    </div>
  )
}
