import { ExtendedCardItem, Loader } from "../../components";
import { useFetch } from "../../services/dataService";
import { useParams } from 'react-router-dom';

export const SingleElement = () => {
  let { id } = useParams();
  console.log(id)
  const {data, isLoading, hasError} = useFetch(`https://botw-compendium.herokuapp.com/api/v3/compendium/entry/${id}`)
  console.log(data)
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
    <ExtendedCardItem data={data?.data} />
    )
  }
};
