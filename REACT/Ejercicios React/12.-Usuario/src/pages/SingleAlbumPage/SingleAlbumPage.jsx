import { useParams } from "react-router-dom";
import { getAlbumByIdService } from "../../services/AlbumService/albums.service";
import "./SingleAlbumPage.css";
import { useEffect, useState } from "react";

export const SingleAlbumPage = () => {
  const { id } = useParams();
  console.log(id);
  const [singleAlbum, setSingleAlbum] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const useGetSingleAlbum = async (id) => {
    const res = await getAlbumByIdService(id);
    console.log(res);
    setSingleAlbum(res.data);
    setIsReady(true);
  };

  console.log(singleAlbum);
  useEffect(() => {
    useGetSingleAlbum(id);
  }, [id, setIsReady]);

  if (!isReady) {
    return <div>Loading...</div>;
  }

  return (
    <div className="singleAlbum">
        <img src={singleAlbum.image ? singleAlbum.image : "https://res.cloudinary.com/drbssyzr7/image/upload/v1699200914/NODE_project/default-album-art_afjoep.png"}/>
      <h1>{singleAlbum?.albumName}</h1>
      <h2>
        Created by {singleAlbum?.artist} in {singleAlbum?.year}
      </h2>
      {singleAlbum?.genres.map((item) => {
        return <p key={item}>{item}</p>;
      })}

      <h3>Produced by:</h3>
      {singleAlbum?.producers.map((item) => {
        return <p key={item}>{item}</p>;
      })}
      <h2>Songs</h2>
      <ul>
        {singleAlbum?.songs.map((item) => {
          return <li key={item.songName}>{item.songName}</li>;
        })}
      </ul>
    </div>
  );

  }
/** albumName
"am"
albumLength
41
genres
Array (2)
producers
Array (1)
year
2013
songs
Array (11)
likedBy
Array (empty)
artist
"arctic monkeys" */
