import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getAllAlbumsServices } from "../../services/AlbumService/albums.service";
import { Card } from "../../components";

export const Dashboard = () => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const useGetAlbums = async () => {
    const res = await getAllAlbumsServices();
    setAllAlbums(res.data);
    setIsReady(true);
  };

  console.log(allAlbums);

  useEffect(() => {
    useGetAlbums();
  }, []);

  return (
    <div className="albumsContainer">
      {allAlbums.map((item) => {
        return <Card
          key={item._id}
          id={item._id}
          name={item.name}
          src={
            item.image
              ? item.image
              : "https://res.cloudinary.com/drbssyzr7/image/upload/v1699200914/NODE_project/default-album-art_afjoep.png"
          }
          likes={item.likedBy.length}
          className="albums"
          year={item.year}
        />;
      })}
      </div>
  );
};