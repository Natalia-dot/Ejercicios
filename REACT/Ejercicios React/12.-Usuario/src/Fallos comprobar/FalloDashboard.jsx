import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getAllAlbumsServices } from "../../services/AlbumService/albums.service";
import { Card } from "../../components";
import { useGetAlbums } from "../../hooks/useGetAlbums/useGetAlbums";

export const Dashboard = () => {
  const {data, isLoading, hasError } = useGetAlbums();

useEffect(() => {

}, [data])

  if(hasError) {
    return (
      <div><h1>Sorry, we couldn't get the albums for ya!</h1></div>
    )
  } else {
    return isLoading ? (
      <div><h1>Loading...</h1></div>
    ) : (
      data?.map((item) => {
        return (<Card
          key={item.id}
          name={item.name}
          src={
            item.image
              ? item.image
              : "https://res.cloudinary.com/drbssyzr7/image/upload/v1699200914/NODE_project/default-album-art_afjoep.png"
          }
          likes={item.likedBy.length}
          className="albums"
          year={item.year}
        />)
        }
      )
      
    )

      }
}