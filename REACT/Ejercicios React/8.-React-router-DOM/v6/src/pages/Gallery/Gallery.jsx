import { useEffect, useState } from "react";
import "./Gallery.css"
import { useFetch } from "../../services/dataService";
import { Card, Main, Error, Loader } from "../../components";

export const Gallery = () => {
  const {data, isLoading, hasError} = useFetch("https://botw-compendium.herokuapp.com/api/v3/compendium/all")
//EX Aqui estamos fetcheando los datos de la api y guardandolos en un estado junto con el estado de loading
//EX y hasError para indicar que tiene que imprimir en cada momento y tener los datos. useFetch DEVUELVE 
//EX data, isLoading, hasError y tambien devuelve compendiumData que es todo el objeto junto.
  if(hasError) { //ex siHasError es true devuelve el error y renderiza el componente error
    return (
      Error(hasError)
    )
  } else {
    return isLoading ? (  //return tiene que ir DENTRO DEL ELSE
      <Loader/> //ex si no tiene error tendremos que renderizar el componente Loader mientras el isLoading sea
                //ex true
      ) 
  :  (
      <section>
    {data?.data.map((item) => (
          <Card image={item.image} name={item.name} key={item.id} id={item.id} category={item.category}/>
        ))}
        </section>
  )
}

}
