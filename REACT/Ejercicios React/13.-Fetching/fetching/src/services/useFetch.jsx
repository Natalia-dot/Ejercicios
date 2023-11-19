import { useEffect, useState } from "react"

export const useFetch = () => {
    const [input, setInput] = useState("ditto");
    const [fetchedData, setFetchedData] = useState({
        data: null,
        isLoading: null,
        hasError: null,
    }); //lo que almacenamos del fetch

    const getFetch = async () => {
        setFetchedData({...fetchedData, isLoading: true,});
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`)
            if(!res.ok) {
                throw new Error(`Error fetching Pokemon. ${res.status} ${Error.message}`)
            } else {
                const pokemonJson = await res.json();
                setFetchedData({data: pokemonJson, isLoading:false, hasError: false });
            }
        } catch (error) {
            console.log(error)
            setFetchedData({...fetchedData, isLoading:false, hasError: true})
        }
    }
    useEffect(()=> {
        getFetch();
        console.log(fetchedData)
    }, [input])
    return {
        data: fetchedData.data,
        hasError: fetchedData.hasError,
        isLoading: fetchedData.isLoading,
        fetchedData,
        input,
        setInput
    }
}