import { Navigate, useParams } from "react-router-dom";
import { deleteAlbumAdminService, getAlbumByIdService } from "../../services/AlbumService/albums.service";
import "./SingleAlbumPage.css";
import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/authContext";
import { Swal } from "sweetalert2/dist/sweetalert2.all";

export const SingleAlbumPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [ deletedAlbumSuccessful, setDeletedAlbumSuccessful] = useState(false)

  console.log(user)

  console.log(id);
  const [singleAlbum, setSingleAlbum] = useState([]);
  const [isReady, setIsReady] = useState(false);


  const handleDeleteAlbum = async (id) => {
    let res = await deleteAlbumAdminService(id)
    if(res.status=200) {
        setDeletedAlbumSuccessful(true)
    }
}

  const useGetSingleAlbum = async (id) => {
    const res = await getAlbumByIdService(id);
    setSingleAlbum(res.data)
    console.log(res);
    setIsReady(true);
  };

  console.log(singleAlbum);
  useEffect(() => {
    useGetSingleAlbum(id);
  }, [id, setIsReady]);

  if (deletedAlbumSuccessful) {
    setDeletedAlbumSuccessful(false)
    return <Navigate to="/dashboard" />;
  }


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
      {user.role === 'admin' && (
        <button onClick={() => handleDeleteAlbum(id)}>DELETE ALBUM</button>
      )}
    </div>
  );

  }