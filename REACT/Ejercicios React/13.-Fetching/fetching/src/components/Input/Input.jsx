
import { useEffect, useState } from "react";
import { useFetch } from "../../services/useFetch"
import "./Input.css"

export const Input = () => { 
    const [input, setInput] = useState("mewtwo");
    const { getFetch } = useFetch();

    // const fetchPokemon = async (pokemon) => {
    //     const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    //     const json = await res.json();
    //     console.log(json)
    // }
    useEffect(() => {
      getFetch(input)
    // fetchPokemon(input)
    }, [input])

  return (
    <input type="text" value={input} onChange={(e)=> setInput(e.target.value)}></input>
  )
}
