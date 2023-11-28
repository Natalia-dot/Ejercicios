import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (url) => {
  const [compendiumData, setCompendiumData] = useState({
    data: null,
    isLoading: null,
    hasError: null,
  });
  //EX Mediante la url que le pasamos vamos a hacer fetch y setear el estado con los datos, cuando no tengamos
  //EX datos aun, setearemos isLoading a true, y cuando nos llegue lo settearemos a false. hasError lo setearemos
  //EX con el error cuando haga catch el error.

  const getFetch = async () => {
    setCompendiumData({...compendiumData, isLoading : true});
    try {
      const res = await fetch(url);
      console.log(res)
      if (!res.ok) { //res.ok es un parametro de la respuesta predefinido
        throw new Error(`Error fetching data ${res.status}`);
      } else {
        const dataJson = await res.json(); //cogemos la respuesta que nos ha dado el servidor y la metemos en un json
        setCompendiumData({...compendiumData, data: dataJson, isLoading: false})
      }
      
    } catch (error) {
      setCompendiumData({...compendiumData, isLoading: false, hasError: error})
    }
  };

  useEffect(()=> {
    getFetch();
  }, [])

  //hacemos un useEffect para que cada vez que cambie la url se ejecute getFetch
  return {
    data: compendiumData.data,
    isLoading: compendiumData.isLoading,
    hasError: compendiumData.hasError,
    compendiumData
  }
};

