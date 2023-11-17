import { ExtendedCardItem, Loader } from "../../components";
import { useFetch } from "../../services/dataService";
import { useParams } from 'react-router-dom';
import "./SingleElement.css"

export const SingleElement = () => {
  let { id } = useParams();
  console.log(id)
  const {data, isLoading, hasError} = useFetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`)
  if(hasError) {
    return (
      Error(hasError)
    )
  } else {
    return isLoading ? (
    <Loader />
    ) 
    : 
    (
    <ExtendedCardItem name={data?.data.name} image={data?.data.image} description={data?.data.description} />
    )
  }
};
