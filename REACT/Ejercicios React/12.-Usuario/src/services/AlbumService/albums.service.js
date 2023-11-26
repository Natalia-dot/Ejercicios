import { getUpdatedToken } from "../../utils";
import { APIRoute } from "../service.config";

export const getAllAlbumsServices = async () => {
    return APIRoute.get("/albums/", {
      headers: {
        Authorization: `Bearer ${getUpdatedToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };
  
  export const getAlbumByIdService = async (id) => {
    return APIRoute.get(`albums/${id}`, {
      headers: {
        Authorization: `Bearer ${getUpdatedToken()}`,
      },
    })
      .then((res) => res)
      .catch((error) => error);
  };
  