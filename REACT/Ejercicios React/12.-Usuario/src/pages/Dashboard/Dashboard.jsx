import { useEffect, useState } from "react";
import "./Dashboard.css";
import { useGetAlbums } from "../../hooks/useGetAlbums/useGetAlbums";


export const Dashboard = () => {
  const [isReady, setIsReady] = useState(false);
  const {data, isLoading, hasError} =useGetAlbums();

  useEffect(() => {
  }, []);

  return (
    <></>
  );
};
