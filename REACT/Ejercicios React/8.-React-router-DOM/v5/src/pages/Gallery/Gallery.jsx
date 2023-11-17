import { useEffect, useState } from "react";
import "./Gallery.css"
import { getData } from "../../services/dataService";
import { Card, Main } from "../../components";

export const Gallery = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    getData(setData, data)
  },[]);
  return (
    <Main>
    {data.map((character) => (
          <Card image={character.image} name={character.name} key={character.id} id={character.id}/>
        ))}
    </Main>
  );
}
