import { useEffect, useState } from "react";
import "./Dashboard.css";
import { getAllAlbumsServices} from "../../services/AlbumService/albums.service";
import { Card } from "../../components";
import { getLikesById } from "../../services";

export const Dashboard = () => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [userLikedAlbums, setUserLikedAlbums] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const getAlbums = async () => {
    const albumsRes = await getAllAlbumsServices();
    setAllAlbums(albumsRes.data);
    setIsReady(true);
  };

  const getLikes = async () => {
    const likedAlbumsRes = await getLikesById(); // Fetch user's liked albums
    setUserLikedAlbums(likedAlbumsRes.data);

  }

  useEffect(() => {
    getAlbums();
  }, [userLikedAlbums]);

  useEffect(() => {
    getLikes();
  }, []);

  return (
    <div className="albumsContainer">
      {allAlbums.map((item) => {
        const isLiked = userLikedAlbums.includes(item._id)
        return (
          <Card
            key={item._id}
            id={item._id}
            name={item.name}
            src={
              item.image
                ? item.image
                : "https://res.cloudinary.com/drbssyzr7/image/upload/v1699200914/NODE_project/default-album-art_afjoep.png"
            }
            initialLikes={item.likedBy.length}
            year={item.year}
            className={isLiked? "favorited albums" : "unfavorited albums"} // Pass the information to Card component
          />
        );
      })}
    </div>
  );
};
