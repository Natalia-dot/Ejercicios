import { getUpdatedToken } from "../../utils";
import { extraConfig } from "../service.config";

export const getAllAlbumsServices = async () => {
  const APIRoute = extraConfig();
    return APIRoute.get("/albums/", )
      .then((res) => res)
      .catch((error) => error);
  };
  

export const getAlbumByIdService = async (id) => {
  const APIRoute = extraConfig();
  return APIRoute.get(`/albums/${id}`)
    .then((res) => res)
    .catch((error) => error);
};

export const deleteAlbumAdminService = async (id) => {
  const APIRoute = extraConfig();
  return APIRoute.delete(`/albums/${id}`,)
    .then((res) => res)
    .catch((error) => error);
};

export const createAlbumService = async (formData) => {
  const APIRoute = extraConfig();
  return APIRoute.post(`/albums/`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then((res) => res)
    .catch((error) => error);
};
