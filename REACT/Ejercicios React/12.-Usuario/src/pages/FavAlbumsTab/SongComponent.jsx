import { useEffect, useState } from "react";
import { getPopulatedLikesById } from "../../services";
import { FavCard } from "../../components";

export const SongComponent = () => {
    const [allAlbums, setAllAlbums] = useState([]);
    const [isReady, setIsReady] = useState(false);
    console.log("Estoy en song components")

  
    const getAlbums = async () => {
      const albumsRes = await getPopulatedLikesById();
    console.log(albumsRes.data)
  
      setAllAlbums(albumsRes.data);
      setIsReady(!isReady);
    };
  
  
    useEffect(() => {
      getAlbums();
    }, []);
    if(getAlbums.length > 0) {
      return <div className="profileContent "> You have no favorite albums... Start browsing! </div>
    }
    return (
      <div className="profileContent">
        <h1>Fav Songs</h1>
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
  