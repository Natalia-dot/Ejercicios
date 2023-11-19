import { useState } from "react"

export const useFetch = () => {
    const [fetchedData, setFetchedData] = useState({
        data: null,
        isLoading: null,
        hasError: null,
    }); //lo que almacenamos del fetch

    const getFetch = async (pokemon) => {
        setFetchedData({...fetchedData, isLoading: true,});
        try {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
            if(!res.ok) {
                throw new Error(`Error fetching Pokemon. ${res.status} ${Error.message}`)
            } else {
                const jsonData = await res.json();
                
                setFetchedData({data: jsonData, isLoading:false, hasError: false });
                
            }
        } catch (error) {
            setFetchedData({...fetchedData, isLoading:false, hasError: true})
        }
    }
    console.log(fetchedData)

    return {
        data: fetchedData.data,
        hasError: fetchedData.hasError,
        isLoading: fetchedData.isLoading,
        fetchedData,
        getFetch
    }
}