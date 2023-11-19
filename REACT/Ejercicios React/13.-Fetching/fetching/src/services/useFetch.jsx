import { useEffect, useState } from "react"

export const useFetch = () => {
    const [input, setInput] = useState("mewtwo"); //lo que hay en el input
    const [fetchedData, setFetchedData] = useState({
        data: null,
        isLoading: null,
        hasError: null,
    }); //lo que almacenamos del fetch

    const getFetch = async () => {
        setFetchedData((previousData)=>( {...previousData, isLoading: true,}));
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
            if(!res.ok) {
                throw new Error(`Error fetching Pokemon. ${res.status} ${Error.message}`)
            } else {
                const pokemonJson = await res.json();
                setFetchedData((previousData) => ({...previousData, data: pokemonJson, isLoading:false}));
            }
        } catch (error) {
            setFetchedData({...fetchedData, isLoading:false, hasError: true})
        }
    }
    useEffect(()=> {
        getFetch();
    }, [input])

    const handleInputChange = (newInput) => {
        setInput(newInput);
      };
    return {
        data: fetchedData.data,
        hasError: fetchedData.hasError,
        isLoading: fetchedData.isLoading,
        fetchedData,
        input,
        handleInputChange
    }
}