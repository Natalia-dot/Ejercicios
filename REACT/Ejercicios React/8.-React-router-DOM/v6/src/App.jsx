import { useEffect, useState } from "react";
import "./App.css";
import { getData } from "./services/dataService";
//import { listCharacter } from "./data/characters.data";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(()=>{
    getData(setData, data)
  },[]);
  return (
    <>
    <main>
        {data.map((character) => (
          <div key={character.id}>
            <h1>{character.name}</h1>
            <img src={character.image} alt={character.name}/>
            <p>{character.description}</p>

          </div>
        ))}
        </main>
    </>
  );
}

export default App;
