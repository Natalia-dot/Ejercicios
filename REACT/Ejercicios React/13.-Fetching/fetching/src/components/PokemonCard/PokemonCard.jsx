import { useFetch } from "../../services/useFetch";

export const PokemonCard = () => {
  const { data, isLoading, hasError } = useFetch();
  if (hasError) {
    return <div>Sorry there was an error.</div>;
  } else {
    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <div>
        <h1>{data?.name}</h1>
        <img src={data?.sprites.front_default} />
      </div>
    );
  }
};
