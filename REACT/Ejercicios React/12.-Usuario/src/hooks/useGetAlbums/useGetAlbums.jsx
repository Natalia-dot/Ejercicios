import { useEffect, useState } from "react";
import { getAllAlbumsServices } from "../../services/AlbumService/albums.service";

export const useGetAlbums = async () => {
    console.log("estoy en get albums")
    const [albumsList, setAlbumsList] = useState({
        data: null,
        isLoading: false,
        hasError: false
    })

    const getFetch = async() => {
    setAlbumsList({...albumsList, isLoading: true})
    try {
        const res = await getAllAlbumsServices();
        if(res.status !== 200) {
            console.log("res no ok")
            throw new Error (`Error fetching albums`, error.message)
        } else {
            console.log("res ok")
            setAlbumsList({data: res.data, isLoading:false, hasError:false})
        }
    } catch (error) {
        setAlbumsList({...albumsList, isLoading:false, hasError:error})
    }
}
console.log(albumsList, "albumlist")

 
useEffect(() => {
    getFetch();

  }, []);

  return {
    data: albumsList.data,
    isLoading: albumsList.isLoading,
    hasError: albumsList.hasError,
}
}