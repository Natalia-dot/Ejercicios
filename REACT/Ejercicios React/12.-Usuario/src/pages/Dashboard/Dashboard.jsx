import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getAllAlbumsServices } from "../../services/AlbumService/albums.service";
import { Card } from "../../components";
import { getLikesById, toggleLikedAlbum } from "../../services";

export const Dashboard = () => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [userLikedAlbums, setUserLikedAlbums] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [updatedLikes, setUpdatedLikes] = useState(false);

  const getAlbums = async () => {
    const albumsRes = await getAllAlbumsServices();
    setAllAlbums(albumsRes.data);
    setIsReady(!isReady);
  };

  const addToLikes = async (idParam) => {
    let id = { id: idParam };
    const response = await toggleLikedAlbum(id);
    console.log(response?.data);
    setUpdatedLikes(!updatedLikes);
  };

  const getLikes = async () => {
    const likedAlbumsRes = await getLikesById(); // Fetch user's liked albums
    console.log(likedAlbumsRes);

    setUserLikedAlbums(likedAlbumsRes.data);
  };


  useEffect(() => {
    getAlbums();
  }, [updatedLikes]);

  useEffect(() => {
    getLikes();
  }, [updatedLikes]);

  return (
    <div className="albumsContainer">
      {allAlbums.map((item) => {
        console.log(item)
        const isLiked = userLikedAlbums.includes(item._id);
        return (
          <Card
            key={item._id}
            id={item._id}
            name={item.albumName}
            src={
              item.image
                ? item.image
                : "https://res.cloudinary.com/drbssyzr7/image/upload/v1699200914/NODE_project/default-album-art_afjoep.png"
            }
            initialLikes={item.likedBy.length}
            year={item.year}
            className="albums"
            isLiked={isLiked} // Pass the information to Card component
            addToLikes={addToLikes}
          />
        );
      })}
    </div>
  );
};
