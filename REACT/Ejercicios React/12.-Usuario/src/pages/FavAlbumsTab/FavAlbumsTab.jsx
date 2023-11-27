import "./FavAlbumsTab.css"
import { useEffect, useState } from "react";
import { getPopulatedLikesById } from "../../services";
import { FavCard } from "../../components";

export const FavAlbumsTab = () => {
  const [allAlbums, setAllAlbums] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const getAlbums = async () => {
    const albumsRes = await getPopulatedLikesById();
  console.log(albumsRes.data)

    setAllAlbums(albumsRes.data);
    setIsReady(!isReady);
  };


  useEffect(() => {
    getAlbums();
  }, []);

  return (
    <div className="profileContent">
      {allAlbums.map((item) => {
        return (
          <FavCard
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
          />
        );
      })}
    </div>
  );
};
