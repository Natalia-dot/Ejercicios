import { useFetch } from "../../services/dataService";
import "./ExtendedCardItem.css"

export const ExtendedCardItem = (data) => {
    
    const {name, image, description} = data.data;
    console.log(name, image, description, "gofgkdg")
    // useFetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`)
  return (
    <div>
        <h1>{name}</h1>
        <img src={image} alt={name}/>
        <p> {description} </p>
    </div>
  )
}
